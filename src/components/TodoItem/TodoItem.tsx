import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
const styles = require('../TodoItem/TodoItem.module.css');


export interface todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
};
export interface TodoItemProps {
    todo: todo;
    removeTodo: (id: number) => void;
    updateTodo: (id: number) => string;
    editTodo: (id: number, title: string) => string;
}



const TodoItem = ({ todo, removeTodo, updateTodo, editTodo }: TodoItemProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(todo.title);

    const handleSaveEdit = () => {
        editTodo(todo.id, editedText);
        setEditedText(todo.title);
        setIsEditing(false);
    };
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedText(e.target.value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSaveEdit();
        }
    };

    return (
        <div className={styles.itemContainer}>
            <div>
                <input
                    type='checkbox'
                    name={`checkbox-${todo.id}`}
                    checked={todo.completed}
                    data-testid={`checkbox-${todo.id}`}
                    onChange={() => updateTodo(todo.id)}
                />
                {isEditing ? (
                    <input
                        type="text"
                        value={editedText}
                        onChange={handleTextChange}
                        onBlur={handleSaveEdit}
                        onKeyPress={handleKeyPress}
                        aria-label="Edit todo"
                    />
                ) : (
                    <label
                        htmlFor={`checkbox-${todo.id}`}
                        onClick={() => updateTodo(todo.id)}
                        className={todo.completed ? styles.completed : ''}
                    >
                        {todo.title}
                    </label>
                )}
            </div>
            <button
                className={styles.closeBtn}
                data-testid={`close-btn-${todo.id}`}
                onClick={() => removeTodo(todo.id)}
            >
                X
            </button>
            {!isEditing && (
                <button
                    className={styles.editBtn}
                    data-testid={`edit-btn-${todo.id}`}
                    onClick={() => setIsEditing(true)}
                >
                    <FontAwesomeIcon icon={faPencilAlt} />
                </button>
            )}
        </div>
    );
};


export default TodoItem;
