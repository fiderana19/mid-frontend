import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LoadingOutlined } from "@ant-design/icons";
const Signup = lazy(() =>  import('./pages/Signup'));
const UserHome = lazy(() => import('./pages/User/UserHome'));
const UserDemande = lazy(() => import('./pages/User/UserDemande'));
const UserAudience = lazy(() => import('./pages/User/UserAudience'));
const UserInfo = lazy(() => import("./pages/User/UserInfo"));
const AdminDemande = lazy(() => import("./pages/Admin/AdminDemande"));
const AdminAudience = lazy(() => import("./pages/Admin/AdminAudience"));
const AdminAvailability = lazy(() => import("./pages/Admin/AdminAvailability"));
const AdminDashboard = lazy(() => import("./pages/Admin/AdminDashboard"));
const AdminInfo = lazy(() => import("./pages/Admin/AdminInfo"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminAccount = lazy(() => import("./pages/Admin/AdminAccount"));
const RoleBasedRoute = lazy(() => import("./routes/RoleBasedRoute"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const Unauthoriezd = lazy(() => import("./pages/Unauthorized"));
const AdminAccountView = lazy(() => import("./pages/Admin/Account/AdminAccountView"));
const UserAddDemande = lazy(() => import("./pages/User/Demande/AddDemande"));
const AdminRequestView = lazy(() => import("./pages/Admin/Request/AdminRequestView"));
const InitializePasswordUser = lazy(() => import("./pages/User/InitializePasswordUser"));
const InitializePasswordAdmin = lazy(() => import("./pages/Admin/InitializePasswordAdmin"));
const AdminOrganizeAudience = lazy(() => import("./pages/Admin/Audience/AdminOrganizeAudience"));
const AdminAudienceView = lazy(() => import("./pages/Admin/Audience/AdminAudienceView"));
const AdminAudienceReport = lazy(() => import("./pages/Admin/Audience/AdminAudienceReport"));
const UserChangePassword = lazy(() => import("./pages/User/Password/UserChangePassword"));
const UserEditDemande = lazy(() => import("./pages/User/Demande/EditDemande"));
const AdminAudienceQRCode = lazy(() => import("./pages/Admin/Audience/AdminAudienceQRCode"));
const AdminAudienceViewByQrCode = lazy(() => import("./pages/Admin/Audience/AdminAudienceViewByQrCode"));
const AdminFailRequest = lazy(() => import("./pages/Admin/Request/AdminFailRequest"));
const AdminAudienceSearch = lazy(() => import("./pages/Admin/Audience/AdminAudienceSearch"));
const AdminChangePassword = lazy(() => import("./pages/Admin/Password/AdminChangePassword"));

function App() {
  return (
      <Routes>
        {/* Public routes */}
        <Route index path="/" element={
          <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
            <LoginPage />
          </Suspense>} />
        <Route path="/signup" element={
          <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
            <Signup />
          </Suspense>} />
        <Route path="/unauthorized" element={
          <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
            <Unauthoriezd /> 
          </Suspense>} />
        <Route path="*" element={
          <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
            <NotFound />
          </Suspense>} />
        {/* User routes */}
        <Route path="/user" element={
          <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
              <RoleBasedRoute allowedRoles={["user"]} />
          </Suspense> }>
          <Route path="home" element={
            <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
              <UserHome />
            </Suspense>} />
          <Route path="demande" element={
            <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
              <UserDemande />
            </Suspense>} />
          <Route path="audience" element={
            <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
                <UserAudience />
            </Suspense>} />
          <Route path="info" element={
            <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
              <UserInfo />
            </Suspense>} />
          <Route path="add/demande" element={
            <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
              <UserAddDemande />
            </Suspense>} />
          <Route path="edit/demande/:id" element={
            <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
              <UserEditDemande />
            </Suspense>} />
          <Route path="password" element={
            <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
              <InitializePasswordUser />
            </Suspense>} />
          <Route path="change/password" element={
            <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
              <UserChangePassword />
            </Suspense>} />
        </Route>
        {/* Admin routes */}
        <Route path="/admin" element={
          <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
            <RoleBasedRoute allowedRoles={["admin"]} />
          </Suspense>}>
            <Route path="home" element={
              <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
                <AdminDashboard />
              </Suspense>} />
            <Route path="demande/view/:id" element={
              <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
                <AdminRequestView />
              </Suspense>} />
            <Route path="demande/notorganized" element={
              <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
                <AdminFailRequest />
              </Suspense>} />
            <Route path="demande" element={
              <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
                <AdminDemande />
              </Suspense>} />
            <Route path="audience/search" element={
              <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
                <AdminAudienceSearch />
              </Suspense>} />
            <Route path="audience/qrcode" element={
              <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
                <AdminAudienceQRCode />
              </Suspense>} />
            <Route path="audience/scanned/:id" element={
              <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
                <AdminAudienceViewByQrCode />
              </Suspense>} />
            <Route path="audience/view/:id" element={
              <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
                <AdminAudienceView />
              </Suspense>} />
            <Route path="audience/report/:id" element={
              <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
                <AdminAudienceReport />
              </Suspense>} />
            <Route path="audience" element={
              <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
                <AdminAudience />
              </Suspense>} />
            <Route path="organize/audience/:id" element={
              <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
                <AdminOrganizeAudience />
              </Suspense>} />
            <Route path="availability" element={
              <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
                <AdminAvailability />
              </Suspense>} />
            <Route path="account/view/:id" element={
              <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
                <AdminAccountView />
              </Suspense>} />
            <Route path="account" element={
              <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
                <AdminAccount />
              </Suspense>} />
            <Route path="info" element={
              <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
                <AdminInfo />
              </Suspense>} />
            <Route path="password" element={
              <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
                <InitializePasswordAdmin />
              </Suspense>} />
            <Route path="change/password" element={
              <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
                <AdminChangePassword />
              </Suspense>} />
          </Route>
      </Routes>
  )
}

export default App