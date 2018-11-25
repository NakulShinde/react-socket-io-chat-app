import React from 'react';
import renderer from "react-test-renderer";

import Message from './Message';

it("renders Message snapshot correctly", () => {

    const message = {
        to: 'aaaa',
        from: 'bbbb',
        message: 'Hi from bbbb!',
        timeStamp: 0
    }

    const tree = renderer
        .create(<Message message={message} userInFrom={true}/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});