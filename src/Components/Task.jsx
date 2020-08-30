import React from 'react';
import styled from 'styled-components';
import {Draggable} from 'react-beautiful-dnd';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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
          <td>
            <Input
              value={props.task.content}
              onChange={(event) => props.editFunc(event.target.value, props.task.id, 'content')}
            />
          </td>
          <td>
            <Select
              value={props.task.category}
              onChange={(event) => props.editFunc(event.target.value, props.task.id, 'category')}
            >
              <MenuItem value='仕事'>仕事</MenuItem>
              <MenuItem value='家事'>家事</MenuItem>
              <MenuItem value='趣味'>趣味</MenuItem>
            </Select>
          </td>
          <td>
            <Select
              value={props.task.taskType}
              onChange={(event) => props.editFunc(event.target.value, props.task.id, 'taskType')}
            >
              <MenuItem value='毎日'>毎日</MenuItem>
              <MenuItem value='毎週'>毎週</MenuItem>
              <MenuItem value='毎月'>毎月</MenuItem>
              <MenuItem value='不定期'>不定期</MenuItem>
              <MenuItem value='割込'>割込</MenuItem>
            </Select>
          </td>
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
