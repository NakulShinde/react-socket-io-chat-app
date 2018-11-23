import React, {Component} from 'react';

import MainContainer from './components/MainContainer/MainContainer'

import {
    isSocketActive,
    publishToUserRegister,
    publishToLogout,
    subscribeToDisconnect,
    subscribeToUserRegisterResponse,
    subscribeToErrors
} from "./ConnectSocket/MainSocket";

import styles from './App.module.scss';

class App extends Component {
    constructor() {
        super();
        this.state = {
            userName: '',
            userRegistred: false,
            error: ''
        };
        this._onSubmitUsername = this
            ._onSubmitUsername
            .bind(this)
        this._handleOnchange = this
            ._handleOnchange
            .bind(this)
        this._onUserRegisterResponse = this
            ._onUserRegisterResponse
            .bind(this)
        this._onError = this
            ._onError
            .bind(this);
        this._handleKeyPress = this
            ._handleKeyPress
            .bind(this)
        this.onLogoutClick = this
            .onLogoutClick
            .bind(this)
        subscribeToUserRegisterResponse(this._onUserRegisterResponse);
        subscribeToDisconnect(this.onLogoutClick);
        subscribeToErrors(this._onError)
    }

    _onUserRegisterResponse(data) {
        this.setState({userRegistred: data, error: ''})
    }

    _onError(data) {
        this.setState({error: data});
    }

    _onSubmitUsername() {
        const {userName} = this.state;
        if (userName.trim() !== '') {
            publishToUserRegister({userName: userName});
        }
    }

    _handleOnchange(e) {
        this.setState({userName: e.target.value})
    }

    _handleKeyPress(e) {
        if (e.key === 'Enter') {
            this._onSubmitUsername();
        }
    }
    onLogoutClick() {
        this.setState({userRegistred: false, error: '', userName: ''})
        publishToLogout();
    }

    render() {
        const {userName, userRegistred, error} = this.state;

        return <div className={styles.app}>
            <header className={styles.app__header}>Chat App</header>
            {(!userRegistred || error !== "") && <div className={styles.userName__section}>
                <div className={styles.userName__container}>
                    <input
                        type="text"
                        placeholder="Enter user name"
                        onKeyPress={this._handleKeyPress}
                        onChange={this._handleOnchange}
                        value={userName}/>
                    <button onClick={this._onSubmitUsername}>
                        Submit
                    </button>
                    {error !== "" && <div className={styles.error}>
                        Error : {error}
                    </div>}
                </div>
            </div>}
            {userRegistred && error === "" && <MainContainer onLogoutClick={this.onLogoutClick} userName={userName}/>}
        </div>;
    }
}

export default App;
