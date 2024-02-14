import React, { useEffect } from "react";
import Activity from "../Activity";

export default function Timer(props) {
    useEffect(() => {
        const timers = props.tasks.map((task, index) => {
            const endDate = new Date(`${task.date}T${task.time}`);
            const endTimeInSeconds = Math.floor(endDate.getTime() / 1000);
            const timer = setInterval(() => {
                const now = new Date();
                const currentTimeInSeconds = Math.floor(now.getTime() / 1000);
                const remainingTimeInSeconds = endTimeInSeconds - currentTimeInSeconds;
                if (remainingTimeInSeconds <= 0) {
                    clearInterval(timer);
                    const updatedTasks = [...props.tasks];
                    updatedTasks.splice(index, 1); // Удаляем задачу по индексу
                    props.setTasks(updatedTasks);
                    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Обновляем localStorage
                    return;
                }
                const remainingDays = Math.floor(remainingTimeInSeconds / (3600 * 24));
                const remainingHours = Math.floor((remainingTimeInSeconds % (3600 * 24)) / 3600);
                const remainingMinutes = Math.floor((remainingTimeInSeconds % 3600) / 60);
                const remainingSeconds = remainingTimeInSeconds % 60;
                props.setTasks(prevTasks => prevTasks.map(prevTask => {
                    if (prevTask === task) {
                        return {
                            ...prevTask,
                            remainingTime: `${remainingHours >= 10 ? remainingHours : '0' + remainingHours}:${remainingMinutes >= 10 ? remainingMinutes : '0' + remainingMinutes}:${remainingSeconds >= 10 ? remainingSeconds : '0' + remainingSeconds}`
                        };
                    }
                    return prevTask;
                }));
            }, 1000);
            return timer;
        });
        return () => {
            timers.forEach(timer => clearInterval(timer));
        };
    }, [props.tasks]);
    // return <Activity />
}