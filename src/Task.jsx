import React from 'react';
import styled from 'styled-components';
import {Draggable} from 'react-beautiful-dnd';

//>?で内部のスタイル指定ができる
const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: white;

  > input {
    margin-right: 10px;
    transform: scale(1.5);
  }
`;

function Task(props){
  return(
    <Draggable
      draggableId={props.task.id}
      index={props.index}
    >
      {(provided) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <input type="checkbox" className="task-checkbox" />
          {props.task.content}
        </Container>
      )}
    </Draggable>
  );
}

export default Task;
