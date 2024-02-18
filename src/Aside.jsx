import React from "react";
import asideStyle from './assets/style/aside.module.css'
import * as HoverCard from '@radix-ui/react-hover-card';

export default function Aside(props) {

    const isDashboardPage = window.location.pathname === "/dashboard";
    const isTasksPage = window.location.pathname === "/tasks";



    return <aside className={asideStyle.aside} style={props.aside ? { width: 'auto' } : { marginLeft: '-400px' }}>
        <a href="/dashboard"><div className="w-full flex h-32 text-1xl"><h1 className="text-center m-auto">VCHUGAEV <span className="bg-yellow p-2 rounded">TASKS.</span></h1></div></a>
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
            <hr className="w-full h-1 bg-grey rounded my-12" />
            <div className="flex place-content-between">


                <HoverCard.Root openDelay={100} closeDelay={0}>
                    <HoverCard.Trigger>
                        <div className="bg-folder-green bg-opacity-30 p-6 pb-6 rounded-3xl">
                            <a href="/access-tasks"><img className="w-auto h-auto" src={require('./assets/img/folder_green.png')} alt="" /></a>
                        </div>
                    </HoverCard.Trigger>
                    <HoverCard.Portal>
                        <HoverCard.Content className={asideStyle.HoverCardContent} >
                            <HoverCard.Arrow />
                            <div className="bg-black-grey p-1 rounded text-white"><p>выполненные задачи</p></div>
                        </HoverCard.Content>
                    </HoverCard.Portal>
                </HoverCard.Root>
                <HoverCard.Root openDelay={100} closeDelay={0}>
                    <HoverCard.Trigger>
                        <div className="bg-red bg-opacity-15 p-6 pb-3 rounded-3xl ">
                            <a href="/removed-tasks"><img className="w-auto" src={require('./assets/img/remove__task.png')} alt="" /></a>
                        </div>
                    </HoverCard.Trigger>
                    <HoverCard.Portal>
                        <HoverCard.Content className={asideStyle.HoverCardContent} >
                            <HoverCard.Arrow />
                            <div className="bg-black-grey p-1 rounded text-white"><p>Невыполненные Задачи</p></div>
                        </HoverCard.Content>
                    </HoverCard.Portal>
                </HoverCard.Root>

            </div>
        </nav>

    </aside>
}