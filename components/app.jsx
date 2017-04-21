import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './main/welcome';
import Model from '../models/model';

const model = new Model();

ReactDOM.render(
    <Welcome Model={model} />,
    document.getElementById('root')
);