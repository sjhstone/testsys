import 'babel-polyfill';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import EntryPoint from './UiApp';

ReactDOM.render(
    <EntryPoint/>,
    document.getElementById('ui-root')
);
