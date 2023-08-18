import React, { createContext, useEffect, useState } from "react";
import { TodoForm } from "../components/TodoForm";
import { TodoList } from "../components/TodoList";
import { EditTodoItem } from "../components/EditTodoItem";
import { Switch } from "@mui/material";

//This line creates a new context using React's createContext function. Think of a context as a way to share data that can be easily accessed by components that are nested within each other, without having to pass the data through props.
//Here, you're creating a context specifically for the theme of your app.
export const ThemeContext = createContext(null);

export default function Work() {
  //The useState function takes an initial state value as an argument. In this case, it uses an inline arrow function (() => { ... }) to set the initial state of todos based on the value retrieved from the localStorage.
  const [todos, setTodos] = useState(() => {
    //localStorage.getItem to retrieve the value stored in the localStorage with the key "ITEMS". The value retrieved from the localStorage will be a string.
    const localValue = localStorage.getItem("ITEMS");
    //This line checks if the localValue (the value retrieved from localStorage) is null or not present.
    //If the value is null (meaning there are no items stored in localStorage with the key "ITEMS"), the function returns an empty array [] as the initial state for todos.
    if (localValue == null) return [];
    //This line uses JSON.parse to convert the localValue (which is a string) into a JavaScript object or array.
    //If there are items stored in localStorage, this line returns the parsed JavaScript object or array, which will be used as the initial state for todos.
    return JSON.parse(localValue);
  });

  //When the component renders, the useEffect will be triggered, as it runs after every render.
  //localStorage.setItem to save the todos array as a string in the localStorage with the key "ITEMS"  after converting it to a JSON string using JSON.stringify..
  //The reason for adding [todos] as the dependency array is to ensure that the useEffect runs whenever the todos array changes. Without this dependency array, the useEffect would run on every render, even when the todos array has not changed.
  //By providing [todos] as the dependency, the effect will only run when the todos array is updated, and it will synchronize the localStorage with the latest todos data.
  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  //value of `newItem` in TodoForm component passed as an argument to the addTodo function, and it becomes the value of the `title` parameter.
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

  //This is a function named deleteTodo that takes an id as an argument. The id represents the unique identifier of the todo item we want to delete.
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

  //For each todo, it checks if the id of the current todo matches the given id using todo.id === id. If the id matches, it creates a new object using {...todo} to copy all the properties of the current todo into the new object.
  //Then, it updates the isEditing property of the new object to the opposite of its current value using !todo.isEditing. If isEditing was false, it will become true.
  //If the id does not match, it simply returns the original todo object without any changes.
  function editTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      );
    });
  }

  //The function "updateTodo" takes two parameters: title & id passed from component: EditTodoItem, which targeted updated todo object.
  //There is a ternary expression inside the map function. It checks if the id of the current todo matches the given id.
  //If the id matches, { ...todo, title, isEditing: !todo.isEditing } creates a new object with all the properties of the current `todo`, but with a few changes:
  //The `title` property is updated with the new value passed into the title parameter.
  //The `isEditing` property is toggled from its current value (true becomes false).
  //This modified object is used in place of the original todo object in the new array.
  //If the id does not match, The original todo object remains unchanged in the new array.
  function updateTodo(title, id) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) =>
        todo.id === id ? { ...todo, title, isEditing: !todo.isEditing } : todo
      );
    });
  }

  // const [theme, setTheme] = useState("light");

  // const toggleTheme = () => {
  //   setTheme((curr) => (curr === "light" ? "dark" : "light"));
  // };

  //theme is where we'll store the current theme (light or dark), and setTheme is a function we use to change that theme.
  const [theme, setTheme] = useState(() => {
    //we  get a value that was stored under the key "theme-work" in localStorage.
    const storedTheme = localStorage.getItem("theme-work");
    //It's saying: if storedTheme is not null, return the value of storedTheme. If it is null, return "light".
    //This sets the initial value of the theme state variable to the value we stored in localStorage, or "light" if nothing is stored.
    return storedTheme !== null ? storedTheme : "light";
  });

  const toggleTheme = () => {
    //This line creates a new variable called newTheme. It uses a ternary operator to check if the current theme is "light". If it is, it sets newTheme to "dark".
    //If the current theme is not "light", it sets newTheme to "light".
    const newTheme = theme === "light" ? "dark" : "light";
    //This line calls the setTheme function that you got from the useState hook. It updates the theme state variable with the new theme, either "light" or "dark," depending on what newTheme is set to.
    setTheme(newTheme);
    //This line uses localStorage to store the new theme setting.
    //It sets a key-value pair in localStorage with the key "theme-work" and the value of newTheme.
    localStorage.setItem("theme-work", newTheme);
  };

  //return (: This marks the start of the JSX block that the App component will render.
  return (
    <>
      {/* This line uses the ThemeContext.Provider component to wrap around a
      portion of your JSX code. It provides the data you want to share to the
      components within this section. In this case, you're providing two values
      to the components within: theme and toggleTheme. */}
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {/* This is a regular HTML div element. The id attribute is set to the value
        of the theme variable. This means that the id of this div will be either
        "light" or "dark" depending on the current theme. */}
        <div id={theme}>
          {/* This line renders the NewTodoForm component, which is a form to add new
      todo items. The addTodo prop is passed to NewTodoForm, which is a
      function to add a new todo item when the form is submitted. */}
          <TodoForm addTodo={addTodo} />
          <div className="switch">
            <label> {theme === "light" ? "Light Mode" : "Dark Mode"}</label>
            <Switch onChange={toggleTheme} checked={theme === "dark"} />
          </div>
          <div className="header">
            <h1>Work</h1>
            <h1>Todo List</h1>
          </div>
          {/* <TodoList/>: This line renders the TodoList component, which displays the list of todo
      items. The `todos` prop is passed to TodoList, which contains an array of all the
      todo items.*/}
          <TodoList
            todos={todos}
            toggleTodo={toggleTodo}
            editTodo={editTodo}
            deleteTodo={deleteTodo}
          />
          {/* It's using the map function to loop through each todo object in the todos array. */}
          {/* (todo) =>: This is an arrow function that defines what should happen for
      each todo item in the array. */}
          {/* todo.isEditing &&: This is a conditional check using the logical AND (&&)
      operator. It checks if todo.isEditing is true. */}
          {/* <EditTodoItem updateTodo={updateTodo} todo={todo} />: If the condition is
      true, this JSX element will be rendered. It's rendering the EditTodoItem
      component and passing two props: updateTodo and todo. */}
          {todos.map(
            (todo) =>
              todo.isEditing && (
                <EditTodoItem updateTodo={updateTodo} todo={todo} />
              )
          )}
        </div>
      </ThemeContext.Provider>
      {/* </>: This marks the end of the JSX block that the App component will render. */}
    </>
  );
}
