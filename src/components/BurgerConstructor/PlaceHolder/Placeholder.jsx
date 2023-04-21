import React from 'react'
import styles from './Placeholder.module.css'

function Placeholder() {
  return (
    <div className={`${styles.placeholder} text text_type_main-medium`}>Перетащите ингредиент сюда</div>
  )
}

export default Placeholder