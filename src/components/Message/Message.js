import React from 'react';

import styles from './Message.module.scss'

const Message = (props) => {
    const customClass = (props.userInFrom)
        ? styles.message__right
        : styles.message__left;
    return (
        <div className={styles.message}>
            <div className={`${styles.message__content} ${customClass}`}>
                <div className={styles.message__username}>{props.message.from}</div>
                {props.message.message}
                <div className={styles.message__datetime}>{new Date(props.message.timeStamp).toLocaleTimeString()}</div>
            </div>
        </div>
    )
}

export default Message;