import React, { useState } from "react";
import todayStyles from '../assets/style/today.module.css'



export default function TodayAddTask() {
    function addItemToLocalStorage(key, item) {
        localStorage.setItem(key, JSON.stringify(item))
    }

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

    const currentTime = new Date();

    const hours = currentTime.getHours().toString().padStart(2, '0')
    const minutes = currentTime.getMinutes().toString().padStart(2, '0')
    const seconds = currentTime.getSeconds().toString().padStart(2, '0')

    const formattedTime = `${hours}:${minutes}:${seconds}`;

    const [form, setForm] = useState(true)
    const [formName, setFormName] = useState('')
    const [text, setText] = useState('')
    const [date, onDate] = useState(new Date().toISOString().split('T')[0]);
    const [time, onTime] = useState(formattedTime);

    if (getItemFromLocalStorage('tasks') === null) {
        addItemToLocalStorage('tasks', [])
    }

    const addTask = () => {
        if (getItemFromLocalStorage('tasks') === null) {
            addItemToLocalStorage('tasks', [{ id: new Date, formName: formName, text: text, date: date, time: time, delete: false }])
        } else {
            let storage = getItemFromLocalStorage('tasks');
            storage.push({ id: new Date, formName: formName, text: text, date: date, time: time, delete: false })
            console.log(storage);
            addItemToLocalStorage('tasks', storage)
        }
        
        setFormName('')
        setText('')
    }
    return (
        <div className={todayStyles["create__new__task"]}>
            <div className={todayStyles["create__new__task__name"]}>
                <h3 className={todayStyles["create__new__task--h3"]}>Создать новую задачу</h3>
                <img onClick={() => setForm(!form)} className={todayStyles["create__new__task--img"]} src={require('../assets/img/play.png')} alt="" />
            </div>
            <div className={form ? todayStyles["create__task__form"] : todayStyles["create__task__form--active"]}>
                <form>
                    <label className={todayStyles["create__task__form--label"]} htmlFor="">Имя задачи</label> <br />
                    <input maxLength={25} value={formName} onChange={e => setFormName(e.target.value)} className={todayStyles["create__task__form--input"]} placeholder="Люблю сырники" type="text" /><br />
                    <label className={todayStyles["create__task__form--label"]} htmlFor="">Текст</label><br />
                    <textarea maxLength={150} value={text} onChange={e => setText(e.target.value)} className={todayStyles["create__task__form--textarea"]} placeholder="Бенедикт" type="text" /><br />

                    <input onChange={e => onDate(e.target.value)} defaultValue={date} className={todayStyles["create__task__date-date"]} type="date" />
                    <input onChange={e => onTime(e.target.value)} value={time} className={todayStyles["create__task__date-time"]} type="time" />

                    <button onClick={(e) => { e.preventDefault(); addTask(); }} className={todayStyles["create__task__form__submit"]}>Создать</button>
                </form>
            </div>
        </div>
    )
}