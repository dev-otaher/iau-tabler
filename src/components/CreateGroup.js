import React from "react";
import {Accordion, Button, Grid, Icon} from "semantic-ui-react";
import {DragDropContext} from "react-beautiful-dnd";
import Items from "./Items";
import Group from "../classes/Group";
import _ from 'lodash';
import {Link} from "react-router-dom";
import {dndUtil} from "../utils/dndUtil";

class CreateGroup extends React.Component {
    state = {uuid: 1};

    onDragEnd = ({destination, source, draggableId}) => {
        if (dndUtil.isDroppedOutOfContext(destination))
            return;

        if (dndUtil.isDroppedInSamePlace(destination.droppableId, source.droppableId))
            return;

        const classId = draggableId;
        if (this.isClassDraggedFromCourseToGroup(source.droppableId, destination.droppableId)) {
            let groupId = destination.droppableId;
            this.removeClassFromCourse(classId);
            this.addClassToGroup(classId, groupId);
            this.rerender()
        }

        if (this.isClassDraggedFromGroupToCourse(source.droppableId, destination.droppableId)) {
            const courseId = destination.droppableId;
            if (this.canDropClassIntoCourse(classId, courseId)) {
                const groupId = source.droppableId;
                this.removeClassFromGroup(classId, groupId);
                this.addClassToCourse(classId, courseId);
                this.rerender()
            }
        }

        if (this.isClassDraggedFromGroupToGroup(source.droppableId, destination.droppableId)) {
            let groupId_from = source.droppableId
            let groupId_to = destination.droppableId
            this.removeClassFromGroup(classId, groupId_from);
            this.addClassToGroup(classId, groupId_to);
            this.rerender()
        }
    }

    isClassDraggedFromCourseToGroup = (sourceId, destinationId) => {
        return sourceId.includes(" - ") && destinationId.includes("Group");
    }

    isClassDraggedFromGroupToCourse = (sourceId, destinationId) => {
        return sourceId.includes("Group") && destinationId.includes(" - ");
    }

    isClassDraggedFromGroupToGroup = (sourceId, destinationId) => {
        return sourceId.includes("Group") && destinationId.includes("Group");
    }

    canDropClassIntoCourse = (classId, courseId) => {
        const _class = this.getClassById(classId);
        return courseId.includes(_class.courseId);
    }

    rerender() {
        let newUUID = this.state.uuid + 1;
        this.setState({uuid: newUUID})
    }

    //region courses
    getCourseById = (courseId) => {
        return this.props.courses.filter(course => course.id === courseId)[0];
    }

    getCourseByTitle = (title) => {
        return this.props.courses.filter(course => course.title === title)[0];
    }
    //endregion

    //region classes
    removeClassFromCourse = (classId) => {
        let _class = this.getClassById(classId);
        let course = this.getCourseById(_class.courseId);
        course.classes = course.classes.filter(c => c.id !== parseInt(classId));
    }

    removeClassFromGroup = (classId, groupId) => {
        let group = this.getGroupByTitle(groupId);
        group.classes = group.classes.filter(c => c.id !== parseInt(classId));
    }

    addClassToGroup = (classId, groupId) => {
        let _class = this.getClassById(classId);
        let group = this.getGroupByTitle(groupId);
        group.classes.push(_class);
    }

    getClassById = (classId) => {
        return this.props.classes.filter(c => c.id === parseInt(classId))[0]
    }

    addClassToCourse = (classId, courseId) => {
        const _class = this.getClassById(classId);
        const course = this.getCourseByTitle(courseId);
        course.classes.push(_class);
        course.classes = _.sortBy(course.classes, ['id']);
    }
    //endregion

    // region groups
    addGroup = () => {
        const groupCount = this.props.groups.length;
        this.props.groups.push(new Group(groupCount, `Group ${groupCount + 1}`, []))
    }

    getGroupById = (groupId) => {
        return this.props.groups.filter(group => group.id === groupId)[0];
    }

    getGroupByTitle = (title) => {
        return this.props.groups.filter(group => group.title === title)[0];
    }

    // endregion

    render() {
        return (
            <Grid columns={2}>
                {this.props.courses.length === 0 ?
                    <div className="ui active text loader">Loading...</div>
                    :
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <Grid.Column>
                            <Accordion exclusive={false} styled>
                                <Items isCourseContainer items={this.props.courses}/>
                            </Accordion>
                        </Grid.Column>
                        <Grid.Column>
                            <Accordion styled>
                                <Items isCourseContainer={false} items={this.props.groups}/>
                            </Accordion>
                            <div style={{marginTop: '8px'}}>
                                <Button icon="plus" color="violet" fluid onClick={() => {
                                    this.addGroup()
                                    this.rerender()
                                }}/>
                            </div>
                            <div style={{marginTop: '8px'}}>
                                <Link to="/tables">
                                    <Button animated={"vertical"} primary fluid>
                                        <Button.Content visible>Build</Button.Content>
                                        <Button.Content hidden><Icon name="wrench"/></Button.Content>
                                    </Button>
                                </Link>
                            </div>
                        </Grid.Column>
                    </DragDropContext>
                }
            </Grid>
        );
    }

}

export default CreateGroup;