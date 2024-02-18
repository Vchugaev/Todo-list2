import React, { useEffect, useState } from "react";
import activityStyles from './assets/style/activity.module.css'
import { useStopwatch } from 'react-timer-hook';
import ActivityTimer from "./components/Timer";
import * as Progress from '@radix-ui/react-progress';
import TimeToProgress from "./components/TimeToProgress";
import { useLocalStorage } from "@uidotdev/usehooks";


function MyStopwatch() {
    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        reset,
    } = useStopwatch({ autoStart: true });

    return (
        <>
            <span>{hours < 10 ? '0' + hours : hours}</span>:
            <span>{minutes < 10 ? '0' + minutes : minutes}</span>:
            <span>{seconds < 10 ? '0' + seconds : seconds}</span>
        </>
    );
}

export default function Activity() {
    const [tasks, setTasks] = useLocalStorage('tasks', [])
    const [accessTasks, setAccessTasks] = useLocalStorage('accessTasks', [])
    const [failedTasks, setFailedTasks] = useLocalStorage('failedTasks', [])
    let percentAccessTasks = Math.round(accessTasks.length / (accessTasks.length + failedTasks.length) * 100)
    const onDelete = (taskId) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    };





    
    return (
        <main className={activityStyles.activity__main}>

            <div className={activityStyles.activity__mainBlocks}>
                <div className={activityStyles.activity__block}>
                    <div className={activityStyles.activity__block__content}>
                        <h4 className={activityStyles.activity__name}>Выполнено задач</h4>
                        <div className={activityStyles.activity__info}>
                            <span className={activityStyles.activity__percent}>{isNaN(percentAccessTasks) ? '0' : percentAccessTasks}%</span>
                            <div className={activityStyles.activity__img__box}>
                                <img src={require('./assets/img/arrows.png')} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={activityStyles.activity__block}>
                    <div className={activityStyles.activity__block__content}>
                        <h4 className={activityStyles.activity__name}>Вы работали</h4>
                        <div className={activityStyles.activity__info}>
                            <span className={activityStyles.activity__percent}><MyStopwatch /></span>
                            <div className={activityStyles.activity__img__box}>
                                <img src={require('./assets/img/time.png')} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={activityStyles.activity__block}>
                    <div className={activityStyles.activity__block__content}>
                        <h4 className={activityStyles.activity__name}>Активные задачи</h4>
                        <div className={activityStyles.activity__info}>
                            <span className={activityStyles.activity__percent}>{tasks.length}</span>
                            <div className={activityStyles.activity__img__box}>
                                <img src={require('./assets/img/folder.png')} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={activityStyles.todo__block}>
                <div className={activityStyles.todo__block__content}>
                    <h4 className={activityStyles.todo__name}>Ваши задачи</h4>
                    <div className={activityStyles.todo__info}>
                        <table className={activityStyles.todo__table}>
                            {tasks.map((task, index) => (
                                <tr key={task.id}>
                                    <div className={activityStyles.todo__row}>
                                        <th>
                                            <div className={activityStyles.todo__folder__box}>
                                                <img className={activityStyles.todo__folder} src={require('./assets/img/folder.png')} alt="" />
                                            </div>
                                        </th>
                                        <th>
                                            <div className={activityStyles.todo__name__box}>
                                                <span className={activityStyles.todo__names}>{task.formName.length > 15 ? task.formName.slice(0, 15) + '...' : task.formName}</span>
                                            </div>
                                        </th>
                                        <th>
                                            <div className={activityStyles.todo__time__box}><ActivityTimer key={task.id} task={task} onDelete={onDelete} /></div>
                                        </th>
                                        <th>
                                            <div className="h-full w-full flex">
                                                <TimeToProgress props={task} />
                                            </div>
                                        </th>
                                    </div>
                                </tr>
                            ))}
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
}
