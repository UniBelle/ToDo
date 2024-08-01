import React from "react";
import TodoItem from "../TodoItem/TodoItem";

const TodoList = ({ todos, removeHandler, updateTodo, editTodo }) => (
    <>
        {todos.map((t) => (
            <TodoItem
                key={t.id}
                todo={t}
                removeHandler={removeHandler}
                updateTodo={updateTodo}
                editTodo={editTodo}
            />
        ))}
    </>
);

export default TodoList;
