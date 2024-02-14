import React from "react";
import asideStyle from './assets/style/aside.module.css'


export default function Aside(props) {

    const isDashboardPage = window.location.pathname === "/dashboard";
    const isTasksPage = window.location.pathname === "/tasks";



    return <aside className={asideStyle.aside} style={props.aside ? { width: 'auto' } : { marginLeft: '-400px' }}>
        <div className="w-full flex h-32 text-1xl"><h1 className="text-center m-auto">VCHUGAEV <span className="bg-yellow p-2 rounded">TASKS.</span></h1></div>
        <nav className={asideStyle.nav}>
            <a href="/dashboard">
                <div className={isDashboardPage ? `${asideStyle["dashboard--li"]} ${asideStyle.active}` : asideStyle["dashboard--li"]} onClick={() => props.setDisplay(true)}>
                    <img className={asideStyle["blocks--img"]} src={require('./assets/img/blocks.png')} alt="" />
                    <p className={asideStyle["dashboard--name"]}>Dashboard</p>
                </div>
            </a>
            <a href="/tasks">
                <div className={isTasksPage ? `${asideStyle["dashboard--li"]} ${asideStyle.active}` : asideStyle["dashboard--li"]} onClick={() => props.setDisplay(false)}>
                    <img className={asideStyle["todo--img"]} src={require('./assets/img/todo.png')} alt="" />
                    <p className={asideStyle["todo--name"]}>Задачи</p>
                </div>
            </a>
        </nav>
    </aside>
}