import React from 'react';
import renderer from "react-test-renderer";
import {shallow} from "enzyme";

import ChatList from './ChatList';

it("renders ChatList snapshot correctly", () => {
    const props = {
        selectedUserForChat: 'yyyy',
        onSelectUserForChat: jest.fn(),
        notifyUserChat: 'yyyy',
        userName: 'xxxx'
    }
    const tree = renderer
        .create(<ChatList {...props} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it("ChatList onUserClick called on user name click", () => {
    const props = {
        onSelectUserForChat: jest.fn(),
        userName:"xxxx"
    };
    const userList = ['xxxx', 'yyyy'];
    const wrapper = shallow(<ChatList {...props}/>);
    wrapper.setState({onlineUserList : [...userList] });

    let liElements = wrapper.find("li");
    expect(liElements.length).toBe(1);

    const fakeEvent = {
        preventDefault: () => console.log('preventDefault')
    };
    liElements.simulate('click', fakeEvent)

    let newChatCount = wrapper.state('newChatCount');
    
    expect(newChatCount[userList[1]].chatCount).toBe(0);
    expect(props.onSelectUserForChat).toHaveBeenCalled();

});

it("On Search friend list", () => {
    const props = {
        onSelectUserForChat: jest.fn(),
        userName:"xxxx"
    };
    const userList = ['xxxx', 'yyyy', 'aa', 'bb', 'cc', 'dd', 'aabb', 'bbcc'];
    const wrapper = shallow(<ChatList {...props}/>);
    wrapper.setState({onlineUserList : [...userList] });

    let liElements = wrapper.find("li");
    expect(liElements.length).toBe(7);

    let input = wrapper.find("input")
    input.simulate('change', {
        target: {
            value: 'aa'
        }
    });

    liElements = wrapper.find("li");
    expect(liElements.length).toBe(2);
    
    input = wrapper.find("input")
    input.simulate('change', {
        target: {
            value: 'bb'
        }
    });

    liElements = wrapper.find("li");
    expect(liElements.length).toBe(3);
});

it("ChatList _onUserListUpdate called", () => {
    const props = {
        onSelectUserForChat: jest.fn(),
        userName:"xxxx"
    };
    const userList = ['xxxx', 'yyyy', 'aa', 'user1'];
    
    const wrapper = shallow(<ChatList {...props}/>);
    
    const instance = wrapper.instance();
    instance._onUserListUpdate(userList);

    expect(wrapper.state('onlineUserList').length).toBe(4);

});

it("ChatList componentWillReceiveProps called", () => {
    const props = {
        onSelectUserForChat: jest.fn(),
        userName:"xxxx"
    };
    const userList = ['xxxx', 'yyyy', 'aa', 'user1'];

    const wrapper = shallow(<ChatList {...props}/>);
    
    const instance = wrapper.instance();
    instance.componentWillReceiveProps({notifyUserChat: userList[1]});
    
    expect(wrapper.state('newChatCount')[userList[1]].chatCount).toBe(1);
    
    instance.componentWillReceiveProps({notifyUserChat: userList[2]});
    instance.componentWillReceiveProps({notifyUserChat: userList[2]});
    expect(wrapper.state('newChatCount')[userList[2]].chatCount).toBe(2);

});