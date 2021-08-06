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
        return Object.entries(props.data).map(([key, value], index) => {
            if (key !== "id")
                return <div key={index} className="center aligned column">{value}</div>
        })
    }
    return (
        <Draggable draggableId={`${props.index}`} index={props.index} key={props.index} >
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