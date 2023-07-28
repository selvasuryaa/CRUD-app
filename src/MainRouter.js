import React from "react"
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CRUD from "./Pages/CRUD";
import App from "./App";
import HomePage from "./Pages/HomePage";
import NotFound from './Pages/NotFound';


const MainRouter = (props) => {
    return (
        <div>
            <BrowserRouter>
                {/* <HomePage link={Link} /> */}
                <Routes>
                    <Route path='/' element={<HomePage />}></Route>
                    <Route path='/crud' element={<CRUD />}></Route>
                    <Route path='/todo' element={<App />}></Route>
                    <Route path='*' element={<NotFound />}></Route>
                </Routes>
            </BrowserRouter>

        </div>
    )
};

export default MainRouter;
