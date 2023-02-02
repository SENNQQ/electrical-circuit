import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {Route, Routes} from 'react-router-dom';
import Greeting from './pages/Greeting';
import Choice from './pages/Choice';
import Schema from './pages/Schema';
import {ToastContainer} from 'react-toastify';

function App() {
    return (
        <>
            <Routes>
                <Route path="" element={<Greeting/>}/>
                <Route path="/choice" element={<Choice/>}/>
                <Route path="/schema" element={<Schema/>}/>
            </Routes>
            <ToastContainer position="bottom-right"/>
        </>
    );
}

export default App;
