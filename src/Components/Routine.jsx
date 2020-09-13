import React from 'react';
import styled from 'styled-components';
import {Draggable} from 'react-beautiful-dnd';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
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

const EditButton = styled.button`
  float: right;
`;

function Routine(props){
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
          <td>
            <Input
              value={props.task.content}
              onChange={(event) => props.owFunc(props.index, 'content', event.target.value)}
            />
          </td>
          <td>
            <Select
              value={props.task.category}
              onChange={(event) => props.owFunc(props.index, 'category', event.target.value)}
            >
              <MenuItem value='仕事'>仕事</MenuItem>
              <MenuItem value='家事'>家事</MenuItem>
              <MenuItem value='趣味'>趣味</MenuItem>
            </Select>
          </td>
          <td>
            {props.task.cycle}
            <EditButton className='btn' onClick = {() => props.addFunc(props.index)}>
              <EditIcon />
            </EditButton>
          </td>
          <td>
            <button className='btn' onClick = {() => props.delFunc(props.index)}>
              <DeleteForeverIcon />
            </button>
          </td>
        </Container>
      )}
    </Draggable>
  );
}

export default Routine;
