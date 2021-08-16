import React from "react";
import Class from "./Class";
import {Droppable} from "react-beautiful-dnd";
import styled from "styled-components";
import {Accordion, Icon} from "semantic-ui-react";

const ClassesContainer = styled.div`
  transition: background-color 0.2s ease;
  padding-left: 1em !important;
  padding-right: 1em !important;
  flex-grow: 1;
`

const ItemContainer = styled.div`
  background: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
`

class Item extends React.Component {
    itemCount = 0;
    renderClasses = () => {
        return this.props.classes.map((c, index) => {
            this.itemCount += 1;
            return <Class id={c.id} key={index} data={c} inCourseContainer={this.props.inCourseContainer}/>
        })
    }

    render() {
        const {isActive} = this.props;
        return (
            <Droppable droppableId={this.props.title}>
                {(provided, snapshot) => {
                    return (
                        <ItemContainer ref={provided.innerRef} {...provided.droppableProps}
                                       isDraggingOver={snapshot.isDraggingOver}>
                            <Accordion.Title onClick={this.props.onClick} active={isActive}>
                                <Icon name={`${isActive ? "minus" : "plus"}`}/>
                                {this.props.title}
                            </Accordion.Title>
                            <Accordion.Content active={isActive}>
                                <ClassesContainer>
                                    {this.renderClasses()}
                                    {provided.placeholder}
                                </ClassesContainer>
                            </Accordion.Content>
                        </ItemContainer>
                    )
                }}
            </Droppable>
        )
    }
}

export default Item;