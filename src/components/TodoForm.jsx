import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";

//This line exports a function component named NewTodoForm.
//It takes an onSubmit as a prop, which will be a function: addTodo passed from the parent component.
export function TodoForm({ addTodo }) {
  const [newItem, setNewItem] = useState("");

  //This line defines the handleSubmit function that will be called when the form is submitted.
  function handleSubmit(e) {
    e.preventDefault();
    //This line checks if the newItem is an empty string, and if so, it immediately returns without further processing.
    if (newItem === "") return;
    //This line calls the onSubmit function that was passed as a prop from the parent component and passes the newItem value as an argument.
    addTodo(newItem);
    //This line resets the newItem state variable to an empty string after the form is submitted.
    setNewItem("");
  }

  return (
    <form onSubmit={handleSubmit} className="new-item-form">
      {/* This line defines a label element with the text "New Item" and
        associates it with the input element with id="item" using the htmlFor
        attribute. When users click on the label, it will focus the corresponding input field, making it more accessible and user-friendly.*/}
      <label htmlFor="item" className="new-item">
        New Item
      </label>
      {/* Input is a controlled component, meaning its value is controlled by
        the `newItem` state variable. */}
      {/* When the user types or modifies the content of the input field, the
        onChange event is triggered. This event captures the changes made by the
        user. */}
      {/* The part e => setNewItem(e.target.value) is an arrow function that
        defines what should happen when the onChange event occurs. The e is an
        event object that contains information about the event, and
        e.target.value retrieves the current value of the input field that
        triggered the event. */}
      {/* The setNewItem(e.target.value) part is a function call that updates the
        state of the component. In React, components can have state variables,
        and setNewItem is a function provided by the useState hook that allows
        us to update the value of the newItem state variable with the new value
        from the input field. */}
      <input
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        type="text"
        id="item"
      />

      <Button
        sx={{ padding: "0px 0px" }}
        size="small"
        type="submit"
        variant="contained"
        color="primary"
      >
        <AddIcon />
      </Button>
    </form>
  );
}
