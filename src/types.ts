// Type definitions
export interface Todo {
    id: number
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
                    text: string
                    tags: string[]
                    completed: boolean
                    date: string
                    created_at: string 
                }
                Insert: {
                    id?: number
                    text: string
                    tags?: string[]
                    completed?: boolean
                    date: string
                    created_at?: string
                }
                Update: {
                    id?: number
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

export interface TodoInputProps {
    selectedDate: Date
    onAdd: (todo: Omit<Todo, 'id' | 'createdAt'>) => void
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
