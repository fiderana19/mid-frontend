import { Route, Routes } from "react-router-dom"
import Signup from "./pages/Signup"
import UserHome from "./pages/User/UserHome"
import AdminHome from "./pages/Admin/AdminHome"
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
import RoleBasedRoute from "./routes/RoleBasedRoute"
import LoginPage from "./pages/LoginPage"
import Unauthoriezd from "./pages/Unauthorized"
import AdminAccountView from "./pages/Admin/Account/AdminAccountView"
import UserAddDemande from "./pages/User/Demande/AddDemande"
import AdminRequestView from "./pages/Admin/Request/AdminRequestView"
import InitializePasswordUser from "./pages/User/InitializePasswordUser"
import InitializePasswordAdmin from "./pages/Admin/InitializePasswordAdmin"
import AdminOrganizeAudience from "./pages/Admin/Audience/AdminOrganizeAudience"
import AdminAudienceView from "./pages/Admin/Audience/AdminAudienceView"

function App() {
  return (
      <Routes>
        {/* Public routes */}
        <Route index path="/" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/unauthorized" element={<Unauthoriezd />} />
        <Route path="*" element={<NotFound />} />
        {/* User routes */}
        <Route path="/user" element={<RoleBasedRoute allowedRoles={["user"]} />}>
          <Route path="home" element={<UserHome />} />
          <Route path="demande" element={<UserDemande />} />
          <Route path="audience" element={<UserAudience />} />
          <Route path="info" element={<UserInfo />} />
          <Route path="add/demande" element={<UserAddDemande />} />
          <Route path="password" element={<InitializePasswordUser />} />
        </Route>
        {/* Admin routes */}
        <Route path="/admin" element={<RoleBasedRoute allowedRoles={["admin"]} />}>
            <Route path="home" element={<AdminHome />} />
            <Route path="demande/view/:id" element={<AdminRequestView />} />
            <Route path="demande" element={<AdminDemande />} />
            <Route path="audience/view/:id" element={<AdminAudienceView />} />
            <Route path="audience" element={<AdminAudience />} />
            <Route path="organize/audience/:id" element={<AdminOrganizeAudience />} />
            <Route path="availability" element={<AdminAvailability />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="account/view/:id" element={<AdminAccountView />} />
            <Route path="account" element={<AdminAccount />} />
            <Route path="info" element={<AdminInfo />} />
            <Route path="password" element={<InitializePasswordAdmin />} />
          </Route>
      </Routes>
  )
}

export default App