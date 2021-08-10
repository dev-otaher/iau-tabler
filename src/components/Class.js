import React from "react";
import {Draggable} from "react-beautiful-dnd";
import styled from "styled-components";

const Container = styled.div`
  background: ${props => (props.isDragging ? 'lightgreen' : 'rgba(0,0,0,0.06)')};
  border-radius: 10px;
  margin-bottom: -0.4rem !important;
  border: 1px solid lightgrey;
`
const Class = (props) => {
    const renderData = () => {
        return (props.inCourseContainer ?
            <>
                <div className="center aligned column">{props.data["title"]}</div>
                <div className="center aligned column">{props.data["daysAndTimes"]}</div>
            </> :
            <>
                <div className="center aligned column">{props.data["courseTitle"]}</div>
                <div className="center aligned column">{props.data["title"]}</div>
                <div className="center aligned column">{props.data["daysAndTimes"]}</div>
            </>);
    }
    return (
        <Draggable draggableId={`${props.id}`} index={props.id} key={props.id}>
            {(provided, snapshot) => (
                <Container className="ui equal width grid"
                           ref={provided.innerRef}
                           {...provided.draggableProps}
                           {...provided.dragHandleProps}
                           isDragging={snapshot.isDragging}>
                    {renderData()}
                </Container>
            )}
        </Draggable>
    )
}

export default Class;