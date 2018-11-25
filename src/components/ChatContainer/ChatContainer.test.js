import React from 'react';
import renderer from "react-test-renderer";
import {shallow, mount} from "enzyme";

import ChatContainer from './ChatContainer';
import Message from './../Message/Message'

const props = {
    updateCurrentChat: jest.fn(),
    userName: 'xxxx',
    selectedUserForChat: 'yyyy',
    chatHistory: []
}
const message = {
    to: 'xxxx',
    from: 'yyyy',
    message: "Hi there",
    timeStamp: 0
}

it("renders ChatContainer snapshot correctly", () => {
    const tree = renderer
        .create(<ChatContainer {...props}/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it("ChatContainer updateCurrentChat called on sendMessage", () => {
    const wrapper = shallow(<ChatContainer {...props}/>);
    const instance = wrapper.instance();
    instance.sendMessage(message);

    expect(props.updateCurrentChat).toHaveBeenCalled();
});

it("ChatContainer chatHistory & elements checks", () => {
    const wrapper = mount(<ChatContainer {...props}/>);
    
    let h4 = wrapper.find('h4');
    expect(h4.length).toBe(1);
    expect(h4.contains(props.selectedUserForChat)).toEqual(true);
    
    let messages = wrapper.find(Message);
    expect(messages.length).toBe(0);
    
    wrapper.setProps({chatHistory : [message]})
    messages = wrapper.find(Message);
    expect(messages.length).toBe(1);
});