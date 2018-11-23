import React, {Component} from 'react';

import Message from './../Message/Message'
import ChatInput from './../ChatInput/ChatInput'

import styles from './ChatContainer.module.scss'

class ChatContainer extends Component {

    constructor(props) {
        super(props);
        //create DOM referance
        this.chatDeatilsRef = React.createRef();

        this.sendMessage = this
            .sendMessage
            .bind(this);

        this._scrollChatToBottom = this
            ._scrollChatToBottom
            .bind(this);
    }

    componentDidUpdate() {
        this._scrollChatToBottom();
    }

    sendMessage(message) {
        this
            .props
            .updateCurrentChat({
                to: this.props.selectedUserForChat,
                from: this.props.userName,
                message: message,
                timeStamp: new Date().getTime()
            })
    }

    _scrollChatToBottom() {
        const chatWindow = this.chatDeatilsRef.current
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    render() {
        const {userName, chatHistory} = this.props;
        return (
            <div className={styles.chat__details__container}>
                <h4 className={styles.header}>
                    {this.props.selectedUserForChat}
                </h4>
                <div ref={this.chatDeatilsRef} className={styles.chat__details}>
                    {chatHistory.map((message, index) => {
                        return <Message key={index} userInFrom={(message.from === userName)} message={message}></Message>
                    })}

                </div>
                <ChatInput sendMessage={this.sendMessage}></ChatInput>
            </div>
        )
    }
}

export default ChatContainer;