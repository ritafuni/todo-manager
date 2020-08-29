import React from 'react';
import styled from 'styled-components';
import Task from './Task';
import SaveLoadButton from './SaveLoadButton';
import {Droppable} from 'react-beautiful-dnd';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.tbody`
  padding: 8px;
  flex-grow: 1;
  min-height: 100px;
`;

function Column(props){
  return (
    <Container>
      <Title>
        {props.column.title}
      </Title>
      <table className='table'>
        <thead>
          <tr className='bg-primary text-light'>
            <th scope='col'>完了</th>
            <th scope='col'>タスク名</th>
            <th scope='col'>カテゴリ</th>
            <th scope='col'>タスク種</th>
          </tr>
        </thead>
        <Droppable droppableId={props.column.id}>
        {(provided) => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {props.tasks.map((task, index) => <Task key={task.id} task={task} index={index} />)}
            {provided.placeholder}
          </TaskList>
        )}
        </Droppable>
      </table>
    </Container>
  );
}

export default Column;
