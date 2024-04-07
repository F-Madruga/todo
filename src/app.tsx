import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import TaskDetails from './pages/task-details';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="task-details" element={<TaskDetails />} />
            </Routes>
        </BrowserRouter>
    );
}
