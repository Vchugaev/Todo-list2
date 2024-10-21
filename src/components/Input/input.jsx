import styles from './Input.module.css'
export function Input({ handleAdd, list, setList, edit, setshow, show }) {
    return (
        <div className={styles.container}>
            <textarea placeholder='Создать новую заметку' className={styles.input} value={list} onChange={event => setList(event.target.value)} />
            <button className="bg-yellow p-2 rounded-xl cursor-pointer" onClick={handleAdd}>{edit ? 'Save' : 'Add'}</button>
            <button className="bg-yellow p-2 rounded-xl cursor-pointer" onClick={() => setshow(!show)}>Menu</button>
        </div>
    )
}