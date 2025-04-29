import { Route, Routes } from "react-router-dom"
import Signup from './pages/Signup';
import UserHome from "./pages/User/UserHome"
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
import AdminAudienceReport from "./pages/Admin/Audience/AdminAudienceReport"
import UserChangePassword from "./pages/User/Password/UserChangePassword"
import UserEditDemande from "./pages/User/Demande/EditDemande"
import AdminAudienceQRCode from "./pages/Admin/Audience/AdminAudienceQRCode"
import AdminAudienceViewByQrCode from "./pages/Admin/Audience/AdminAudienceViewByQrCode"
import AdminFailRequest from "./pages/Admin/Request/AdminFailRequest"
import AdminAudienceSearch from "./pages/Admin/Audience/AdminAudienceSearch"
import AdminChangePassword from "./pages/Admin/Password/AdminChangePassword"

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
          <Route path="edit/demande/:id" element={<UserEditDemande />} />
          <Route path="password" element={<InitializePasswordUser />} />
          <Route path="change/password" element={<UserChangePassword />} />
        </Route>
        {/* Admin routes */}
        <Route path="/admin" element={<RoleBasedRoute allowedRoles={["admin"]} />}>
            <Route path="home" element={<AdminDashboard />} />
            <Route path="demande/view/:id" element={<AdminRequestView />} />
            <Route path="demande/notorganized" element={<AdminFailRequest />} />
            <Route path="demande" element={<AdminDemande />} />
            <Route path="audience/search" element={<AdminAudienceSearch />} />
            <Route path="audience/qrcode" element={<AdminAudienceQRCode />} />
            <Route path="audience/scanned/:id" element={<AdminAudienceViewByQrCode />} />
            <Route path="audience/view/:id" element={<AdminAudienceView />} />
            <Route path="audience/report/:id" element={<AdminAudienceReport />} />
            <Route path="audience" element={<AdminAudience />} />
            <Route path="organize/audience/:id" element={<AdminOrganizeAudience />} />
            <Route path="availability" element={<AdminAvailability />} />
            <Route path="account/view/:id" element={<AdminAccountView />} />
            <Route path="account" element={<AdminAccount />} />
            <Route path="info" element={<AdminInfo />} />
            <Route path="password" element={<InitializePasswordAdmin />} />
            <Route path="change/password" element={<AdminChangePassword />} />
          </Route>
      </Routes>
  )
}

export default App