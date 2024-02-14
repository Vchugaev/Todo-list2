import React, { createRef, useState, useTransition } from "react";
import { animated, useSpring } from '@react-spring/web'
import Header from "./Header";
import Today from "./Today";
import './assets/style/style.css'
import Activity from "./Activity";
import Todos from './Todos'
import { useDispatch, useSelector } from "react-redux";
import tasksReducer from './store'
import searchReducer from './store'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group'


export default function Main(props) {

    const searchValue = useSelector(state => state.searchReducer);

    const [isVisible, setIsVisible] = useState(true);
    const location = useLocation()

    return <main style={{ width: '100%' }}>
        <Header props={props} />

        {searchValue.length > 0 ? '' : <Today />}

        <Routes location={location}>
            <Route path="/dashboard" element={<Activity />} />
            <Route path="/tasks" element={<Todos />} />
        </Routes>

    </main >


}



