import React, { useEffect, useState } from "react";
import headerStyle from './assets/style/header.module.css'
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "./store/taskReducer";
import { addSearch } from "./store/searchReducer";
import tasksReducer from './store'
import searchReducer from './store'
// import { Theme, Button, DropdownMenu } from '@radix-ui/themes';
// import * as NavigationMenu from '@radix-ui/react-navigation-menu';
// import { CaretDownIcon } from '@radix-ui/react-icons';
// import './Radix/notifications.css'
// import { Accordion } from "@/components/ui/accordion";




export default function Header(props) {




    const dispatch = useDispatch()
    // const [tasks, setTasks] = useState(useSelector(state => state.tasksReducer))
    const [search, setSearch] = useState('')

    useEffect(() => {
        dispatch(addSearch(search));
    }, [search]);







    return <> <header className={headerStyle.header}>
        <div className={headerStyle.main}>
            <div className={headerStyle.dashboard}>
                <img
                    onClick={() => { props.props.setAside(!props.props.aside) }}
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
                <div className={headerStyle.notifications}>
                <img className={headerStyle["notifications--image"]} src={require('./assets/img/notifications.png')} alt="" />
                    
                </div>
                <div className={headerStyle.account}>
                    <div className={headerStyle.name}>
                        <p className={headerStyle["name--text"]}>Papasha</p>
                        <p className={headerStyle["description--text"]}>Oh oh oh oh</p>
                    </div>
                    <div>
                        <img src={require('./assets/img/chel.png')} alt="" />
                    </div>
                </div>
            </div>
        </div>
    </header>
</>

}
