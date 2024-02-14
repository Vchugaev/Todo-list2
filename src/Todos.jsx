import React, { useEffect, useState } from "react";
import todoStyles from './assets/style/todos.module.css'
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "./store/taskReducer";
import tasksReducer from './store'
import searchReducer from './store'
import ActivityTimer from "./components/Timer";



export default function Todos() {

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
    const dispatch = useDispatch()
    const searchValue = useSelector(state => state.searchReducer);
    const [tasks, setTasks] = useState(getItemFromLocalStorage('tasks'))
    dispatch(addTodo(getItemFromLocalStorage('tasks')))
    function toggleTaskDeleteStatus(index) {
        const updatedTasks = [...tasks];
        updatedTasks[index].delete = !updatedTasks[index].delete;
        setTasks(updatedTasks);
    }

    return <main className={todoStyles.todos__main}>
        <ActivityTimer tasks={tasks} setTasks={setTasks} />
        <div className={todoStyles.todos}>
            {tasks.filter(task => task.formName.toLowerCase().includes(searchValue.toLowerCase()) || task.text.toLowerCase().includes(searchValue.toLowerCase()))
                .map((task, index) => (
                    <div key={task.id} className={task.delete ? `${todoStyles["todos__block--done"]} ${todoStyles.todos__block}` : todoStyles.todos__block}>
                        <div className={todoStyles.todos__content}>
                            <input
                                className={todoStyles.checkbox}
                                type="checkbox"
                                onChange={() => {
                                    toggleTaskDeleteStatus(index)
                                }}
                            />
                            <div className={todoStyles.todos__name__heading}>
                                <span className={task.delete ? `${todoStyles["todos__name--done"]} ${todoStyles.todos__name}` : todoStyles.todos__name}>{task.formName}</span>
                                {task.delete ? <button className={todoStyles.delete__task} onClick={() => {
                                    const updatedTasks = [...tasks]
                                    updatedTasks.splice(index, 1)
                                    setTasks(updatedTasks)
                                    localStorage.setItem('tasks', JSON.stringify(updatedTasks))
                                }} >Удалить</button> : ''}
                            </div>
                            <p className={task.delete ? `${todoStyles["todos__text--done"]} ${todoStyles.todos__text}` : todoStyles.todos__text}>{task.text}</p>
                            <span className={task.delete ? `${todoStyles["todos__time--done"]} ${todoStyles.todos__time}` : todoStyles.todos__time}>{task.remainingTime}</span>
                        </div>
                    </div>
                ))}
        </div>
    </main>
}