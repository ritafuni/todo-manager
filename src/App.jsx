import React from 'react';
import initialData from "./initial-data";
import Column from "./Column";
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
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

    //reorder
    const startColumn = state.columns[source.droppableId];
    const finishColumn = state.columns[destination.droppableId];

    const newTaskIds = Array.from(startColumn.taskIds);
    //delete source id
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...startColumn,
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
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
          <Column
            key={state.columns["column-1"].id}
            column={column}
            tasks={tasks}
            saveFunc={SaveJSON}
            loadFunc={LoadJSON}
          />
      </Container>
    </DragDropContext>
  );
}

export default App;
