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

import AdminPage from '../Pages/AdminPage.jsx';
import AddNewsPage from '../Pages/AddNewsPage.jsx';
import AdminAddEventForm from '../components/AdminForms/AdminAddEventForm.jsx';

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

            {/* admin */}
            <Route path='/admin' element={<AdminPage />} />

            <Route path='/admin/add-news' element={<AddNewsPage />} />

            <Route path='/admin/add-event' element={<AdminAddEventForm />} />
        </Routes>
    )
}

export default AppRoutes;