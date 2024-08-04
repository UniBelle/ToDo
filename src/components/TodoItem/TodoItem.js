import React, { useState } from 'react';
import styles from './TodoItem.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const TodoItem = ({ todo, removeHandler, updateTodo, editTodo }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(todo.title);

    const handleSaveEdit = () => {
        editTodo(todo.id, editedText);
        setIsEditing(false);
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
                        onChange={(e) => setEditedText(e.target.value)}
                        onBlur={handleSaveEdit}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleSaveEdit();
                            }
                        }}
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
                onClick={() => removeHandler(todo.id)}
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
