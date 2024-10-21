import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import UserHome from "./pages/User/UserHome"
import AdminHome from "./pages/Admin/AdminHome"
import AdminLayout from "./layouts/AdminLayout"
import UserLayout from "./layouts/UserLayout"
import UserDemande from "./pages/User/UserDemande"
import UserAudience from "./pages/User/UserAudience"
import UserInfo from "./pages/User/UserInfo"
import AdminDemande from "./pages/Admin/AdminDemande"
import AdminAudience from "./pages/Admin/AdminAudience"
import AdminAvailability from "./pages/Admin/AdminAvailability"
import AdminDashboard from "./pages/Admin/AdminDashboard"
import AdminInfo from "./pages/Admin/AdminInfo"
import NotFound from "./pages/NotFound"
import AdminAccount from "./pages/Admin/AdminAccount"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route index path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* User routes */}
        <Route path="/user" element={<UserLayout />}>
          <Route path="home" element={<UserHome />} />
          <Route path="demande" element={<UserDemande />} />
          <Route path="audience" element={<UserAudience />} />
          <Route path="info" element={<UserInfo />} />
        </Route>
        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="home" element={<AdminHome />} />
          <Route path="demande" element={<AdminDemande />} />
          <Route path="audience" element={<AdminAudience />} />
          <Route path="availability" element={<AdminAvailability />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="account" element={<AdminAccount />} />
          <Route path="info" element={<AdminInfo />} />
        </Route>
        {/* Not found route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App