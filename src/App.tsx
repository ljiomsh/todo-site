import React, { useState, useEffect } from 'react'
import './App.css'
import { Todo, FilterType } from './types'
import { BackgroundImage, Header, TodoInput, TagFilter, Calendar } from './components'
import { getTodos, createTodo, updateTodo, deleteTodo, toggleTodo } from './api/todos'

// App 컴포넌트: 메인 애플리케이션
const App: React.FC = () => {
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
      try {
        setLoading(true)
        setError(null)
        const todosData = await getTodos()
        setTodos(todosData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load todos')
        console.error('Error loading todos:', err)
      } finally {
        setLoading(false)
      }
    }

    loadTodos()
  }, [])

  // 모든 태그 목록 가져오기
  const getAllTags = (): string[] => {
    const tagsSet = new Set<string>()
    todos.forEach(todo => {
      todo.tags.forEach(tag => tagsSet.add(tag))
    })
    return Array.from(tagsSet)
  }

  // 필터링된 할 일 목록 가져오기
  const getFilteredTodos = (): Todo[] => {
    return todos
      .filter(todo => {
        if (selectedTag) {
          return todo.tags.includes(selectedTag)
        }
        return true
      })
      .filter(todo => {
        if (filter === 'active') return !todo.completed
        if (filter === 'completed') return todo.completed
        return true
      })
  }

  // 월 이동 핸들러
  const handlePrevMonth = (): void => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1))
  }

  const handleNextMonth = (): void => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1))
  }

  // 할 일 관련 핸들러
  const handleAdd = async (newTodo: Omit<Todo, 'id' | 'createdAt'>): Promise<void> => {
    try {
      setError(null)
      const createdTodo = await createTodo(newTodo)
      setTodos(prev => [createdTodo, ...prev])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create todo')
      console.error('Error creating todo:', err)
    }
  }

  const handleToggle = async (id: number): Promise<void> => {
    try {
      setError(null)
      const updatedTodo = await toggleTodo(id)
      setTodos(prev => prev.map(todo =>
        todo.id === id ? updatedTodo : todo
      ))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle todo')
      console.error('Error toggling todo:', err)
    }
  }

  const handleDelete = async (id: number): Promise<void> => {
    try {
      setError(null)
      await deleteTodo(id)
      setTodos(prev => prev.filter(todo => todo.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete todo')
      console.error('Error deleting todo:', err)
    }
  }

  const handleEdit = async (id: number, newText: string): Promise<void> => {
    try {
      setError(null)
      const updatedTodo = await updateTodo(id, { text: newText })
      setTodos(prev => prev.map(todo =>
        todo.id === id ? updatedTodo : todo
      ))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to edit todo')
      console.error('Error editing todo:', err)
    }
  }

  const handleDateClick = (date: Date): void => {
    setSelectedDateForInput(date)
  }

  if (loading) {
    return (
      <div className="min-h-screen app-container bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center">
        <div className="text-white text-xl">Loading todos...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen app-container bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20">
      <BackgroundImage />
      <div className="max-w-7xl mx-auto relative z-10">
        {error && (
          <div className="bg-red-500 text-white p-4 m-4 rounded-lg">
            Error: {error}
          </div>
        )}
        <Header
          currentDate={currentDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          totalTodos={todos.length}
        />
        <TagFilter
          tags={getAllTags()}
          selectedTag={selectedTag}
          onSelectTag={setSelectedTag}
          filter={filter}
          onFilterChange={setFilter}
        />
        <Calendar
          currentDate={currentDate}
          todos={getFilteredTodos()}
          onDateClick={handleDateClick}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
        {selectedDateForInput && (
          <TodoInput
            selectedDate={selectedDateForInput}
            onAdd={handleAdd}
            onClose={() => setSelectedDateForInput(null)}
          />
        )}
      </div>
    </div>
  )
}

export default App