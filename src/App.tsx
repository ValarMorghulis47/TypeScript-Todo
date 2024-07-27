import {
  AppBar,
  Container,
  Stack,
  Toolbar,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import TodoItem from "./components/TodoItem";
import { getTodos, saveTodos } from "./utils/features";

const App = () => {
  const [todos, setTodos] = useState<TodoItemType[]>(getTodos());


  const [title, setTitle] = useState<TodoItemType["title"]>("");

  const submitHandler = () => {
    const newTodo = {
      title,
      isCompleted: false,
      id: String(Math.ceil(Math.random() * 100)),
    };
    setTodos([...todos, newTodo]);
    setTitle("");
  };

  const completeHandler = (id: TodoItemType["id"]) => {
    const newTodos = todos.map((i) => {
      if (i.id === id) {
        return { ...i, isCompleted: !i.isCompleted };
      }
      return i;
    });
    setTodos(newTodos);
  };

  const deleteHandler = (id: TodoItemType["id"]) => {
    const newTodos = todos.filter((i) => i.id !== id);
    setTodos(newTodos);
  };

  const editHandler = (id: TodoItemType["id"], newVal: TodoItemType['title']) => {
    const newTodos = todos.map((i) => {
      if (i.id === id) {
        return { ...i, title: newVal };
      }
      return i;
    });
    setTodos(newTodos);
  };

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  return (
    <Container maxWidth="sm" sx={{ height: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography>Todo App</Typography>
        </Toolbar>
      </AppBar>

      <Stack height={"80%"} direction={"column"} spacing={"1rem"} p={"1rem"}>
        {todos.map((i) => (
          <TodoItem
            key={i.id}
            todo={i}
            completeHandler={completeHandler}
            deleteHandler={deleteHandler}
            editHandler={editHandler}
          />
        ))}
      </Stack>
      <TextField
        value={title}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        fullWidth
        label={"New Task"}
      />
      <Button
        sx={{
          margin: "1rem 0",
        }}
        fullWidth
        variant="contained"
        disabled={title === ""}
        onClick={submitHandler}
      >
        ADD
      </Button>
    </Container>
  );
};

export default App;