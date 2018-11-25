import React, {Component} from 'react';

import {subscribeToUserListUpdate} from './../../ConnectSocket/MainSocket'

import styles from './ChatList.module.scss'

class ChatList extends Component {

    constructor() {
        super();
        this.state = {
            onlineUserList: [],
            searchText: '',
            newChatCount: {}
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

    componentWillReceiveProps(newProps) {
        if (this.state !== newProps) {
            if (newProps.notifyUserChat && newProps.notifyUserChat !== ''
                && newProps.selectedUserForChat !== newProps.notifyUserChat) {
                this.setState((prev, next) => {
                    let user = prev.newChatCount[newProps.notifyUserChat];
                    let updatedUserChatCount = Object.assign({
                        ...prev.newChatCount
                    }, {
                        [newProps.notifyUserChat]: {
                            chatCount: (user && user.chatCount)
                                ? ++user.chatCount
                                : 1
                        }
                    })
                    return {newChatCount: updatedUserChatCount}
                })
            }
        }
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
        //reset chatCount to 0 on user select
        this.setState((prev, next) => {
            return {newChatCount : Object.assign({}, {...prev.newChatCount}, {[userName]: {chatCount: 0}})}
        })
        //call parent method
        this
            .props
            .onSelectUserForChat(userName)
    }

    render() {
        let {newChatCount, onlineUserList, searchText} = this.state;

        onlineUserList = onlineUserList.filter((user) => {
            return (user !== this.props.userName && ((searchText !== '')
                ? user.indexOf(searchText) !== -1
                : true));
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
                    {onlineUserList.map((user, index) => {
                        return <li
                            key={index}
                            className={(onlineUserList[index] === this.props.selectedUserForChat)
                            ? styles.active
                            : ''}
                            onClick={() => this.onUserClick(onlineUserList[index])}>
                            {onlineUserList[index]}

                            {(newChatCount[onlineUserList[index]] && newChatCount[onlineUserList[index]].chatCount > 0) 
                                && <span className={styles.badge}>{newChatCount[onlineUserList[index]].chatCount}</span>}
                        </li>
                    })}
                    {(onlineUserList.length === 0) && <li>No user to chat</li>}
                </ul>
            </div>
        )
    }
}

export default ChatList;