import React from "react";
import {Accordion, Button, Grid, Icon} from "semantic-ui-react";
import {DragDropContext} from "react-beautiful-dnd";
import Items from "./Items";
import data from "../data";
import Group from "../classes/Group";
import Course from "../classes/Course";
import Class from "../classes/Class";
import _ from 'lodash';
import {Link} from "react-router-dom";


class CreateGroup extends React.Component {
    state = {courses: data, groups: [new Group("Group 1", [])]};
    // state = {courses: null, groups: [new Group("Group 1", [])]};
    rawData = null;
    awaitDom = () => {
        window.chrome.runtime.onMessage.addListener((msg, sender, response) => {
            if (msg.from === "background.js" && msg.to === "builder" && msg.subject === "append-dom") {
                this.rawData = new DOMParser().parseFromString(msg.content, "text/html");
            }
        });
    }

    mapDomToObjects = (dom) => {
        const coursesDom = dom.querySelectorAll("[id^='win5divSSR_CLSRSLT_WRK_GROUPBOX2$']");
        let id = -1;
        const courses = Array.from(coursesDom).map(courseDom => {
            const courseName = courseDom.querySelector("div[id^='win5divSSR_CLSRSLT_WRK_GROUPBOX2GP$']")
                .innerText
                .trim()
                .replace("  ", " ");
            let course = new Course(courseName, []);
            const classesDom = courseDom.querySelectorAll("[id^='trSSR_CLSRCH_MTG1$']");
            course.classes = Array.from(classesDom).map(classDom => {
                const section = classDom.children[1].innerText.trim().replace(/[\n]/, " ");
                const daysAndTimes = classDom.children[2].innerText.trim().split(/[\n]/);
                id += 1;
                return new Class(id, section, daysAndTimes);
            })
            return course;
        });
        console.log(courses);
        this.setState({courses: courses})
    }

    componentDidMount() {
        // this.awaitDom();
        // setTimeout(() => {
        //     this.mapDomToObjects(this.rawData);
        // }, 500);
    }

    isValidMove = (draggableId, sourceDroppableId, destinationDroppableId) => {
        const sourceGroup = this.state.groups.filter(group => group.title === sourceDroppableId)[0];
        const draggedClass = sourceGroup.classes.filter(dClass => dClass.id.toString() === draggableId)[0];
        return draggedClass.courseTitle === destinationDroppableId;
    }

    onDragEnd = (result) => {
        const {destination, source, draggableId} = result;

        if (!destination)
            return;

        if (destination.droppableId === source.droppableId && destination.index === source.index)
            return;

        // if user is trying to drag from a course column to a group column
        if (source.droppableId.includes(" - ") && destination.droppableId.includes("Group")) {
            let sourceCourse = this.state.courses.filter(course => course.title === source.droppableId)[0];
            const draggedClass = sourceCourse.classes.filter(c => c.id.toString() === draggableId)[0];
            // Remove dragged class from its course
            sourceCourse.classes = sourceCourse.classes.filter(c => c.id.toString() !== draggableId);
            // Create new courses object containing sourceCourse after removing its dragged class
            const newCourses = this.state.courses.map(course => course.title === sourceCourse.title ? sourceCourse : course);

            const destinationGroup = this.state.groups.filter(group => group.title === destination.droppableId)[0];
            destinationGroup.classes = [...destinationGroup.classes, {courseTitle: source.droppableId, ...draggedClass}];
            const newGroups = this.state.groups.map(group => group.title === destinationGroup.title ? destinationGroup : group);

            this.setState({...this.state, courses: newCourses, groups: newGroups});
        }

        // if user is trying to drag from a group column to a course column
        if (source.droppableId.includes("Group") && destination.droppableId.includes(" - ")) {
            if (this.isValidMove(draggableId, source.droppableId, destination.droppableId)) {
                let sourceGroup = this.state.groups.filter(group => group.title === source.droppableId)[0];
                const draggedClass = sourceGroup.classes.filter(dClass => dClass.id.toString() === draggableId)[0];
                // Remove dragged class from its group
                sourceGroup.classes = sourceGroup.classes.filter(c => c.id.toString() !== draggableId);
                // Create new groups object containing sourceGroup after removing its dragged class
                const newGroups = this.state.groups.map(group => group.title === sourceGroup.title ? sourceGroup : group);

                const destinationCourse = this.state.courses.filter(course => course.title === destination.droppableId)[0];
                destinationCourse.classes = [...destinationCourse.classes, {..._.omit(draggedClass, 'courseTitle')}]
                const newCourses = this.state.courses.map(course => course.title === destinationCourse.title ? destinationCourse : course);

                this.setState({...this.state, courses: newCourses, groups: newGroups});
            }
        }

    }

    addGroup = () => {
        const groupCount = this.state.groups.length;
        const newGroups = [...this.state.groups, new Group(`Group ${groupCount + 1}`, [])]
        const newState = {...this.state, groups: newGroups}
        this.setState(newState);
    }

    renderLandingPage = () => {
        if (!this.state.courses)
            return <div className="ui active text loader">Loading...</div>
        return (
            <React.Fragment>
                <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart}>
                    <Grid.Column>
                        <Accordion styled>
                            <Items items={this.state.courses} allowedDestination={this.state.allowedDestination}/>
                        </Accordion>
                    </Grid.Column>
                    <Grid.Column>
                        <Accordion styled>
                            <Items items={this.state.groups} allowedDestination={this.state.allowedDestination}/>
                        </Accordion>
                        <div style={{marginTop: '8px'}}>
                            <Button icon="plus" color="violet" fluid onClick={this.addGroup}/>
                        </div>
                        <Link to="/tables">
                            <Button animated primary>
                                <Button.Content visible>Build</Button.Content>
                                <Button.Content hidden><Icon name='wrench'/></Button.Content>
                            </Button>
                        </Link>
                    </Grid.Column>
                </DragDropContext>
            </React.Fragment>
        )
    }

    render() {
        return (
            <Grid columns={2}>
                {this.renderLandingPage()}
            </Grid>
        );
    }
}

export default CreateGroup;