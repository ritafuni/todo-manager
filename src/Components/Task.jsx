import React from 'react';
import styled from 'styled-components';
import {Draggable} from 'react-beautiful-dnd';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddBoxIcon from '@material-ui/icons/AddBox';

//>?で内部のスタイル指定ができる
const Container = styled.tr`
  background-color: ${props => (props.isDragging ? 'skyblue' : 'white')};

  > td > input {
    margin-left: 5px;
    transform: scale(1.5);
  }

  > td > button {
    padding: 0;
  }
`;

function Task(props){
  return(
    <Draggable
      draggableId={props.task.id}
      index={props.index}
    >
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <td><input type='checkbox' className='task-checkbox' /></td>
          <td>{props.task.content}</td>
          <td>{props.task.category}</td>
          <td>{props.task.taskType}</td>
          <td>
            <button className='btn' onClick = {() => props.delFunc(props.index)}>
              <DeleteForeverIcon />
            </button>
          </td>
          <td>
            <button className='btn' onClick = {() => props.addFunc(props.index)}>
              <AddBoxIcon />
            </button>
          </td>
        </Container>
      )}
    </Draggable>
  );
}

export default Task;
