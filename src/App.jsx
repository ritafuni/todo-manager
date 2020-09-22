import React from 'react';
import { initialTasks, initialRoutines, initialDeadlines } from './initial-data';
import TodayTaskList from './Components/TodayTaskList';
import RoutineHome from './Components/RoutineHome';
import DeadlineTaskList from './Components/DeadlineTaskList';
import Menubar from './Components/Menubar';
import Sidebar from './Components/Sidebar';
import { DragDropContext } from 'react-beautiful-dnd';
// import styled from 'styled-components';

function App(){
  //tasks: TODO data
  const [tasks, changeTasks] = React.useState(initialTasks);
  const [deadlines, changeDeadlines] = React.useState(initialDeadlines);
  //drawer open
  const [drawerOpen, changeDrawerState] = React.useState(true);
  //page state
  const [pageState, changePageState] = React.useState("today-task");
  const LOCALSTORAGE_KEY = 'TODO-Manager';

  function SaveJSON(){
    let stringifyJSON = JSON.stringify(tasks);
    window.localStorage.setItem(LOCALSTORAGE_KEY, stringifyJSON);
  }

  function LoadJSON(){
    const storeData = window.localStorage.getItem(LOCALSTORAGE_KEY);
    const json = storeData ? JSON.parse(storeData) : initialTasks;
    changeTasks(
      json
    );
  }

  function ToggleDrawer(){
    changeDrawerState(!drawerOpen);
  }

  function AddDeadline(index){
    let newDeadlineList = deadlines.deadlines;
    const today = new Date().toISOString().slice(0,10);
    const newDeadlineCount = deadlines.deadlineCount + 1;
    const emptyDeadline = {
      id: 'deadline-' + newDeadlineCount,
      content: '',
      category: '',
      deadline: today
    }
    newDeadlineList.splice(index + 1, 0, emptyDeadline);
    changeDeadlines({
      deadlines: newDeadlineList,
      deadlineCount: newDeadlineCount
    });
  }

  function AddTask(index){
    //add taskCount
    const newTaskCount = tasks.taskCount + 1;
    //add task
    const newTaskId = 'task-' + newTaskCount.toString();
    const newTasks = {
      ...tasks.tasks,
      [newTaskId]: { id: newTaskId, content: '', category: '仕事', taskType: '毎日'}
    }
    //update taskId array
    const columnId = 'column-1';
    const newTaskIds = Array.from(tasks.columns[columnId].taskIds);
    newTaskIds.splice(index + 1, 0, newTaskId);
    const newColumn = {
      ...tasks.columns[columnId],
      taskIds: newTaskIds
    }
    //update tasks
    changeTasks({
      tasks: newTasks,
      taskCount: newTaskCount,
      columns: {
        ...tasks.columns,
        [newColumn.id]: newColumn
      }
    });
  }

  function DeleteDeadline(index){
    let newDeadlineList = deadlines.deadlines;
    newDeadlineList.splice(index, 1);
    changeDeadlines({
      ...deadlines,
      deadlines: newDeadlineList
    });
  }

  function DeleteTask(index){
    const columnId = 'column-1';
    const newTaskIds = Array.from(tasks.columns[columnId].taskIds);
    newTaskIds.splice(index, 1);
    const newColumn = {
      ...tasks.columns[columnId],
      taskIds: newTaskIds
    }

    changeTasks({
      ...tasks,
      columns: {
        ...tasks.columns,
        //[]で囲むことによって、:の左側にも値が代入できる
        [newColumn.id]: newColumn
      }
    });
  }

  function EditDeadline(index, type, value){
    let newDeadline = {
      ...deadlines.deadlines[index],
      [type]: value
    };
    let newDeadlineList = deadlines.deadlines;
    newDeadlineList[index] = newDeadline;
    changeDeadlines({
      ...deadlines,
      deadlines: newDeadlineList
    });
  }

  function EditTask(index, type, value){
    let newTask = {
      ...tasks.tasks[index],
      [type]: value
    };

    changeTasks({
      ...tasks,
      tasks: {
        ...tasks.tasks,
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
    const column = tasks.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    //delete source id
    newTaskIds.splice(source.index, 1);
    //add to destination
    newTaskIds.splice(destination.index, 0, draggableId);
    const newColumn = {
      ...column,
      taskIds: newTaskIds
    }

    changeTasks({
      ...tasks,
      columns: {
        ...tasks.columns,
        //[]で囲むことによって、:の左側にも値が代入できる
        [newColumn.id]: newColumn
      }
    });
  }

  const loadColumn = 'column-1';
  const column = tasks.columns[loadColumn];
  const tasksArray = tasks.columns[loadColumn].taskIds.map(taskId => tasks.tasks[taskId]);
  return (
    <div>
      <Menubar
        saveFunc={SaveJSON}
        loadFunc={LoadJSON}
        drawerOpen={drawerOpen}
        toggleDrawer={ToggleDrawer}
      />
      <Sidebar
        drawerOpen={drawerOpen}
        toggleDrawer={ToggleDrawer}
        changePage={changePageState}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        {
          (pageState === 'today-task') &&
          <TodayTaskList
            key={tasks.columns['column-1'].id}
            column={column}
            tasks={tasksArray}
            addFunc={AddTask}
            delFunc={DeleteTask}
            editFunc={EditTask}
            drawerOpen={drawerOpen}
          />
        }
        {
          (pageState === 'routines') &&
          <RoutineHome drawerOpen={drawerOpen} />
        }
        {
          (pageState === 'deadline-task') &&
          <DeadlineTaskList
            drawerOpen={drawerOpen}
            deadlines={deadlines.deadlines}
            addFunc={AddDeadline}
            delFunc={DeleteDeadline}
            editFunc={EditDeadline}
          />
        }
      </DragDropContext>
    </div>
  );
}

export default App;
