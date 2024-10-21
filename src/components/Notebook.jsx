import { useState } from 'react'
import styles from './App.module.css'
import { randomId } from '../helpers/random';
import { Tasks } from '../components/Tasks/Tasks';
import { Input } from '../components/Input/input';
export default function Notebook() {
  const [list, setList] = useState('');
  const [arr, setArr] = useState([])
  const [edit, setEdit] = useState(null)
  const [show, setshow] = useState(false)
  const [search, setsearch] = useState('')

  function handleAdd() {
    if (list.trim()) {
      if (edit !== null) {
        let res = arr.map(item => item.id === edit.id ? { ...item, text: list } : item)
        setArr(res)
        setEdit(null)
        setList('')
        setsearch('')
      } else {
        setArr([...arr, { id: randomId(), show: false, text: list },])
        setList('')
      }
    }
  }

  function handleEdit(item) {
    setList(item.text);
    setEdit(item)
  }

  function handleDelite(item) {
    let copy = arr.filter(elem => elem !== item)
    setArr(copy)
  }

  let filtredarr = arr.filter(item => item.text.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <main className={styles.container}>

        <h1>NOTEBOOK</h1>
        <div className={styles.inputs}>
          <Input
            list={list}
            edit={edit}
            setList={setList}
            handleAdd={handleAdd}
            setshow={setshow}
            show={show}
          />
          {show ?
            <input
              className={styles.input}
              placeholder='Поиск'
              value={search}
              onChange={event => setsearch(event.target.value)} />
            : <></>}

        </div>

        {show ?
          <Tasks
            arr={arr}
            search={search}
            filtredarr={filtredarr}
            handleDelite={handleDelite}
            handleEdit={handleEdit}
          /> :
          <></>
        }
      </main>
    </>
  )
}

