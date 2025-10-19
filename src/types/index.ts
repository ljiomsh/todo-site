export interface Todo {
    id: number
    user_id: string
    text: string
    date: string
    completed: boolean
    tags: string[]
    created_at?: string
}

export type FilterType = 'all' | 'active' | 'completed'

export type TodoWithoutId = Omit<Todo, 'id'>
export type TodoInput = Omit<Todo, 'id' | 'user_id' | 'created_at'>
export type TodoUpdate = Partial<Omit<Todo, 'id' | 'user_id' | 'created_at'>>

export interface Database {
    public: {
        Tables: {
            todos: {
                Row: Todo
                Insert: TodoInput
                Update: TodoUpdate
            }
        }
        Enums: {}
        Functions: {}
        Views: {}
    }
}
