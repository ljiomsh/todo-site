import React, { useState, useEffect } from 'react'
import BackgroundImage from './BackgroundImage'
import Header from './Header'
import TodoInputComponent from './TodoInput'
import { TodoList } from './TodoList'
import TagFilter from './TagFilter'
import Calendar from './Calendar'
import type { Todo, FilterType, TodoInput as TodoInputType } from '../types'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

const TodoApp: React.FC = () => {
    const { user } = useAuth()
    const [currentDate, setCurrentDate] = useState<Date>(new Date())
    const [todos, setTodos] = useState<Todo[]>([])
    const [selectedTag, setSelectedTag] = useState<string | null>(null)
    const [filter, setFilter] = useState<FilterType>('all')
    const [selectedDateForInput, setSelectedDateForInput] = useState<Date | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    // Supabase에서 데이터 로드
    useEffect(() => {
        const loadTodos = async () => {
            if (!user) return

            try {
                setLoading(true)
                const { data, error } = await supabase
                    .from('todos')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('date', { ascending: true })

                if (error) throw error
                setTodos(data || [])
            } catch (err) {
                setError(err instanceof Error ? err.message : '할 일을 불러오는데 실패했습니다')
                console.error('Error loading todos:', err)
            } finally {
                setLoading(false)
            }
        }

        loadTodos()
    }, [user])

    // 모든 태그 목록 가져오기
    const getAllTags = () => {
        const tagsSet = new Set<string>()
        todos.forEach(todo => {
            todo.tags?.forEach(tag => tagsSet.add(tag))
        })
        return Array.from(tagsSet)
    }

    // 필터링된 할 일 목록 가져오기
    const getFilteredTodos = () => {
        let filtered = todos
        if (selectedTag) {
            filtered = filtered.filter(todo => todo.tags?.includes(selectedTag))
        }
        if (filter === 'active') {
            filtered = filtered.filter(todo => !todo.completed)
        } else if (filter === 'completed') {
            filtered = filtered.filter(todo => todo.completed)
        }
        return filtered
    }

    // 월 이동 핸들러
    const handlePrevMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1))
    }

    const handleNextMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1))
    }

    // 할 일 관련 핸들러
    const handleAdd = async (newTodo: Omit<TodoInputType, 'user_id'>) => {
        if (!user) return

        try {
            const { data: todo, error } = await supabase
                .from('todos')
                .insert([{ ...newTodo, user_id: user.id }])
                .select()
                .single()

            if (error) throw error
            if (todo) {
                setTodos(prev => [...prev, todo])
                setSelectedDateForInput(null)
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : '할 일을 추가하는데 실패했습니다')
            console.error('Error adding todo:', err)
        }
    }

    const handleToggle = async (id: number) => {
        try {
            const todoToUpdate = todos.find(t => t.id === id)
            if (!todoToUpdate) return

            const { data: updatedTodo, error } = await supabase
                .from('todos')
                .update({ completed: !todoToUpdate.completed })
                .eq('id', id)
                .select()
                .single()

            if (error) throw error
            if (updatedTodo) {
                setTodos(prev =>
                    prev.map(todo => todo.id === id ? updatedTodo : todo)
                )
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : '할 일 상태를 변경하는데 실패했습니다')
            console.error('Error toggling todo:', err)
        }
    }

    const handleDelete = async (id: number) => {
        try {
            const { error } = await supabase
                .from('todos')
                .delete()
                .eq('id', id)

            if (error) throw error
            setTodos(prev => prev.filter(todo => todo.id !== id))
        } catch (err) {
            setError(err instanceof Error ? err.message : '할 일을 삭제하는데 실패했습니다')
            console.error('Error deleting todo:', err)
        }
    }

    const handleUpdateText = async (id: number, newText: string) => {
        try {
            const { data: updatedTodo, error } = await supabase
                .from('todos')
                .update({ text: newText })
                .eq('id', id)
                .select()
                .single()

            if (error) throw error
            if (updatedTodo) {
                setTodos(prev =>
                    prev.map(todo =>
                        todo.id === id ? updatedTodo : todo
                    )
                )
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : '할 일을 수정하는데 실패했습니다')
            console.error('Error updating todo:', err)
        }
    }

    if (!user) {
        return (
            <div className="app">
                <BackgroundImage />
                <Header
                    currentDate={currentDate}
                    onPrevMonth={handlePrevMonth}
                    onNextMonth={handleNextMonth}
                    totalTodos={todos.length}
                />
                <div className="login-message">
                    로그인이 필요합니다.
                </div>
            </div>
        )
    }

    return (
        <div className="app">
            <BackgroundImage />
            <Header
                currentDate={currentDate}
                onPrevMonth={handlePrevMonth}
                onNextMonth={handleNextMonth}
                totalTodos={todos.length}
            />
            <div className="calendar-toolbar">
                <div className="calendar-toolbar-left">
                    <button className="nav-button mobile-nav" onClick={handlePrevMonth}>이전달</button>
                    <h2 className="month-title">
                        {currentDate.getFullYear()}년 {currentDate.toLocaleString('default', { month: 'long' })}
                    </h2>
                    <button className="nav-button mobile-nav" onClick={handleNextMonth}>다음달</button>
                </div>
                <div className="calendar-toolbar-right">
                    <div className="todo-count">총 {todos.length}개의 할 일이 있습니다.</div>
                </div>
            </div>

            <div className="calendar-wrap">
                <button className="calendar-side-nav calendar-side-nav--left" onClick={handlePrevMonth} aria-label="이전달">◀</button>
                <Calendar
                    currentDate={currentDate}
                    todos={todos}
                    onDateClick={(d: Date) => setSelectedDateForInput(d)}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                    onEdit={handleUpdateText}
                />
                <button className="calendar-side-nav calendar-side-nav--right" onClick={handleNextMonth} aria-label="다음달">▶</button>
            </div>
            <TagFilter
                tags={getAllTags()}
                selectedTag={selectedTag}
                onSelectTag={setSelectedTag}
                filter={filter}
                onFilterChange={(f: FilterType) => setFilter(f)}
            />
            {loading ? (
                <div className="loading">로딩 중...</div>
            ) : error ? (
                <div className="error">{error}</div>
            ) : (
                <>
                    {selectedDateForInput && (
                        <TodoInputComponent
                            selectedDate={selectedDateForInput}
                            onAdd={handleAdd}
                            onClose={() => setSelectedDateForInput(null)}
                        />
                    )}
                    <TodoList
                        todos={getFilteredTodos()}
                        onToggle={handleToggle}
                        onDelete={handleDelete}
                        onUpdateText={handleUpdateText}
                    />
                </>
            )}
        </div>
    )
}

export default TodoApp
