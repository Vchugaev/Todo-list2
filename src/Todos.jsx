import React, { useEffect, useState } from "react";
import todoStyles from './assets/style/todos.module.css'
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "./store/taskReducer";
import tasksReducer from './store'
import searchReducer from './store'
import ActivityTimer from "./components/Timer";
import * as Switch from '@radix-ui/react-switch';
import switchStyle from './assets/style/switch.module.css'
import { type } from "@testing-library/user-event/dist/type";
import * as ContextMenu from '@radix-ui/react-context-menu';
import alertStyle from './Radix/alert.module.css'





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

    const [checked, setChecked] = useState(false)
    const [failedTasks, setFailedTasks] = useState(getItemFromLocalStorage('failedTasks') || []);
    const deleteTasks = (task, index, num) => {
        // Удаление задачи (1 - выполнено, 2 - не выполнено, 3 - просто удалить)
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    
        if (num === 1) {
            let accessTasks = getItemFromLocalStorage('accessTasks') || [];
            const access = tasks.filter(accessTask => task.id === accessTask.id);
            if (access.length) {
                accessTasks.push(...access);
                localStorage.setItem('accessTasks', JSON.stringify(accessTasks));
            }
        } else if (num === 2) {
            let failedTasks = getItemFromLocalStorage('failedTasks') || [];
            const fail = tasks.filter(failedTask => task.id === failedTask.id);
            if (fail.length) {
                setFailedTasks([...failedTasks, ...fail]);
                localStorage.setItem('failedTasks', JSON.stringify([...failedTasks, ...fail]));
            }
        }
    };
    


    const handleToggle = (index) => {
        setChecked(!checked)
        toggleTaskDeleteStatus(index)
    }

    const onDelete = (taskId) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    };

    return <main className={todoStyles.todos__main}>
        <div className={todoStyles.todos}>
            {tasks.filter(task => task.formName.toLowerCase().includes(searchValue.toLowerCase()) || task.text.toLowerCase().includes(searchValue.toLowerCase()))
                .map((task, index) => (
                    <div key={task.id} className={task.delete ? `${todoStyles["todos__block--done"]} ${todoStyles.todos__block}` : todoStyles.todos__block}>

                        <ContextMenu.Root>
                            <ContextMenu.Trigger>
                                <div className={todoStyles.todos__content}>
                                    <Switch.Root className={switchStyle.SwitchRoot} id="airplane-mode" onCheckedChange={() => handleToggle(index)}>
                                        <Switch.Thumb className={switchStyle.SwitchThumb} />
                                    </Switch.Root>
                                    {task.delete ? <button className="text-3xl text-red float-right" onClick={() => deleteTasks(task, index, 1)} ><img className={todoStyles.delete__task} src={require('./assets/img/cross.png')} alt="" /></button> : ''}
                                    <div className={todoStyles.todos__name__heading}>
                                        <span className={task.delete ? `${todoStyles["todos__name--done"]} ${todoStyles.todos__name}` : todoStyles.todos__name}>{task.formName}</span>

                                    </div>
                                    <p className={task.delete ? `${todoStyles["todos__text--done"]} ${todoStyles.todos__text}` : todoStyles.todos__text}>{task.text}</p>
                                    <span className={task.delete ? `${todoStyles["todos__time--done"]} ${todoStyles.todos__time}` : todoStyles.todos__time}><ActivityTimer key={task.id} task={task} onDelete={onDelete} /></span>
                                </div>
                            </ContextMenu.Trigger>
                            <ContextMenu.Content className="animate-hoverDialog shadow-alert-shadow p-1 ">
                                <div className="bg-white flex flex-col text-center">
                                    <button onClick={() => deleteTasks(task, index, 3)} className="hover:bg-red transition-all hover:text-white text-black p-1 bg-opacity-55  cursor-pointer">Удалить без кэша</button>
                                    <button onClick={() => deleteTasks(task, index, 2)} className="hover:bg-yellow transition-all hover:text-white text-black p-1 bg-opacity-55  cursor-pointer">Не выполнено</button>
                                    <button onClick={() => deleteTasks(task, index, 1)} className="hover:bg-green transition-all hover:text-white text-black p-1 bg-opacity-55  cursor-pointer">Выполнено</button>
                                </div>
                            </ContextMenu.Content>
                        </ContextMenu.Root>
                    </div>


                ))}
        </div>
    </main>
}