import React from 'react';
import {TaskType} from "../App";
import Item from "./Item";
import {Card, CardContent, CardHeader, Grid} from "@mui/material";

type ColumnPropsType = {
    title: string
    tasks: Array<TaskType>
    columnId: string
    deleteTask: (id: string, columnId: string) => void
    addTask: (title: string, columndId: string) => void
}

const Column = (props: ColumnPropsType) => {

    const draggingOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }

    const dragedDroped = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        let taskTitle = event.dataTransfer.getData("taskTitle");
        props.addTask(taskTitle, props.columnId);
    }

    return (
        <Grid item xs={2} sm={4} md={4} key={props.columnId}>
            <Card variant="outlined"
                  draggable={true} onDragOver={(e) => draggingOver(e)}
                  onDrop={(e) => dragedDroped(e)}
                  style={{minHeight: "300px"}}>
                <CardHeader title={props.title}>
                </CardHeader>
                <CardContent>
                    <hr/>
                    {props.tasks.map((el) => {
                        return <Item id={el.id} title={el.title} key={el.id}
                                     columnId={props.columnId} deleteTask={props.deleteTask}/>
                    })}
                </CardContent>
            </Card>
        </Grid>
    )
};

export default Column;