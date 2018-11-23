import React, {Component} from 'react';

import {subscribeToUserListUpdate} from './../../ConnectSocket/MainSocket'

import styles from './ChatList.module.scss'

class ChatList extends Component {

    constructor() {
        super();
        this.state = {
            onlineUserList: [],
            searchText: ''
        }
        this._onUserListUpdate = this
            ._onUserListUpdate
            .bind(this);
        this.onUserClick = this
            .onUserClick
            .bind(this);
        this._onChangeSearch = this
            ._onChangeSearch
            .bind(this);

        subscribeToUserListUpdate(this._onUserListUpdate)
    }

    _onUserListUpdate(newUserList) {
        this.setState({
            onlineUserList: [...newUserList]
        })
    }
    _onChangeSearch(e) {
        this.setState({searchText: e.target.value})
    }

    onUserClick(userName) {
        this
            .props
            .onSelectUserForChat(userName)
    }

    render() {
        let {onlineUserList, searchText} = this.state;

        onlineUserList = onlineUserList.filter((user) => {
            return (user !== this.props.userName && ((searchText !== '')? user.indexOf(searchText) !== -1 : true));
        })

        return (
            <div className={styles.chat__list}>
                <div className={styles.header}>
                    <input
                        placeholder="Search friend"
                        type="text"
                        onChange={this._onChangeSearch}
                        value={searchText}></input>
                </div>

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