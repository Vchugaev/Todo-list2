import styles from './Task.module.css'

export function Task({ item, handleEdit, handleDelite }) {
  return (
    <div onClick={() => handleEdit(item)} className={styles.container} key={item.id}>
      <div className={styles.left}>
        <p className={styles.text}>{item.text}</p>
      </div>
      <button className={styles.btnTrash} onClick={() => handleDelite(item)}>
        <svg width="18.000000" height="18.000000" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <desc>
            Created with Pixso.
          </desc>
          <defs>
            <clipPath id="clip409_5">
              <rect id="trash-svgrepo-com 1" rx="-0.500000" width="17.000000" height="17.000000" transform="translate(0.500000 0.500000)" fill="white" fillOpacity="0" />
            </clipPath>
          </defs>
          <rect id="trash-svgrepo-com 1" rx="-0.500000" width="17.000000" height="17.000000" transform="translate(0.500000 0.500000)" fill="#FFFFFF" fillOpacity="0" />
          <g clipPath="url(#clip409_5)">
            <path id="Vector" d="M5.36 6L12.63 6C13.5 6 14.19 6.74 14.12 7.61L13.6 14.36C13.54 15.14 12.89 15.75 12.11 15.75L5.88 15.75C5.1 15.75 4.45 15.14 4.39 14.36L3.87 7.61C3.8 6.74 4.49 6 5.36 6Z" stroke="#CDCDCD" strokeOpacity="1.000000" strokeWidth="1.000000" />
            <path id="Vector" d="M14.62 3.75L3.37 3.75" stroke="#CDCDCD" strokeOpacity="1.000000" strokeWidth="1.000000" strokeLinecap="round" />
            <path id="Vector" d="M8.25 1.5L9.75 1.5C10.16 1.5 10.5 1.83 10.5 2.25L10.5 3.75L7.5 3.75L7.5 2.25C7.5 1.83 7.83 1.5 8.25 1.5Z" stroke="#CDCDCD" strokeOpacity="1.000000" strokeWidth="1.000000" />
            <path id="Vector" d="M10.5 9L10.5 12.75" stroke="#CDCDCD" strokeOpacity="1.000000" strokeWidth="1.000000" strokeLinecap="round" />
            <path id="Vector" d="M7.5 9L7.5 12.75" stroke="#CDCDCD" strokeOpacity="1.000000" strokeWidth="1.000000" strokeLinecap="round" />
          </g>
        </svg>
      </button>
    </div>
  )
}

