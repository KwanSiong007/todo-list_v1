import React, { createContext, useEffect, useState } from "react";
import { TodoForm } from "../components/TodoForm";
import { TodoList } from "../components/TodoList";
import { EditTodoItem } from "../components/EditTodoItem";
import { Switch } from "@mui/material";

export const ThemeContext = createContext(null);

export default function NewList() {
  //newName is used to track the input value of the new list name.
  const [newName, setNewName] = useState("");
  //storedName will hold the value retrieved from local storage.
  //setStoredName is a function that will be used to update the value of storedName.
  const [storedName, setStoredName] = useState(() => {
    //This line initializes the state storedName with an initial value obtained from local storage. The value is retrieved using localStorage.getItem("THIRD-ITEM").
    const localValue = localStorage.getItem("THIRD-ITEM");
    //The || operator checks if localValue is truthy. In JavaScript, non-empty strings are truthy values, and null is falsy.
    //If localValue is truthy (meaning it has a value), then localValue itself is returned.
    //If localValue is falsy (null or not found), then the empty string "" is returned as a default value.
    return localValue || "";
  });

  //useEffect interacting with the browser's localStorage.
  //localStorage.setItem("THIRD-ITEM", storedName);: This line uses the localStorage API to set a key-value pair in the browser's local storage.
  //It stores the value of the storedName state variable with the key "THIRD-ITEM".
  //}, [storedName]);: This line defines the dependency array for the effect. The effect will run whenever any value in this array changes.
  //In this case, the effect will run only whenever the storedName state variable changes (which is a string representing the user-entered name.). If storedName changes, it means that the user has input a new name in the input field, and the effect will update the value in the local storage to match the new name.
  useEffect(() => {
    localStorage.setItem("THIRD-ITEM", storedName);
  }, [storedName]);

  function handleSubmitName(e) {
    e.preventDefault();
    if (newName === "") return;
    setStoredName(newName);
    setNewName("");
  }

  const [todos, setTodos] = useState(() => {
    //localStorage.getItem to retrieve the value stored in the localStorage with the key "ITEMS". The value retrieved from the localStorage will be a string.
    const localValue = localStorage.getItem("FOURTH-ITEM");
    //This line checks if the localValue (the value retrieved from localStorage) is null or not present.
    //If the value is null (meaning there are no items stored in localStorage with the key "ITEMS"), the function returns an empty array [] as the initial state for todos.
    if (localValue == null) return [];
    //This line uses JSON.parse to convert the localValue (which is a string) into a JavaScript object or array.
    //If there are items stored in localStorage, this line returns the parsed JavaScript object or array, which will be used as the initial state for todos.
    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("FOURTH-ITEM", JSON.stringify(todos));
  }, [todos]);

  function addTodo(title) {
    //The setTodos function is called to update the state of todos with a new array.
    //(currentTodos) => { ... }: This is the callback function that receives the current state of `todos` as currentTodos.
    setTodos((currentTodos) => {
      //Inside the callback function, a new array is returned. It uses the spread operator ... to create a shallow copy of the current todos array.
      //Then, a new todo object is added to the copy with properties id, title, and completed: false.
      //The id is generated using the crypto.randomUUID() function, which generates a random unique ID for the new todo.
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false, isEditing: false },
      ];
    });
  }

  //The toggleTodo function is defined with two parameters, id and completed. It is used to toggle the completion status of a todo item in the todos state.
  function toggleTodo(id, completed) {
    //Inside setTodos, we use the functional update pattern to access the current value of todos (named currentTodos) before making changes. This ensures that we work with the latest state value and avoid any potential issues with stale data.
    setTodos((currentTodos) => {
      //currentTodos.map(...) is a method that is used to loop through each item in the currentTodos array and create a new array based on the modifications we make in the following code.
      //(todo) => { ... } is an arrow function that takes each individual todo item as an argument for the loop. We perform certain actions on each todo item inside this function.
      return currentTodos.map((todo) => {
        //if (todo.id === id) { ... } checks if the id of the current todo item matches the id that is passed as an argument to the toggleTodo function.
        //{ ...todo, completed } creates a new object that copies all the properties of the todo object using the spread operator (...todo). This is to ensure we don't mutate the original todo object.
        //We then update the completed property of the new object with the value of the completed argument. This effectively toggles the completion status of the todo item.
        if (todo.id === id) {
          return { ...todo, completed };
        }
        //If the id doesn't match (i.e., it's not the todo item we want to toggle), we execute the code within the else block:
        //return todo; simply returns the original todo object unchanged.
        return todo;
        //In conclusion, return currentTodos.map(...) returns the new array with the updated completed property for the specified todo item and all other todo items unchanged.
        //This new array becomes the updated `todos` state, and React will re-render the component with the new state to reflect the changes.
      });
    });
  }

  function deleteTodo(id) {
    //This is a functional update to the todos state using the setTodos function from the useState hook. By using the functional update form, we ensure that we are working with the most current state (currentTodos), even if multiple deleteTodo functions are called simultaneously.
    setTodos((currentTodos) => {
      //currentTodos.filter((todo) => todo.id !== id): The filter method is used to create a new array by looping through all the todo items in the currentTodos array.
      //(todo) => todo.id !== id: This is an arrow function that acts as a filter for each todo item in the array. It checks if the id of each todo item is not equal to the id passed as an argument to the deleteTodo function.
      //If the id of a todo item doesn't match the id passed to the deleteTodo function, the filter function returns true for that item, meaning it will be kept in the new array.
      //If the id of a todo item does match the id passed to the deleteTodo function, the filter function returns false for that item, meaning it will be excluded from the new array.
      //The filter method collects all the todo items that passed the filter condition (i.e., all except the one with the matching id) and creates a new array with these items.
      //Finally, the new array becomes the updated `todos` state, and React will re-render the component with the new state, effectively removing the todo item with the specified id from the list.
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  function editTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      );
    });
  }

  function updateTodo(title, id) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) =>
        todo.id === id ? { ...todo, title, isEditing: !todo.isEditing } : todo
      );
    });
  }

  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme-new-list");
    return storedTheme !== null ? storedTheme : "light";
  });

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme-new-list", newTheme);
  };

  return (
    <>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <div id={theme}>
          <div className="new-list-header">
            <form onSubmit={handleSubmitName}>
              <label>New List Name:</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <button>Update</button>
            </form>
            <h1>New List: {storedName}</h1>
          </div>
          <TodoForm addTodo={addTodo} />
          <div className="switch">
            <label> {theme === "light" ? "Light Mode" : "Dark Mode"}</label>
            <Switch onChange={toggleTheme} checked={theme === "dark"} />
          </div>
          <h1 className="header">Todo List</h1>
          <TodoList
            todos={todos}
            toggleTodo={toggleTodo}
            editTodo={editTodo}
            deleteTodo={deleteTodo}
          />
          {todos.map(
            (todo) =>
              todo.isEditing && (
                <EditTodoItem updateTodo={updateTodo} todo={todo} />
              )
          )}
        </div>
      </ThemeContext.Provider>
    </>
  );
}
