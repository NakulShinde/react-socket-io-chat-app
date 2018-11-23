import React, {Component} from 'react';

import styles from './ChatInput.module.scss'

class ChatInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputMessage: ''
        }
        this._onInputChange = this
            ._onInputChange
            .bind(this)
        this._sendClick = this
            ._sendClick
            .bind(this)
        this._handleKeyPress = this
            ._handleKeyPress
            .bind(this)
    }
    _onInputChange(e) {
        this.setState({inputMessage: e.target.value});
    }
    _sendClick() {
        const {inputMessage} = this.state;
        if (inputMessage.trim() !== '') {
            this
            .props
            .sendMessage(inputMessage);
        }
        this.setState({inputMessage: ''});
    }
    _handleKeyPress(e) {
        if (e.key === 'Enter') {
            this._sendClick();
        }
    }

    render() {
        return (
            <div className={styles.chat__input__container}>
                <textarea
                    rows='2'
                    placeholder="Type a message"
                    onKeyPress={this._handleKeyPress}
                    onChange={this._onInputChange}
                    value={this.state.inputMessage}></textarea>
                <button onClick={this._sendClick}>Send</button>
            </div>
        )
    }
}

export default ChatInput;