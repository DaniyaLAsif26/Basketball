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

import AdminLoginPage from '../Pages/AdminLoginPage.jsx';
import AdminPage from '../Pages/AdminPage.jsx';
import AddNewsPage from '../Pages/AddNewsPage.jsx';
import AdminAddEventForm from '../components/AdminForms/AdminAddEventForm.jsx';
import EditNewsPage from '../Pages/EditNewsPage.jsx';

import AdminProtectedRoute from '../ProtectedRoutes/AdminProtectedRoute.jsx';

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

            <Route path='/add-event' element={<AddEventPage />} />

            <Route path='/view-event/:id' element={<ViewEventPage />} />

            <Route path='/event/edit/:id' element={<EditEventPage />} />

            <Route path='/my-account' element={<UserProfilePage />} />

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
        </Routes>
    )
}

export default AppRoutes;