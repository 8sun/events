import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './main/welcome';
import Model from '../models/subscribers';

const model = new Model();

ReactDOM.render(
    <Welcome model={model} />,
    document.getElementById('root')
);