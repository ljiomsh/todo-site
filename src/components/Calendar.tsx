import React from 'react'
import { CalendarProps, Todo } from '../types'
import { dateUtils } from '../utils'
import DateCell from './DateCell'

const Calendar: React.FC<CalendarProps> = ({ currentDate, todos, onDateClick, onToggle, onDelete, onEdit }) => {
    const days: string[] = ['일', '월', '화', '수', '목', '금', '토']
    const monthDays: number = dateUtils.getMonthDays(currentDate.getFullYear(), currentDate.getMonth())
    const firstDayOfMonth: number = dateUtils.getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth())

    const getDayTodos = (date: Date): Todo[] => {
        const dateStr: string = dateUtils.formatDate(date)
        return todos.filter(todo => todo.date === dateStr)
    }

    return (
        <div className="calendar">
            <div className="calendar-grid">
                {days.map(day => (
                    <div key={day} className="weekday">
                        {day}
                    </div>
                ))}
                {[...Array(42)].map((_, index) => {
                    const dayNumber: number = index - firstDayOfMonth + 1
                    if (dayNumber <= 0 || dayNumber > monthDays) {
                        return <div key={index} className="aspect-square" />
                    }

                    const date: Date = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNumber)
                    const dayTodos: Todo[] = getDayTodos(date)

                    return (
                        <DateCell
                            key={index}
                            date={date}
                            todos={dayTodos}
                            onDateClick={onDateClick}
                            onToggle={onToggle}
                            onDelete={onDelete}
                            onEdit={onEdit}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Calendar 