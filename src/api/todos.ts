import { supabase } from '../lib/supabase'
import type { Todo, TodoInput } from '../types'

// Todo 생성
export const createTodo = async (todo: TodoInput): Promise<Todo> => {
    const { data, error } = await supabase
        .from('todos')
        .insert({
            text: todo.text,
            tags: todo.tags,
            completed: todo.completed,
            date: todo.date,
            created_at: new Date().toISOString(),
            user_id: (todo as any).user_id ?? null
        })
        .select()
        .single()

    if (error) {
        throw new Error(`Failed to create todo: ${error.message}`)
    }

    return {
        id: data.id,
        user_id: data.user_id,
        text: data.text,
        tags: data.tags,
        completed: data.completed,
        date: data.date,
        created_at: data.created_at
    }
}

// Todo 읽기 (모든 Todo)
export const getTodos = async (): Promise<Todo[]> => {
    const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        throw new Error(`Failed to fetch todos: ${error.message}`)
    }

    return data.map((todo: Todo) => ({
        id: todo.id,
        user_id: (todo as any).user_id ?? null,
        text: todo.text,
        tags: todo.tags,
        completed: todo.completed,
        date: todo.date,
        created_at: todo.created_at
    }))
}

// 특정 날짜의 Todo 읽기
export const getTodosByDate = async (date: string): Promise<Todo[]> => {
    const { data, error } = await supabase
        .from('todos')
        .select('*')
        .eq('date', date)
        .order('created_at', { ascending: false })

    if (error) {
        throw new Error(`Failed to fetch todos by date: ${error.message}`)
    }

    return data.map((todo: Todo) => ({
        id: todo.id,
        user_id: (todo as any).user_id ?? null,
        text: todo.text,
        tags: todo.tags,
        completed: todo.completed,
        date: todo.date,
        created_at: todo.created_at
    }))
}

// Todo 수정
export const updateTodo = async (id: number, updates: Partial<Omit<Todo, 'id' | 'created_at'>>): Promise<Todo> => {
    const { data, error } = await supabase
        .from('todos')
        .update({
            text: updates.text,
            tags: updates.tags,
            completed: updates.completed,
            date: updates.date
        })
        .eq('id', id)
        .select()
        .single()

    if (error) {
        throw new Error(`Failed to update todo: ${error.message}`)
    }

    return {
        id: data.id,
        user_id: data.user_id,
        text: data.text,
        tags: data.tags,
        completed: data.completed,
        date: data.date,
        created_at: data.created_at
    }
}

// Todo 삭제
export const deleteTodo = async (id: number): Promise<void> => {
    const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id)

    if (error) {
        throw new Error(`Failed to delete todo: ${error.message}`)
    }
}

// Todo 완료 상태 토글
export const toggleTodo = async (id: number): Promise<Todo> => {
    // 먼저 현재 상태를 가져옴
    const { data: currentTodo, error: fetchError } = await supabase
        .from('todos')
        .select('completed')
        .eq('id', id)
        .single()

    if (fetchError) {
        throw new Error(`Failed to fetch todo: ${fetchError.message}`)
    }

    // 상태를 반전시켜 업데이트
    const { data, error } = await supabase
        .from('todos')
        .update({ completed: !currentTodo.completed })
        .eq('id', id)
        .select()
        .single()

    if (error) {
        throw new Error(`Failed to toggle todo: ${error.message}`)
    }

    return {
        id: data.id,
        text: data.text,
        tags: data.tags,
        completed: data.completed,
        date: data.date,
        created_at: data.created_at
    }
}
