import { Routes, Route } from 'react-router-dom'
import Login from './assets/pages/Login'
import Home from './assets/pages/Home'
import ErrorPage from './assets/pages/Error'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    )
}

export default App
