import React from 'react'
import { DateCellProps } from '../types'
import { dateUtils } from '../utils'

const DateCell: React.FC<DateCellProps> = ({ date, todos, onDateClick, onToggle, onDelete }) => {
    const isToday: boolean = dateUtils.isToday(date)

    return (
        <div
            onClick={() => onDateClick(date)}
            className={`date-cell ${isToday ? 'date-cell--today' : 'date-cell--normal'}`}
        >
            <div className="date-cell__header">
                <div className={`date-cell__day-number ${isToday ? 'date-cell__day-number--today' : ''}`}>
                    {date.getDate()}
                </div>
                <button
                    className="date-cell__add-button"
                    onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        onDateClick(date);
                    }}
                >
                    +
                </button>
            </div>
            <div className="date-cell__todos">
                {todos.map(todo => (
                    <div
                        key={todo.id}
                        className="todo-item"
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                    >
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => onToggle(todo.id)}
                            className="todo-item__checkbox"
                        />
                        <div className="todo-item__content">
                            <span
                                className={`todo-item__text ${todo.completed ? 'todo-item__text--completed' : ''}`}
                                title={todo.text}
                            >
                                {todo.text}
                            </span>
                            {todo.tags.length > 0 && (
                                <div className="todo-item__tags">
                                    {todo.tags.map(tag => (
                                        <span key={tag} className="todo-item__tag">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                        <button
                            onClick={() => onDelete(todo.id)}
                            className="todo-item__delete-button"
                        >
                            ×
                        </button>
                    </div>
                ))}
                {todos.length === 0 && (
                    <div className="date-cell__empty-message">
                        할 일을 추가하려면 클릭하세요
                    </div>
                )}
            </div>
        </div>
    )
}

export default DateCell