import { Routes, Route } from 'react-router-dom';

import HomePage from '../Pages/Home.jsx';
import DistrictPage from '../Pages/DistrictPage.jsx';
import EventsPage from '../Pages/EventsPage.jsx';
import NewsPage from '../Pages/NewsPage.jsx';
import RankingPage from '../Pages/RankingPage.jsx';
import AboutUsPage from '../Pages/AboutUsPage.jsx'
import GalleryPage from '../Pages/GalleryPage.jsx';

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
        </Routes>
    )
}

export default AppRoutes;