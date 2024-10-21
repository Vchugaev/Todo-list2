import React, { createRef, useState, useTransition } from "react";
import Header from "./Header";
import Today from "./Today";
import './assets/style/style.css'
import Activity from "./Activity";
import Todos from './Todos'
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import RempvedTasks from "./RemovedTasks";
import AccessTasks from "./AccessTasks";
import Notebook from "./components/Notebook";



export default function Main(props) {

    const isRemovedTasksPage = window.location.pathname === "/removed-tasks";
    const isAccessTasksPage = window.location.pathname === "/access-tasks";
    const isnote = window.location.pathname === "/notebook";


    const searchValue = useSelector(state => state.searchReducer);

    const location = useLocation()

    return <main style={{ width: '100%' }}>
        <Header props={props} />

        {searchValue.length > 0 || isRemovedTasksPage || isAccessTasksPage || isnote ? '' : <Today />}

        <Routes location={location}>
            <Route path="/dashboard" element={<Activity />} />
            <Route path="/tasks" element={<Todos />} />
            <Route path="/access-tasks" element={<AccessTasks />} />
            <Route path="/notebook" element={<Notebook />} />
        </Routes>

    </main >


}



