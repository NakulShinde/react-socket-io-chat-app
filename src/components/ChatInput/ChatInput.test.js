import React from 'react';
import renderer from "react-test-renderer";
import {shallow} from "enzyme";

import ChatInput from './ChatInput';

const props = {
    sendMessage: jest.fn()
};
const inputMessage = 'Hi...'
const textInput = 'Hello'

it("renders ChatInput snapshot correctly", () => {
    const tree = renderer
        .create(<ChatInput {...props}/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it("ChatInput sendMessage called on button click", () => {
    const wrapper = shallow(<ChatInput {...props}/>);
    const button = wrapper.find("button")

    const fakeEvent = {
        preventDefault: () => console.log('preventDefault')
    };
    button.simulate('click', fakeEvent);
    expect(props.sendMessage)
        .not
        .toHaveBeenCalled();

    wrapper.setState({inputMessage: inputMessage})

    button.simulate('click', fakeEvent);
    expect(props.sendMessage).toHaveBeenCalled();
    expect(props.sendMessage).toHaveBeenCalledWith(inputMessage);
    expect(wrapper.state('inputMessage')).toEqual('')
});

it("ChatInput textarea check", () => {
    const wrapper = shallow(<ChatInput {...props}/>);

    let textarea = wrapper.find("textarea")
    textarea.simulate('change', {
        target: {
            value: textInput
        }
    });
    expect(wrapper.state('inputMessage')).toEqual(textInput)

    textarea.simulate('keyPress', {key: 'Enter'});

    expect(props.sendMessage).toHaveBeenCalled();
    expect(props.sendMessage).toHaveBeenCalledWith(textInput);
    expect(wrapper.state('inputMessage')).toEqual('')
});