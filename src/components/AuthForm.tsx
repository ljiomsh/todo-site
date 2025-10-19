import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Link } from 'react-router-dom'

interface AuthFormProps {
    type: 'login' | 'register'
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            if (type === 'register') {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                }) as any
                if (error) throw error
                alert('가입 확인 이메일을 확인해주세요!')
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                }) as any
                if (error) throw error
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : '오류가 발생했습니다')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2 className="auth-title">
                    {type === 'login' ? '로그인' : '회원가입'}
                </h2>
                {error && <div className="auth-error">{error}</div>}
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="email">이메일</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">비밀번호</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading
                            ? '처리중...'
                            : type === 'login'
                                ? '로그인'
                                : '회원가입'}
                    </button>
                </form>
                <div className="auth-footer">
                    {type === 'login' ? (
                        <p>
                            아직 계정이 없나요?{' '}
                            <Link to="/register" className="auth-toggle-link">회원가입</Link>
                        </p>
                    ) : (
                        <p>
                            이미 계정이 있나요?{' '}
                            <Link to="/login" className="auth-toggle-link">로그인</Link>
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AuthForm
