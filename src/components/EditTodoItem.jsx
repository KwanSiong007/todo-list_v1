import React, { useState } from "react";
import Button from "@mui/material/Button";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";

//const [newTitle, setNewTitle] = useState(todo.title);: This initializes a state variable `newTitle` using the useState hook. It's set to the title property of the provided `todo` prop. This state will hold the updated title.
//updateTodo(newTitle, todo.id): it calls the updateTodo function with the new title (newTitle) and the ID of the current todo.
export function EditTodoItem({ updateTodo, todo }) {
  const [newTitle, setNewTitle] = useState(todo.title);
  const handleSubmit = (e) => {
    e.preventDefault();
    updateTodo(newTitle, todo.id);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* For `input` element, its `value` is controlled by the newTitle state. The
      `onChange` event handler updates the `newTitle` state as the user types,
      effectively updating the input value. */}
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder="Update task"
      />

      <Button
        sx={{ padding: "0px 0px" }}
        size="small"
        type="submit"
        variant="contained"
        color="primary"
      >
        <FileUploadRoundedIcon />
      </Button>
    </form>
  );
}
