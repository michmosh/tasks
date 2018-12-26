import React from 'react';
import styles from './style.css';

const CounterCard =(props)=> {
    return (
      <div className={styles.card} style={{width:props.width}}>
        <div className={styles.title}>{props.name}</div>
        <span className={styles.horizontalSeperator}></span>
        <div>{props.data}</div>
      </div>
    );
}

export default CounterCard;
