import React, { Component } from 'react';

import ChatList from './../ChatList/ChatList'
import ChatContainer from './../ChatContainer/ChatContainer'

import { publishToPrivateMessages, subscribeToPrivateMessages } from './../../ConnectSocket/MainSocket'

import styles from './MainContainer.module.scss'

class MainContainer extends Component {

    constructor() {
        super();
        this.state = {
            selectedUserForChat: '',
            chatHistory: {},
            notifyUserChat: ''
        }
        this.onSelectUserForChat = this
            .onSelectUserForChat
            .bind(this)

        this.updateCurrentChat = this
            .updateCurrentChat
            .bind(this)
        this._onPrivateMessage = this
            ._onPrivateMessage
            .bind(this)
        this._updateMsgInChatHistory = this
            ._updateMsgInChatHistory
            .bind(this)
        this._onLogoutClick = this
            ._onLogoutClick
            .bind(this);
        subscribeToPrivateMessages(this._onPrivateMessage)
    }

    _onPrivateMessage(msgObj) {
        if (msgObj.to === this.props.userName) {
            this._updateMsgInChatHistory(msgObj.from, msgObj, true);
        }
    }

    onSelectUserForChat(user) {
        this.setState({ selectedUserForChat: user })
    }

    _updateMsgInChatHistory(chatWithUser, message, notify = false) {
        const { chatHistory } = this.state;

        let currentUserChat = chatHistory[chatWithUser] || [];
        let newChatHistory = [
            ...currentUserChat,
            message
        ];
        const newStateChatHistory = Object.assign({
            ...chatHistory
        }, { [chatWithUser]: newChatHistory });

        this.setState({ chatHistory: newStateChatHistory, notifyUserChat: (notify)? message.from : '' })
    }

    updateCurrentChat(message) {
        publishToPrivateMessages(message);
        this._updateMsgInChatHistory(message.to, message, false)
    }

    _onLogoutClick() {
        this
            .props
            .onLogoutClick();
    }

    render() {
        const { chatHistory, notifyUserChat, selectedUserForChat } = this.state;
        const { userName } = this.props;
        let chatContent = <div className={styles.empty__chat__details}></div>;

        if (selectedUserForChat !== '') {
            chatContent = <ChatContainer
                userName={userName}
                selectedUserForChat={selectedUserForChat}
                chatHistory={chatHistory[selectedUserForChat] || []}
                updateCurrentChat={this.updateCurrentChat}></ChatContainer>
        }

        return (
            <div className={styles.main__container}>
                <div className={styles.user__container}>
                    <h4>User: {userName}</h4>
                    <button onClick={this._onLogoutClick}>Logout</button>
                </div>

                <div className={styles.messaging__container}>
                    <ChatList
                        selectedUserForChat={selectedUserForChat}
                        onSelectUserForChat={this.onSelectUserForChat}
                        notifyUserChat={notifyUserChat}
                        userName={userName}></ChatList>
                    {chatContent}
                </div>
            </div>
        )
    }
}

export default MainContainer;