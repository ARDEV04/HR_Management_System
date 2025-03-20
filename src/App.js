import './App.css';
import { Menu } from './Components';
// import { Route, Routes } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import LeaveRightSection from './Components/RightSection/leaveRightSection'
import Attendence from './Components/RightSection/Attendence';


function App() {
    return (
        <>
        <Menu/>
        <Routes>
            <Route path="/attendence" element={<Attendence/>} />
            <Route path="/leave" element={<LeaveRightSection/>} />
            {/* Other routes here */}
        </Routes>
        </>
        
    );
}

export default App;
