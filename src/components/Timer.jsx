import { useLocalStorage } from "@uidotdev/usehooks";
import React, { useState, useEffect } from "react";

export default function ActivityTimer({ task, onDelete }) {
    const endDate = new Date(`${task.date}T${task.time}`);
    const endTime = endDate.getTime();


    const [failedTasks, setFailedTasks] = useLocalStorage('failedTasks', [])
    const [tasks, setTasks] = useLocalStorage('tasks', [])

    const calculateTimeLeft = () => {
        const now = new Date().getTime();
        const distance = endTime - now;

        if (distance <= 0) {
            onDelete(task.id);
            const fail = tasks.filter(failTask => task.id === failTask.id)
            failedTasks.push(...fail)
            localStorage.setItem('failedTasks', JSON.stringify(failedTasks))
            
            return {
                hours: '00',
                minutes: '00',
                seconds: '00'
            };
            
        }

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        return {
            hours: hours < 10 ? `0${hours}` : hours.toString(),
            minutes: minutes < 10 ? `0${minutes}` : minutes.toString(),
            seconds: seconds < 10 ? `0${seconds}` : seconds.toString()
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <span>
            {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
        </span>
    );
}