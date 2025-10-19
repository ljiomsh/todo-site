import React from 'react'
import { HeaderProps } from '../types'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

const Header: React.FC<HeaderProps> = ({ currentDate, onPrevMonth, onNextMonth, totalTodos }) => {
    const months: string[] = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']

    const { user, signOut } = useAuth()

    return (
        <header className="header">
            <div className="header-left">
                <div className="header-title">
                    <button
                        onClick={onPrevMonth}
                        className="nav-button"
                    >
                        이전달
                    </button>
                    <h1 className="month-title">
                        {currentDate.getFullYear()}년 {months[currentDate.getMonth()]}
                    </h1>
                    <button
                        onClick={onNextMonth}
                        className="nav-button"
                    >
                        다음달
                    </button>
                </div>
                <p className="todo-count">총 {totalTodos}개의 할 일이 있습니다.</p>
            </div>

            <div className="header-right">
                {user ? (
                    <>
                        <span className="user-email">{user.email}</span>
                        <button className="signout-button" onClick={signOut}>로그아웃</button>
                    </>
                ) : (
                    <Link to="/auth/login" className="login-link">로그인</Link>
                )}
            </div>
        </header>
    )
}

export default Header 