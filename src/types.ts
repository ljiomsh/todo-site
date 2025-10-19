// Type definitions
export interface Todo {
    id: number
    user_id?: string
    text: string
    tags: string[]
    completed: boolean
    date: string
    created_at: string
}

// Supabase Database Types
export interface Database {
    public: {
        Tables: {
            todos: {
                Row: {
                    id: number
                    user_id?: string
                    text: string
                    tags: string[]
                    completed: boolean
                    date: string
                    created_at: string
                }
                Insert: {
                    id?: number
                    user_id?: string
                    text: string
                    tags?: string[]
                    completed?: boolean
                    date: string
                    created_at?: string
                }
                Update: {
                    id?: number
                    user_id?: string
                    text?: string
                    tags?: string[]
                    completed?: boolean
                    date?: string
                    created_at?: string
                }
            }
        }
    }
}

export interface UnsplashResponse {
    urls: {
        regular: string
    }
}

export type FilterType = 'all' | 'active' | 'completed'

// Component prop interfaces
export interface HeaderProps {
    currentDate: Date
    onPrevMonth: () => void
    onNextMonth: () => void
    totalTodos: number
}

export type TodoInput = Omit<Todo, 'id' | 'user_id' | 'created_at'>
export type TodoUpdate = Partial<Omit<Todo, 'id' | 'user_id' | 'created_at'>>

export interface TodoInputProps {
    selectedDate: Date
    onAdd: (todo: TodoInput) => Promise<void>
    onClose: () => void
}

export interface TagFilterProps {
    tags: string[]
    selectedTag: string | null
    onSelectTag: (tag: string | null) => void
    filter: FilterType
    onFilterChange: (filter: FilterType) => void
}

export interface DateCellProps {
    date: Date
    todos: Todo[]
    onDateClick: (date: Date) => void
    onToggle: (id: number) => void
    onDelete: (id: number) => void
    onEdit: (id: number, newText: string) => void
}

export interface CalendarProps {
    currentDate: Date
    todos: Todo[]
    onDateClick: (date: Date) => void
    onToggle: (id: number) => void
    onDelete: (id: number) => void
    onEdit: (id: number, newText: string) => void
}
