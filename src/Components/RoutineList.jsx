import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Routine from './Routine';

const ButtonDiv = styled.div`
  float: right;
`;

const RoutineBody = styled.tbody`
padding: 8px;
`
const Title = styled.h4`
  padding: 8px;
`;


function RoutineList(props){
  return (
    <div>
      <Title>
        ルーチン一覧
        <ButtonDiv>
          <button className='btn btn-primary' onClick={() => props.changePageFunc('EditRoutine')}>新規ルーチン</button>
        </ButtonDiv>
      </Title>
      <table className='table'>
        <thead>
          <tr className='bg-primary text-light'>
            <th scope='col'>タスク名</th>
            <th scope='col'>カテゴリ</th>
            <th scope='col'>周期</th>
            <th scope='col'>削除</th>
            <th scope='col'>編集</th>
          </tr>
        </thead>
        <Droppable droppableId='RoutineDroppable'>
        {(provided) => (
          <RoutineBody
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {props.routineList.routines.map((routine, index) =>
              <Routine
                key={routine.id}
                routine={routine}
                index={index}
                delFunc={props.delFunc}
                editFunc={props.editFunc}
                owFunc={props.owFunc}
                changePageFunc={props.changePageFunc}
                setEditingRoutine={props.setEditingRoutine}
                setEditingRoutineIdx={props.setEditingRoutineIdx}
              />
            )}
            {provided.placeholder}
          </RoutineBody>
        )}
        </Droppable>
      </table>
    </div>
  );
}

export default RoutineList;
