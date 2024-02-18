import React, { useState } from "react";
import todayStyles from './assets/style/today.module.css';
import Moment from 'react-moment';
import TodayAddTask from "./components/Today";


export default function Main() {

    return (
        <div className={todayStyles.today__block}>
            <div className={todayStyles.day}>
                <h2 className={todayStyles["day--h2"]}>Сегодня</h2>
                <h3 className={todayStyles.date}><Moment format="ddd DD, YYYY | hh:mm A" interval={1000}></Moment></h3>
            </div>
            <TodayAddTask />
        </div>
    );
}
