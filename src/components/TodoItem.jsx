import React from "react";
import Button from "@mui/material/Button";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

//TodoList is parent component.
//the props: completed, id, title, toggleTodo, and deleteTodo are defined in `TodoList` component and passed down to the TodoItem component as arguments.
export function TodoItem({
  completed,
  id,
  title,
  toggleTodo,
  editTodo,
  deleteTodo,
}) {
  return (
    <div className="todo-item">
      <li>
        {/* <label>: This is an HTML <label> element, which is used to associate a label with a form control: checkbox. */}
        <label>
          {/* This is an HTML <input> element of type "checkbox". It represents a checkbox form control. */}
          {/* The checked attribute is set to the value of the completed prop, which
        determines whether the checkbox should be checked or not based on the
        completion status of the todo item. Initially, since completed: false, checkbox is unclicked.*/}
          {/* The onChange event is triggered when the hen the user interacts with the checkbox, such as clicking on it to check or uncheck it.  
        When the onChange event occurs, the provided callback function is executed.
        it calls the toggleTodo function with two arguments: the id prop
        (identifying the todo item) and the new value of the checkbox
        (e.target.checked). */}
          {/* This allows the TodoItem component to update the completion status of
        the todo item when the checkbox is clicked. */}
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => toggleTodo(id, e.target.checked)}
          />
          {/* {title}: This is the content of the label element. It displays the title
        of the todo item as the label text for the checkbox. */}
          <div className={`completed ${completed ? "checked" : ""}`}>
            {title}
          </div>
        </label>

        {/* () => editTodo(id): This arrow function takes no arguments (()) and it calls
      the editTodo function with the id argument. The id prop represents the
      unique identifier of the todo item that should be edited. */}
        <Button
          sx={{ padding: "0px 0px" }}
          size="small"
          onClick={() => editTodo(id)}
          className=""
          variant="contained"
          color="secondary"
        >
          <EditNoteRoundedIcon />
        </Button>

        {/* onClick={() => deleteTodo(id)}: When the button is clicked, the arrow function is executed.*/}
        {/* () => deleteTodo(id): This arrow function takes no arguments (()) and it calls
      the deleteTodo function with the id argument. The id prop represents the
      unique identifier of the todo item that should be deleted. */}
        <Button
          sx={{ padding: "0px 0px" }}
          size="small"
          onClick={() => deleteTodo(id)}
          className="btn btn-danger"
          variant="contained"
          color="success"
        >
          <DeleteRoundedIcon />
        </Button>
      </li>
    </div>
  );
}
