import {
    Paper,
    Typography,
    Checkbox,
    Button,
    Stack,
    TextField,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { FormEvent, useState } from "react";

type PropsType = {
    todo: TodoItemType;
    completeHandler: (id: TodoItemType["id"]) => void;
    deleteHandler: (id: TodoItemType["id"]) => void;
    editHandler: (id: TodoItemType["id"], newVal: TodoItemType["title"]) => void;
}


const TodoItem = ({ todo, completeHandler, deleteHandler, editHandler }: PropsType) => {
    const [textVal, setTextVal] = useState<string>('');
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        editHandler(todo.id, textVal);
        setIsEditing(false);
    };

    return (
        <Paper
            sx={{
                padding: "1rem",
            }}
        >
            <Stack direction={"row"} alignItems={"center"}>
                {
                    isEditing ? (
                        <form onSubmit={submitHandler}>
                            <TextField
                                value={textVal}
                                onChange={(e) => setTextVal(e.target.value)}
                            />
                        </form>
                    ) : (
                        <Typography
                            marginRight={"auto"}
                            sx={{
                                textDecoration: todo.isCompleted ? "line-through" : "none",
                                flexGrow: 1,
                            }}
                        >
                            {todo.title}
                        </Typography>
                    )
                }
                <Checkbox checked={todo.isCompleted} onChange={() => completeHandler(todo.id)} />
                <Button
                    sx={{ opacity: 0.5, color: "black" }}
                    onClick={() => deleteHandler(todo.id)}
                >
                    <Delete />
                </Button>
                {
                    isEditing ? (
                        <Button
                            onClick={() => {editHandler(todo.id, textVal);setIsEditing(false)}}
                        >
                            Save
                        </Button>
                    ) : (
                        <Button
                            onClick={() => {
                                setTextVal(todo.title);
                                setIsEditing(true);
                            }}
                        >
                            Edit
                        </Button>
                    )
                }
            </Stack>
        </Paper>
    );
};

export default TodoItem;