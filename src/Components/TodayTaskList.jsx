import React from 'react';
import styled from 'styled-components';
import Task from './Task';
import {Droppable} from 'react-beautiful-dnd';
import { drawerWidth } from './Sidebar';

const Container = styled.div`
  margin-left: ${props => props.drawerOpen ? drawerWidth : 0}px;
  display: flex;
  flex-direction: column;

  > table {
    margin-bottom: 1px;
  }
`;

const TaskList = styled.tbody`
  padding: 8px;
  flex-grow: 1;
  min-height: 100px;
`;

const Title = styled.h4`
  padding: 8px;
`;

function TodayTaskList(props){
  return (
    <Container drawerOpen={props.drawerOpen}>
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
            <th scope='col'>削除</th>
            <th scope='col'>追加</th>
          </tr>
        </thead>
        <Droppable droppableId={props.column.id}>
        {(provided) => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {props.tasks.map((task, index) =>
              <Task
                key={task.id}
                task={task}
                index={index}
                addFunc={props.addFunc}
                delFunc={props.delFunc}
                editFunc={props.editFunc}
              />
            )}
            {provided.placeholder}
          </TaskList>
        )}
        </Droppable>
      </table>
    </Container>
  );
}

export default TodayTaskList;
