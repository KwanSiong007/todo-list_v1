import React from "react";
import { TodoItem } from "./TodoItem";

//TodoList receives three props: todos, toggleTodo, and deleteTodo from App component.
export function TodoList({ todos, toggleTodo, editTodo, deleteTodo }) {
  // const completedTodo: This line declares a constant variable named completedTodo to store an array of completed todo.
  //todos.filter((todo) => todo.completed): The todos array is filtered using the .filter() method. For each todo object in the array, the provided callback function (todo) => todo.completed is called. This function checks if the `completed` property of the todo object is true. If it is, the todo is included in the completedTodo array.
  //So, completedTodo will contain only the todo that have their completed property set to true.
  const completedTodo = todos.filter((todo) => todo.completed);
  // const completedTodo: This line declares a constant variable named incompleteTodo to store an array of incomplete todo.
  //todos.filter((todo) => !todo.completed): The todos array is filtered using the .filter() method. For each todo object in the array, the provided callback function (todo) => !todo.completed is called. This function checks if the `completed` property of the todo object is false. If it is, the todo is included in the incompleteTodo array.
  //So, incompleteTodo will contain only the todo that have their completed property set to false.
  const incompleteTodo = todos.filter((todo) => !todo.completed);

  return (
    //This line creates an unordered list element with a CSS class name "list".
    <ul className="list">
      {/* This line is a conditional rendering. If the todos array is empty, it will
      render the text "No Todos" as a list item. It's a way to show a message
      when there are no todos in the list. */}
      {todos.length === 0 && "No Todos"}
      {/* This line starts a JavaScript map function that iterates over the todos
      array. */}

      {/* Render incomplete todo first, which will be on top */}
      {incompleteTodo.map((todo) => (
        // This line creates a TodoItem component for each todo object in the incompleteTodo array.
        //The spread operator ({...}) is used to pass all the properties of the todo object as individual props to the TodoItem component. So, each property of the todo object (which are completed, id, title) will be passed as a separate prop to TodoItem
        //key={todo.id}: This is a special prop called key that is used by React to efficiently update the list of components. It helps React keep track of each individual item in the list and improve performance.
        //toggleTodo={toggleTodo}: The toggleTodo prop is passed to the TodoItem component, which is a function to toggle the completion status of a todo item. This allows the TodoItem component to use the toggleTodo function to update the completion status of a todo item when the checkbox is clicked.
        //deleteTodo={deleteTodo}: The deleteTodo prop is passed to the TodoItem component, which is a function to delete a todo item. This allows the TodoItem component to use the deleteTodo function to remove a todo item when the "Delete" button is clicked.
        <TodoItem
          {...todo}
          key={todo.id}
          toggleTodo={toggleTodo}
          editTodo={editTodo}
          deleteTodo={deleteTodo}
        />
      ))}

      {/* Then render completed todo, which will be at bottom */}
      {completedTodo.map((todo) => (
        <TodoItem
          {...todo}
          key={todo.id}
          toggleTodo={toggleTodo}
          editTodo={editTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
}
