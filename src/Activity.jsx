import React, { useEffect, useState } from "react";
import activityStyles from './assets/style/activity.module.css'; // Импорт модуля стилей
import { useStopwatch } from 'react-timer-hook';
import ActivityTimer from "./components/Timer";

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

    function getItemFromLocalStorage(key) {
        const itemString = localStorage.getItem(key);
        try {
            const item = JSON.parse(itemString);
            return item;
        } catch (error) {
            console.error('Ошибка при парсинге JSON:', error);
            return null;
        }
    }

    function addItemToLocalStorage(key, item) {
        localStorage.setItem(key, JSON.stringify(item))
    }

    const [tasks, setTasks] = useState(getItemFromLocalStorage('tasks'))

    if (getItemFromLocalStorage('accessTasks') === null) {
        addItemToLocalStorage('accessTasks', 1)
    }

    if (getItemFromLocalStorage('failTasks') === null) {
        addItemToLocalStorage('failTasks', 0)
    }

    const accessTasks = getItemFromLocalStorage('accessTasks')
    const failTasks = getItemFromLocalStorage('failTasks')
    const percentActive = Math.floor((accessTasks / (accessTasks + failTasks)) * 100)

    return (
        <main className={activityStyles.activity__main}>
            <ActivityTimer tasks={tasks} setTasks={setTasks} />
            <div className={activityStyles.activity__mainBlocks}>
                <div className={activityStyles.activity__block}>
                    <div className={activityStyles.activity__block__content}>
                        <h4 className={activityStyles.activity__name}>Выполнено задач</h4>
                        <div className={activityStyles.activity__info}>
                            <span className={activityStyles.activity__percent}>{percentActive}%</span>
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
                        <h4 className={activityStyles.activity__name}>Задачи</h4>
                        <div className={activityStyles.activity__info}>
                            <span className={activityStyles.activity__percent}>{accessTasks}</span>
                            <div className={activityStyles.activity__img__box}>
                                <img src={require('./assets/img/folder.png')} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={activityStyles.todo__block}>
                <div className={activityStyles.todo__block__content}>
                    <h4 className={activityStyles.todo__name}>To Do</h4>
                    <div className={activityStyles.todo__info}>
                        <table className={activityStyles.todo__table}>
                            {tasks.map(task => (
                                <tr key={task.id}>
                                    <div className={activityStyles.todo__row}>
                                        <th>
                                            <div className={activityStyles.todo__folder__box}>
                                                <img className={activityStyles.todo__folder} src={require('./assets/img/folder.png')} alt="" />
                                            </div>
                                        </th>
                                        <th>
                                            <div className={activityStyles.todo__name__box}>
                                                <span className={activityStyles.todo__names}>{task.formName}</span>
                                            </div>
                                        </th>
                                        <th>
                                            <div className={activityStyles.todo__time__box}>{task.remainingTime}</div>
                                        </th>
                                        <th>
                                            <div className="h-full flex"><hr className="m-auto h-1 w-full rounded bg-yellow border-yellow" /></div>
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
