//app.tsx
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Register from './pages/Register'
import Login from './pages/Login'
import Welcome from './pages/Welcome'
import BookDetail from './pages/BookDetail'
import Books from './pages/Books'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />}></Route>
        <Route path="/books" element={<Books />}></Route>
        <Route path="/books/:id" element={<BookDetail />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
