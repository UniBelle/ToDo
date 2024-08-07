import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import './App.css';
import { todo } from './components/TodoItem/TodoItem';
import TodoList from './components/TodoList/TodoList';

function App() {
  const [todos, setTodos] = useState<todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);

  const addTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = {
      userId: 3,
      id: Math.floor(Math.random() * 10000) + 1,
      title: newTodo,
      completed: false,
    };

    setSaving(true);
    fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify({
        title: newTodo,
        completed: false,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setSaving(false);
        setTodos((prevTodos) => [...prevTodos, { ...result, id: value.id }]);
        setNewTodo('');
      });
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const removetodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((t) => t.id !== id));
  };

  const updatetodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todoItem) =>
        todoItem.id === id ? { ...todoItem, completed: !todoItem.completed } : todoItem
      )
    );
    return 'Todo updated';
  };

  const edittodo = (id: number, newTitle: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todoItem) =>
        todoItem.id === id ? { ...todoItem, title: newTitle } : todoItem
      )
    );
    return 'Todo updated';
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await fetch('https://jsonplaceholder.typicode.com/todos').then(
        (response) => response.json()
      );
      setLoading(false);
      setTodos(result.slice(0, 5));
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1 className="header">My todo list</h1>
      {loading ? (
        'Loading'
      ) : (
        <TodoList todo={todos} removeTodo={removetodo} updateTodo={updatetodo} editTodo={edittodo} />
      )}

      <div className="add-todo-form">
        {saving ? (
          'Saving'
        ) : (
          <form onSubmit={addTodo}>
            <input type="text" onChange={onChange} value={newTodo} />
            <button type="submit">Add new todo</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default App;
