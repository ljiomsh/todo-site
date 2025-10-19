import React from 'react'
import { HeaderProps } from '../types'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

const Header: React.FC<HeaderProps> = ({ currentDate: _currentDate, onPrevMonth: _onPrevMonth, onNextMonth: _onNextMonth, totalTodos: _totalTodos }) => {
    const months: string[] = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']

    const { user, signOut } = useAuth()

    return (
        <header className="header">
            <div className="header-left">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img src="/image.png" alt="logo" className="site-logo" />
                </div>
            </div>

            <div className="header-right">
                {user ? (
                    <div className="profile">
                        <div className="avatar" aria-hidden>
                            {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div className="profile-meta">
                            <div className="user-email">{user.email}</div>
                            <button className="signout-button" onClick={signOut}>로그아웃</button>
                        </div>
                    </div>
                ) : (
                    <Link to="/login" className="login-link">로그인</Link>
                )}
            </div>
            {/* 이전/다음 버튼은 달력 옆에 배치하도록 TodoApp에서 렌더합니다. */}
        </header>
    )
}

export default Header 