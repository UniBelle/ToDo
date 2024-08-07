import React from "react";
import TodoItem, { todo } from "../TodoItem/TodoItem";

const TodoList: React.FC<{ todo: todo[]; removeTodo: (id: number) => void; updateTodo: (id: number) => string; editTodo: (id: number, title: string) => string; }> = ({ todo, removeTodo, updateTodo, editTodo }) => (
    <>
        {todo.map((t: todo) => (
            <TodoItem
                key={t.id}
                todo={t}
                removeTodo={removeTodo}
                updateTodo={updateTodo}
                editTodo={editTodo}
            />
        ))}
    </>
);

export default TodoList;
