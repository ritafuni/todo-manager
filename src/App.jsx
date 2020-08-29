import React from 'react';
import initialData from './initial-data';
import Column from './Components/Column';
import Menubar from './Components/Menubar';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container = styled.div`
`;

function App(){
  const [state, changeState] = React.useState(initialData);
  const LOCALSTORAGE_KEY = 'TODO-Manager';

  function SaveJSON(){
    let stringifyJSON = JSON.stringify(state);
    window.localStorage.setItem(LOCALSTORAGE_KEY, stringifyJSON);
  }

  function LoadJSON(){
    const storeData = window.localStorage.getItem(LOCALSTORAGE_KEY);
    const json = storeData ? JSON.parse(storeData) : initialData;
    changeState(json);
  }

  function DeleteTask(index){
    console.log(index);
    const columnId = 'column-1';
    const newTaskIds = Array.from(state.columns[columnId].taskIds);
    newTaskIds.splice(index, 1);

    const newColumn = {
      ...state.columns[columnId],
      taskIds: newTaskIds
    }

    changeState({
      ...state,
      columns: {
        ...state.columns,
        //[]で囲むことによって、:の左側にも値が代入できる
        [newColumn.id]: newColumn
      }
    });
  }

  //resultに結果が入ってくる
  function onDragEnd(result){
    const {draggableId, source, destination} = result;
    if(!destination){
      return;
    }
    //位置が変わっていなければ何もしない
    if(destination.droppableId === source.droppableId &&
      destination.index === source.index
    ){
      return;
    }

    //reorder(columnが複数ある場合も想定されているのでリファクタ可)
    const column = state.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    //delete source id
    newTaskIds.splice(source.index, 1);
    //add to destination
    newTaskIds.splice(destination.index, 0, draggableId);
    const newColumn = {
      ...column,
      taskIds: newTaskIds
    }

    changeState({
      ...state,
      columns: {
        ...state.columns,
        //[]で囲むことによって、:の左側にも値が代入できる
        [newColumn.id]: newColumn
      }
    });
  }

  const loadColumn = "column-1";
  const column = state.columns[loadColumn];
  const tasks = state.columns[loadColumn].taskIds.map(taskId => state.tasks[taskId]);
  return (
    <Container>
      <Menubar
        saveFunc={SaveJSON}
        loadFunc={LoadJSON}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <Column
          key={state.columns["column-1"].id}
          column={column}
          tasks={tasks}
          delFunc={DeleteTask}
        />
      </DragDropContext>
    </Container>
  );
}

export default App;
