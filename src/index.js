import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import initialData from "./initial-data";
import Column from "./Column";
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
`;

function App(){
  const [state, changeState] = React.useState(initialData);

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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
      {state.columnOrder.map(columnId => {
        const column = state.columns[columnId];
        const tasks = state.columns[columnId].taskIds.map(taskId => state.tasks[taskId]);

        return (
          <Column
            key={column.id}
            column={column}
            tasks={tasks}
          />
        );
      })}
      </Container>
    </DragDropContext>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
