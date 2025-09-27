import React, { useState } from 'react'
import { TodoInputProps } from '../types'
import { dateUtils } from '../utils'

const TodoInput: React.FC<TodoInputProps> = ({ selectedDate, onAdd, onClose }) => {
    const [text, setText] = useState<string>('')
    const [tag, setTag] = useState<string>('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        if (!text.trim()) return

        const tags: string[] = tag.split(',')
            .map(t => t.trim())
            .filter(t => t.startsWith('#') && t.length > 1)

        onAdd({
            text,
            tags: tags.length > 0 ? tags : [],
            completed: false,
            date: dateUtils.formatDate(selectedDate),
            created_at: new Date().toISOString()
        })

        setText('')
        setTag('')
        onClose()
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="modal-header">
                    {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일의 할 일
                </h2>
                <form onSubmit={handleSubmit} className="modal-form">
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="할 일을 입력하세요"
                    />
                    <input
                        type="text"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        placeholder="#태그1, #태그2 형식으로 입력"
                    />
                    <div className="modal-actions">
                        <button type="submit" className="modal-button primary">
                            추가
                        </button>
                        <button type="button" onClick={onClose} className="modal-button secondary">
                            취소
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TodoInput 