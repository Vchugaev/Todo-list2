import React, { useEffect, useState } from "react";
import todoStyles from './assets/style/todos.module.css'
import { useDispatch, useSelector } from "react-redux";
import { useLocalStorage } from "@uidotdev/usehooks";

export default function RempvedTasks() {

    const searchValue = useSelector(state => state.searchReducer);
    const [tasks, setTasks] = useLocalStorage('failedTasks', [])

    return <main className={todoStyles.todos__main}>

        <h2 className="mx-12 mb-12 text-5xl">Архив невыполненных задач</h2>
        <div className={todoStyles.todos}>
            {tasks.filter(task => task.formName.toLowerCase().includes(searchValue.toLowerCase()) || task.text.toLowerCase().includes(searchValue.toLowerCase()))
                .map((task, index) => (
                    <div key={task.id} className="bg-white rounded-3xl outline-red outline"> 
                        <div className={todoStyles.todos__content}>
                            <div className={todoStyles.todos__name__heading}>
                                <span className="text-3xl text-red line-through">{task.formName}</span>
                            </div>
                            <p className="text-1xl text-red line-through">{task.text}</p>
                        </div>
                    </div>
                ))}
        </div>
    </main>
}