import React from 'react';
import initialData from './initial-data';
import Column from './Components/Column';
import Menubar from './Components/Menubar';
import Sidebar from './Components/Sidebar';
import { DragDropContext } from 'react-beautiful-dnd';
// import styled from 'styled-components';

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
    changeState(
      json
    );
  }

  function AddTask(index){
    //add taskCount
    const newTaskCount = state.taskCount + 1;

    //add task
    const newTaskId = 'task-' + newTaskCount.toString();
    const newTasks = {
      ...state.tasks,
      [newTaskId]: { id: newTaskId, content: '', category: '仕事', taskType: '毎日'}
    }

    //update taskId array
    const columnId = 'column-1';
    const newTaskIds = Array.from(state.columns[columnId].taskIds);
    newTaskIds.splice(index + 1, 0, newTaskId);
    const newColumn = {
      ...state.columns[columnId],
      taskIds: newTaskIds
    }

    //update state
    changeState({
      tasks: newTasks,
      taskCount: newTaskCount,
      columns: {
        ...state.columns,
        [newColumn.id]: newColumn
      }
    });
  }

  function DeleteTask(index){
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

  function EditTask(value, index, type){
    let newTask;
    switch(type){
      case 'content':
        newTask = {
          ...state.tasks[index],
          content: value
        };
        break;
      case 'category':
        newTask = {
          ...state.tasks[index],
          category: value
        };
        break;
      case 'taskType':
        newTask = {
          ...state.tasks[index],
          taskType: value
        };
        break;
      default:
        break;
    }

    changeState({
      ...state,
      tasks: {
        ...state.tasks,
        [index]: newTask
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

    //reorder
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
    <div>
      <Menubar
        saveFunc={SaveJSON}
        loadFunc={LoadJSON}
      />
      <Sidebar />
      <DragDropContext onDragEnd={onDragEnd}>
        <Column
          key={state.columns["column-1"].id}
          column={column}
          tasks={tasks}
          addFunc={AddTask}
          delFunc={DeleteTask}
          editFunc={EditTask}
        />
      </DragDropContext>
    </div>
  );
}

export default App;
