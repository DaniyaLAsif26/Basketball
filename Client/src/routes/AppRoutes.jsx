import { Routes, Route } from 'react-router-dom';

import HomePage from '../Pages/Home.jsx';
import DistrictPage from '../Pages/DistrictPage.jsx';
import EventsPage from '../Pages/EventsPage.jsx';
import NewsPage from '../Pages/NewsPage.jsx';
import RankingPage from '../Pages/RankingPage.jsx';
import AboutUsPage from '../Pages/AboutUsPage.jsx'
import GalleryPage from '../Pages/GalleryPage.jsx';
import Login from '../components/LogIn/Login.jsx';
import AddEventPage from '../Pages/AddEventPage.jsx';
import ViewEventPage from '../Pages/ViewEventPage.jsx';
import EditEventPage from '../Pages/EditEventPage.jsx';
import UserProfilePage from '../Pages/UserProfilePage.jsx';
import EditUserPage from '../Pages/EditUserPage.jsx';
import AllUsersPage from '../Pages/AllPlayersPage.jsx';
import ViewPlayerPage from '../Pages/ViewPlayerPage.jsx';

import AdminLoginPage from '../Pages/AdminLoginPage.jsx';
import AdminPage from '../Pages/AdminPage.jsx';
import AddNewsPage from '../Pages/AddNewsPage.jsx';
import AdminAddEventForm from '../components/AdminForms/AdminAddEventForm.jsx';
import EditNewsPage from '../Pages/EditNewsPage.jsx';
import AdminUserForm from '../components/AdminForms/EditUserForm.jsx';

import AdminProtectedRoute from '../ProtectedRoutes/AdminProtectedRoute.jsx';
import UserProtectedRoute from '../ProtectedRoutes/UserProtectedroute.jsx';

function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/home' element={<HomePage />} />

            <Route path='/districts' element={<DistrictPage />} />

            <Route path='/events' element={<EventsPage />} />

            <Route path='/news' element={<NewsPage />} />

            <Route path='/rankings' element={<RankingPage />} />

            <Route path='/about' element={<AboutUsPage />} />

            <Route path='/gallery' element={<GalleryPage />} />

            <Route path='/login' element={<Login />} />

            <Route path='/players/:id' element={<ViewPlayerPage />} />

            <Route path='/add-event' element={
                <UserProtectedRoute>
                    <AddEventPage />
                </UserProtectedRoute>
            } />

            <Route path='/view-event/:id' element={<ViewEventPage />} />

            <Route path='/event/edit/:id' element={
                <UserProtectedRoute>
                    <EditEventPage />
                </UserProtectedRoute>
            } />

            <Route path='/my-account' element={
                <UserProtectedRoute>
                    <UserProfilePage />
                </UserProtectedRoute>
            } />

            <Route path='/my-account/edit' element={
                <UserProtectedRoute>
                    <EditUserPage />
                </UserProtectedRoute>
            } />

            <Route path='/players' element={<AllUsersPage />} />

            {/* admin */}
            <Route path='/admin/login' element={
                <AdminLoginPage />
            } />

            <Route path='/admin' element={
                <AdminProtectedRoute>
                    <AdminPage />
                </AdminProtectedRoute>
            } />

            <Route path='/admin/add-news' element={
                <AdminProtectedRoute>
                    <AddNewsPage />
                </AdminProtectedRoute>
            } />

            <Route path='/admin/add-event' element={
                <AdminProtectedRoute>
                    <AdminAddEventForm />
                </AdminProtectedRoute>
            } />

            <Route path='/admin/edit-news/:id' element={
                <AdminProtectedRoute>
                    <EditNewsPage />
                </AdminProtectedRoute>
            } />

            <Route path='/admin/user/edit/:id' element={
                <AdminProtectedRoute>
                    <AdminUserForm />
                </AdminProtectedRoute>
            } />

        </Routes>
    )
}

export default AppRoutes;