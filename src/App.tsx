import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import UserHome from "./pages/User/UserHome"
import AdminHome from "./pages/Admin/AdminHome"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route index path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* User routes */}
        <Route path="/user" element={<UserHome />} />
        {/* Admin routes */}
        <Route path="/admin" element={<AdminHome />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App