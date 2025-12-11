import { Routes, Route } from 'react-router-dom';

import HomePage from '../Pages/Home.jsx';
import DistrictPage from '../Pages/DistrictPage.jsx';
import EventsPage from '../Pages/EventsPage.jsx';

function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/home' element={<HomePage />} />

            <Route path='/districts' element={<DistrictPage />} />

            <Route path='/events' element={<EventsPage />} />
        </Routes>
    )
}

export default AppRoutes;