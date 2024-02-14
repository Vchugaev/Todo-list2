import React, { useState } from "react";
import Main from "./Main";
import Aside from './Aside'
import './assets/style/style.css'


export default function App() {

  const [display, setDisplay] = useState(true)
  const [aside, setAside] = useState(true)

  return <div className="wrapper">
    <Aside display={display} setDisplay={setDisplay} aside={aside} setAside={setAside}/>
    <Main display={display} setDisplay={setDisplay} aside={aside} setAside={setAside}/>
  </div>
}
