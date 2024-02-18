import React, { useEffect, useState } from "react";
import headerStyle from './assets/style/header.module.css'
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "./store/taskReducer";
import { addSearch } from "./store/searchReducer";
import tasksReducer from './store'
import searchReducer from './store'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
// import * as NavigationMenu from '@radix-ui/react-navigation-menu';
// import { CaretDownIcon } from '@radix-ui/react-icons';
// import './Radix/notifications.css'
// import { Accordion } from "@/components/ui/accordion";
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import alertStyle from './Radix/alert.module.css'
import blue from './avatars/blue.jpg'
import glasses from './avatars/glasses.jpg'
import grandpa from './avatars/grandpa.jpg'
import green from './avatars/green.jpg'
import pink from './avatars/pink.jpg'
import yellow from './avatars/yellow.jpg'










const avatars = [
    blue,
    glasses,
    grandpa,
    green,
    pink,
    yellow,
]

export default function Header(props) {




    const dispatch = useDispatch()
    const [search, setSearch] = useState('')

    useEffect(() => {
        dispatch(addSearch(search));
    }, [search]);


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
    const fails = getItemFromLocalStorage('failedTasks')
    const failedTasks = fails.filter(fail => fail.delete === false)




    if (getItemFromLocalStorage('name') === null) {
        localStorage.setItem('name', JSON.stringify({ name: 'Papasha', desc: 'Oh oh oh oh', avatar: 1 }))
    }

    let nameStorage = getItemFromLocalStorage('name')

    const [name, setName] = useState(nameStorage.name)
    const [desc, setDesc] = useState(nameStorage.desc)
    const [avatar, setAvatar] = useState(nameStorage.avatar)

    localStorage.setItem('name', JSON.stringify({ name: name, desc: desc, avatar: avatar }))





    return <> <header className={headerStyle.header}>
        <div className={headerStyle.main}>
            <div onClick={() => { props.props.setAside(!props.props.aside) }} className={headerStyle.dashboard}>
                <img
                    
                    className={headerStyle["dashboard--image"]}
                    src={props.props.aside ? require('./assets/img/dashboard__active.png') : require('./assets/img/dashboard.png')}
                    alt=""
                />
                <p className={headerStyle["dashboard--text"]}>Dashboard</p>
            </div>
            <div className={headerStyle["right__box"]}>
                <div className={headerStyle.search}>
                    <input
                        onChange={(e) => {
                            setSearch(e.target.value)
                            props.props.setDisplay(false)
                        }}
                        value={search}
                        className={headerStyle["search__input"]}
                        placeholder="Поиск..."
                        type="text"
                    />
                </div>
                <div className={headerStyle.notifications} >
                    <DropdownMenu.Root onOpenChange={() => {
                        failedTasks.map(task => {
                            task.delete = true
                        })

                        localStorage.setItem('failedTasks', JSON.stringify(fails))
                    }}>
                        <DropdownMenu.Trigger className="bg-white">
                            <img className={headerStyle["notifications--image"]} src={require('./assets/img/notifications.png')} alt="" />
                            {failedTasks.length > 0 ? <div className="h-4 w-4 bg-red text-white rounded-full flex absolute -mt-9 ml-3"><span className="m-auto text-xs">{failedTasks.length}</span></div> : ''}
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content className={alertStyle.AlertNotContent}>
                            <DropdownMenu.Item className="mb-4 text-xl font-bold" shortcut="">Невыполненные задачи</DropdownMenu.Item>

                            {failedTasks.map(task => (
                                <DropdownMenu.Item shortcut="" key={task.id}>
                                    <div>
                                        <span className="text-red font-medium text-xs ">ВРЕМЯ ВЫШЛО:</span>
                                        <p className="-mt-1">{task.formName}</p>
                                    </div>
                                </DropdownMenu.Item>
                            ))}

                        </DropdownMenu.Content>
                    </DropdownMenu.Root>


                </div>
                <div className="flex">
                    <div className={headerStyle.account}>
                        <div className={headerStyle.name}>
                            <p className={headerStyle["name--text"]}>{name}</p>
                            <p className={headerStyle["description--text"]}>{desc}</p>
                        </div>
                    </div>


                    <AlertDialog.Root>
                        <AlertDialog.Trigger>
                            <div className="flex">
                                <img className="w-16 rounded-full m-auto hover:outline-dashed hover:outline-2 outline-black hover:animate-[rotate_1s_ease-in-out_infinite]" src={avatars[nameStorage.avatar]} alt="" />
                            </div>
                        </AlertDialog.Trigger>
                        <AlertDialog.Portal>
                            <AlertDialog.Overlay className={alertStyle.AlertDialogOverlay} />
                            <AlertDialog.Content className={alertStyle.AlertDialogContent}>
                                <AlertDialog.Title className={alertStyle.AlertDialogTitle}>Редактировать профиль</AlertDialog.Title>
                                <AlertDialog.Description className={alertStyle.AlertDialogDescription}>
                                    <div className="text-center">
                                        <input maxLength={20} onChange={e => setName(e.target.value)} value={name} placeholder="..." className="text-4xl mt-8 text-black text-center w-auto bg-white_bg rounded" />
                                        <input maxLength={25} onChange={e => setDesc(e.target.value)} value={desc} placeholder="..." className="text-black text-center text-2xl mt-6 py-3 rounded bg-white_bg" />
                                        <h3 className="my-8 text-center text-black text-3xl">Выберите аватар</h3>
                                        <div className="grid grid-cols-3 gap-10">
                                            <img onClick={() => setAvatar(0)} className="w-32 transition ease-in-out delay-0 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-100 rounded-3xl" src={require('./avatars/blue.jpg')} alt="blue.jpg" />
                                            <img onClick={() => setAvatar(1)} className="w-32 transition ease-in-out delay-0 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-100 rounded-3xl" src={require('./avatars/glasses.jpg')} alt="glasses.jpg" />
                                            <img onClick={() => setAvatar(2)} className="w-32 transition ease-in-out delay-0 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-100 rounded-3xl" src={require('./avatars/grandpa.jpg')} alt="grandpa.jpg" />
                                            <img onClick={() => setAvatar(3)} className="w-32 transition ease-in-out delay-0 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-100 rounded-3xl" src={require('./avatars/green.jpg')} alt="green.jpg" />
                                            <img onClick={() => setAvatar(4)} className="w-32 transition ease-in-out delay-0 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-100 rounded-3xl" src={require('./avatars/pink.jpg')} alt="pink.jpg" />
                                            <img onClick={() => setAvatar(5)} className="w-32 transition ease-in-out delay-0 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-100 rounded-3xl" src={require('./avatars/yellow.jpg')} alt="yellow.jpg" />
                                        </div>
                                    </div>
                                    <input type="text" />
                                </AlertDialog.Description>
                                <div className="mt-32" style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
                                    <AlertDialog.Cancel asChild>
                                        <button className="bg-red p-3 bg-opacity-50 text-white rounded-xl cursor-pointer">Закрыть</button>
                                    </AlertDialog.Cancel>
                                </div>
                            </AlertDialog.Content>
                        </AlertDialog.Portal>
                    </AlertDialog.Root>
                </div>
            </div>
        </div>
    </header >
    </>

}
