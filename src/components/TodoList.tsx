import React from 'react'
import { Todo } from '../types'

interface TodoListProps {
    todos: Todo[]
    onToggle: (id: number) => Promise<void>
    onDelete: (id: number) => Promise<void>
    onUpdateText?: (id: number, newText: string) => Promise<void>
}

export const TodoList: React.FC<TodoListProps> = ({
    todos,
    onToggle,
    onDelete,
    onUpdateText: _onUpdateText
}) => {
    return (
        <div className="todo-list">
            {todos.map(todo => (
                <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                    <div className="todo-content">
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => onToggle(todo.id)}
                            className="todo-checkbox"
                        />
                        <span className="todo-text">{todo.text}</span>
                        {todo.tags.length > 0 && (
                            <div className="todo-tags">
                                {todo.tags.map(tag => (
                                    <span key={tag} className="tag">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="todo-actions">
                        <button onClick={() => onDelete(todo.id)} className="delete-button">
                            삭제
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}
