import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import AuthForm from './components/AuthForm'
import TodoApp from './components/TodoApp'

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="loading-screen">로딩중...</div>
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  return <>{children}</>
}

const App: React.FC = () => {
  const { user } = useAuth()

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <AuthForm type="login" />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <AuthForm type="register" />}
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <TodoApp />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App