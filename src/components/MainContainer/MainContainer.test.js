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

it("onLogoutClick called on logout click", async() => {
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
    expect(wrapper.state('chatHistory')[message.to]).toBeUndefined();
 
    const instance = wrapper.instance();
    instance._onPrivateMessage(message);
 
    const chatHistory = wrapper.state('chatHistory');
    const userChat = chatHistory[message.from][0];
    expect(userChat).toBeDefined();
    expect(userChat.to).toEqual(message.to);
    expect(userChat.from).toEqual(message.from);
});