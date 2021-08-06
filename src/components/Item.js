import React from "react";
import Class from "./Class";
import {Droppable} from "react-beautiful-dnd";
import styled from "styled-components";
import {Accordion} from "semantic-ui-react";

const ClassesContainer = styled.div`
  transition: background-color 0.2s ease;
  background: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
  padding-left: 1em !important;
  padding-right: 1em !important;
  flex-grow: 1;
`

class Item extends React.Component {
    itemCount = 0;
    renderClasses = () => {
        // console.log(this.props)
        // console.log(!this.props.title.includes("Group"));
        return this.props.classes.map((c, index) => {
            this.itemCount += 1;
            return <Class index={c.id} key={index} data={c}/>
        })
    }

    isDropDisabled = () => {


    }

    render() {
        return (
            <React.Fragment>
                <Accordion.Title onClick={this.props.onClick} active={this.props.isActive}>
                    <i className="dropdown icon"/>
                    {this.props.title}
                </Accordion.Title>
                <Accordion.Content active={this.props.isActive}>
                    <Droppable
                        droppableId={this.props.title}>
                        {(provided, snapshot) => {
                            return (
                                <ClassesContainer ref={provided.innerRef}
                                                  {...provided.droppableProps}
                                                  isDraggingOver={snapshot.isDraggingOver}>
                                    {this.renderClasses()}
                                    {provided.placeholder}
                                </ClassesContainer>
                            )
                        }}
                    </Droppable>
                </Accordion.Content>
            </React.Fragment>
        )
    }
}

export default Item;