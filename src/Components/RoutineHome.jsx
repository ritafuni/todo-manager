import React from 'react';
import styled from 'styled-components';
import { drawerWidth } from './Sidebar';
import EditRoutine from './EditRoutine';
import RoutineList from './RoutineList';
import { initialRoutines } from '../initial-data';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* drawer-open class */
  &.drawer-open {
    transform: translateX(${drawerWidth}px);
    transition: 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    width: calc(100% - ${drawerWidth}px);
  }
  /* drawer-close class */
  &.drawer-close {
    transform: translateX(0px);
    transition: 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    width: 100%;
  }
`;

function Routines(props){
  const [routineList, setRoutineList] = React.useState(initialRoutines);
  //編集中のルーチンの状態を保存しておくためのステート
  const [editingRoutine, setEditingRoutine] = React.useState(null);
  const [editingRoutineIdx, setEditingRoutineIdx] = React.useState(-1);
  const [pageState, changePageState] = React.useState('RoutineList');

  function DeleteRoutine(index){
    let afterList = routineList.routines.filter((ele, idx) => idx !== index);
    setRoutineList({
      routines: afterList,
      routineCount: routineList.routineCount
    });
  }

  function OverWriteRoutine(index, routine){
    let afterList = routineList.routines;
    afterList[index] = routine;
    setRoutineList({
      routines: afterList,
      routineCount: routineList.routineCount
    });
  }

  function OverwriteRoutinePart(index, type, value){
    let afterList = routineList.routines;
    afterList[index] = {
      ...routineList.routines[index],
      [type]: value
    }
    setRoutineList({
      routines: afterList,
      routineCount: routineList.routineCount
    });
  }

  return (
    <Container
      drawerOpen={props.drawerOpen}
      className={props.drawerOpen ? 'drawer-open' : 'drawer-close'}
    >
      {
        (pageState === 'RoutineList') &&
        <RoutineList
          changePageFunc={changePageState}
          routineList={routineList}
          delFunc={DeleteRoutine}
          owFunc={OverwriteRoutinePart}
          setEditingRoutine={setEditingRoutine}
          setEditingRoutineIdx={setEditingRoutineIdx}
        />
      }
      {
        (pageState === 'EditRoutine') &&
        <EditRoutine
          changePageFunc={changePageState}
          editingRoutine={editingRoutine}
          editingRoutineIdx={editingRoutineIdx}
          owFunc={OverWriteRoutine}
        />
      }
    </Container>
  );
}

export default Routines;
