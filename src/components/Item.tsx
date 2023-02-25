import React from 'react';
import {Card, Paper, Typography} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';

type ItemPropsType = {
    id: string
    title: string
    columnId: string
    deleteTask: (id: string, columnId: string) => void
}

const Item = (props: ItemPropsType) => {

    const dragStarted = (event: React.DragEvent<HTMLDivElement>, taskTitle: string) => {
        event.dataTransfer.setData("taskTitle", taskTitle);
    }

    const onClickHandler = () => {
        props.deleteTask(props.id, props.columnId);
    }

    return (
        <Card style={{display: "flex", gap: "20px", justifyContent: "space-between", marginTop: "20px"}}
              draggable={true} onDragEnd={() => onClickHandler()}
              onDragStart={(e) => dragStarted(e, props.title)}
        >
            <ClearIcon onClick={() => onClickHandler()}/>
            <Typography variant="h5" component="h5">
                {props.title}
            </Typography>
            <Paper elevation={24}/>
        </Card>
    );
};

export default Item;