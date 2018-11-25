import React from 'react';
import renderer from "react-test-renderer";
import {shallow} from "enzyme";

import MainContainer from './MainContainer';

it("renders MainContainer snapshot correctly", () => {

    const tree = renderer
        .create(<MainContainer userName="xxxx"/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it("onLogoutClick called on logout click", () => {
    const props = {
        onLogoutClick: jest.fn(),
        userName:"xxxx"
    };
    const wrapper = shallow(<MainContainer {...props}/>);

    let logoutButton = wrapper.find("button");
    const fakeEvent = {
        preventDefault: () => console.log('preventDefault')
    };
    logoutButton.simulate('click', fakeEvent)

    expect(props.onLogoutClick).toHaveBeenCalled();

});

it('MainContainer state check when onSelectUserForChat called', () => {

    const wrapper = shallow(<MainContainer/>);
    expect(wrapper.state('selectedUserForChat')).toEqual('');
    const instance = wrapper.instance();
    instance.onSelectUserForChat('AAAA');
    expect(wrapper.state('selectedUserForChat')).toEqual('AAAA');
});

it('MainContainer state check when _onPrivateMessage called', () => {
    const message = {
        to: 'xxxx',
        from: 'yyyy',
        message: "Hi there",
        timeStamp: 0
    }
 
    const wrapper = shallow(<MainContainer userName={message.to} />);
    expect(wrapper.state('chatHistory')[message.from]).toBeUndefined();
 
    const instance = wrapper.instance();
    instance._onPrivateMessage(message);
 
    const chatHistory = wrapper.state('chatHistory');
    const userChat = chatHistory[message.from][0];
    expect(userChat).toBeDefined();
    expect(userChat.to).toEqual(message.to);
    expect(userChat.from).toEqual(message.from);
    expect(userChat.message).toEqual(message.message);
    expect(userChat.timeStamp).toEqual(message.timeStamp);

});

it('MainContainer state check when updateCurrentChat called', () => {
 
    const message = {
        to: 'zzzz',
        from: 'xxxx',
        message: "Hi xxxx, whats up?",
        timeStamp: 0
    }  
    const wrapper = shallow(<MainContainer userName={message.from} />);
    
    expect(wrapper.state('chatHistory')[message.to]).toBeUndefined();
    
    const instance = wrapper.instance();
    instance.updateCurrentChat(message);

    const chatHistory = wrapper.state('chatHistory');
    const userChat = chatHistory[message.to][0];
    expect(userChat).toBeDefined();
    expect(userChat.to).toEqual(message.to);
    expect(userChat.from).toEqual(message.from);
    expect(userChat.message).toEqual(message.message);
    expect(userChat.timeStamp).toEqual(message.timeStamp);

});

it('MainContainer state check when _updateMsgInChatHistory called', () => {
 
    const outGoingMessage = {
        to: 'zzzz',
        from: 'xxxx',
        message: "Hi zzzz, whats up?",
        timeStamp: 0
    }
    
    const wrapper = shallow(<MainContainer userName={outGoingMessage.from} />);
    
    expect(wrapper.state('chatHistory')[outGoingMessage.to]).toBeUndefined();
    
    const instance = wrapper.instance();
    instance._updateMsgInChatHistory(outGoingMessage.to, outGoingMessage, false);

    const chatHistory = wrapper.state('chatHistory');
    const userChat = chatHistory[outGoingMessage.to][0];
    expect(userChat).toBeDefined();
    expect(userChat.to).toEqual(outGoingMessage.to);
    expect(userChat.from).toEqual(outGoingMessage.from);
    expect(userChat.message).toEqual(outGoingMessage.message);
    expect(userChat.timeStamp).toEqual(outGoingMessage.timeStamp);
    
    expect(wrapper.state('notifyUserChat')).toEqual('');

    
    const incomingMessage = {
        to: 'xxxx',
        from: 'zzzz',
        message: "Hi xxxx, whats up?",
        timeStamp: 0
    }

    instance._updateMsgInChatHistory(incomingMessage.from, incomingMessage, true);

    const newChatHistory = wrapper.state('chatHistory');
    const newUserChat = newChatHistory[incomingMessage.from][1];
    expect(newUserChat).toBeDefined();
    expect(newUserChat.to).toEqual(incomingMessage.to);
    expect(newUserChat.from).toEqual(incomingMessage.from);
    expect(newUserChat.message).toEqual(incomingMessage.message);
    expect(newUserChat.timeStamp).toEqual(incomingMessage.timeStamp);
    
    expect(wrapper.state('notifyUserChat')).toEqual(incomingMessage.from);

});