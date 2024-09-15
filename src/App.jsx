import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
  //
  const [todos, setTodos] = useState([]);

  const [todoValue, setTodoValue] = useState("");

  function persistData(newList) {
    localStorage.setItem("todos", JSON.stringify({ todos: newList }));
  }

  function handleAddTodos(newTodo) {
    // This  is where we add the new todo to the state
    const newTodoList = [...todos, newTodo];
    persistData(newTodoList); //  Save the new list to local storage
    setTodos(newTodoList); //  Update the state with the new list
  }

  function handleDeleteTodo(index) {
    // this  is the index of the todo item to be deleted
    const newTodoList = todos.filter((todo, todoIndex) => {
      return todoIndex !== index;
    });
    persistData(newTodoList); //  Save the new list to local storage
    setTodos(newTodoList); //  Update the state with the new list
  }

  function handleEditTodo(index) {
    const valueToEdit = todos[index];
    setTodoValue(valueToEdit);
    handleDeleteTodo(index);
  }

  useEffect(() => {
    if (!localStorage) {
      return;
    }

    let localTodos = localStorage.getItem("todos");
    if (!localTodos) {
      return;
    }
    localTodos = JSON.parse(localTodos).todos;
    setTodos(localTodos);
  }, []);
  return (
    <>
      <TodoInput
        todoValue={todoValue}
        setTodoValue={setTodoValue}
        handleAddTodos={handleAddTodos}
        handleEditTodo={handleEditTodo}
      />
      <TodoList
        handleDeleteTodo={handleDeleteTodo}
        todos={todos}
        handleEditTodo={handleEditTodo}
      />
    </>
  );
}

export default App;
