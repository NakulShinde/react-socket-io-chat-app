import React, {Component} from 'react';

import {subscribeToUserListUpdate} from './../../ConnectSocket/MainSocket'

import styles from './ChatList.module.scss'

class ChatList extends Component {

    constructor() {
        super();
        this.state = {
            onlineUserList: []
        }
        this._onUserListUpdate = this
            ._onUserListUpdate
            .bind(this);
        this.onUserClick = this
            .onUserClick
            .bind(this)
        subscribeToUserListUpdate(this._onUserListUpdate)
    }

    _onUserListUpdate(newUserList) {
        this.setState({
            onlineUserList: [...newUserList]
        })
    }

    onUserClick(userName) {
        this
            .props
            .onSelectUserForChat(userName)
    }

    render() {
        let {onlineUserList} = this.state;

        onlineUserList = onlineUserList.filter((user) => {
            return user !== this.props.userName;
        })

        return (
            <div className={styles.chat__list}>
                <h4 className={styles.header}>Chat List</h4>
                <ul>
                    {onlineUserList.map((chat, index) => {
                        return <li
                            key={index}
                            className={(onlineUserList[index] === this.props.selectedUserForChat)
                            ? styles.active
                            : ''}
                            onClick={() => this.onUserClick(onlineUserList[index])}>
                            {onlineUserList[index]}
                        </li>
                    })}
                    {(onlineUserList.length === 0) && <li>No user to chat</li>}
                </ul>
            </div>
        )
    }
}

export default ChatList;