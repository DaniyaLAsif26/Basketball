import { Routes, Route } from 'react-router-dom';

import HomePage from '../Pages/Home.jsx';
import DistrictPage from '../Pages/DistrictPage.jsx';
import EventsPage from '../Pages/EventsPage.jsx';
import NewsPage from '../Pages/NewsPage.jsx';
import Rankings from '../components/Rankings/Rankings.jsx';

function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/home' element={<HomePage />} />

            <Route path='/districts' element={<DistrictPage />} />

            <Route path='/events' element={<EventsPage />} />

            <Route path='/news' element={<NewsPage />} />
            
            <Route path='/rankings' element={<Rankings />} />
        </Routes>
    )
}

export default AppRoutes;