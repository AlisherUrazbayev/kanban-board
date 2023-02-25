import React, {useState} from 'react';
import './App.css';
import Column from "./components/Column";
import Input from "./components/Input";
import {Grid} from "@mui/material";
import {v1} from "uuid";

export type ColumnType = {
  id: string
  title: string
}

export type TaskType = {
  id: string
  title: string
}

export type TasksListType = {
  [id: string]: Array<TaskType>
}

const columnId1 = v1();
const columnId2 = v1();
const columnId3 = v1();

function App() {

  // eslint-disable-next-line
  const [columns, setColumns] = useState<Array<ColumnType>>([
    {id: columnId1, title: "TODO"},
    {id: columnId2, title: "In progress"},
    {id: columnId3, title: "Done"},
  ]);

  let [tasks, setTasks] = useState<TasksListType>({
    [columnId1]: [
      {id: v1(), title: "Start a project."},
      {id: v1(), title: "Get task1.2 done."},
    ],
    [columnId2]: [
      {id: v1(), title: "Finish hotfixes."},
      {id: v1(), title: "Update change log."},
    ],
    [columnId3]: [
      {id: v1(), title: "Attend a meeting."},
      {id: v1(), title: "Get the job done."},
    ]
  });

  const deleteTask = (id: string, columnId: string) => {
    setTasks({...tasks, [columnId]: tasks[columnId].filter(task => task.id !== id)});
  }

  const addTask = (title: string, columnId: string) => {
    const newTask = {id: v1(), title};
    const newArr = [...tasks[columnId], newTask];
    setTasks({...tasks, [columnId]: newArr})
  }

  const addNewTask = (title: string) => {
    const newTask = {id: v1(), title};
    const newArr = [...tasks[columnId1], newTask];
    setTasks({...tasks, [columnId1]: newArr})
  }

  const tasksComponents = columns.map((el) => {
    return (
        <Column key={el.id}
                title={el.title} tasks={tasks[el.id]} columnId={el.id}
                deleteTask={deleteTask} addTask={addTask}
        />
    )
  })

  return (
      <div className="App">
        <h1>Kanban Board</h1>
        <Input addTask={addNewTask}/>
        <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}
              style={{marginTop: "10px"}}>
          {tasksComponents}
        </Grid>
      </div>
  );
}

export default App;
