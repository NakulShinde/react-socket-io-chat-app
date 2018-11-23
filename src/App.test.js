import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount} from 'enzyme';
import renderer from "react-test-renderer";

import App from './App';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders header with Chat App heading', () => {
    const wrapper = shallow(<App/>);
    const welcome = "Chat App";
    expect(wrapper.contains(welcome)).toEqual(true);
});

it("renders App snapshot correctly", () => {
    const tree = renderer
        .create(<App/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it('Username input & button event and update state', () => {
    const myWrapper = shallow(<App/>);

    expect(myWrapper.state('userName')).toEqual('');

    myWrapper
        .find('input')
        .simulate('change', {
            target: {
                value: 'some-text-to-check'
            }
        });
    expect(myWrapper.state('userName')).toEqual('some-text-to-check');
})