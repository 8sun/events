import React from 'react';
import ReactDOM from 'react-dom';
import Feed from './feed';
import Userline from '../main/userline';
import { Container, Grid, Image } from 'semantic-ui-react';
import UserHome from '../main/userhome'
import Model from '../../models/subscribers';

const model = new Model();

import { observer } from 'mobx-react';

@observer
class Home extends React.Component {

	constructor(props) {
		super(props);
		model.getTranslate();
	}

	render() {

		if (document.querySelector(".preloader")) {
			const el = document.querySelector(".preloader");
			el.remove();
		}

		return <div>
			<Container>
				<h1>Recently events: </h1>
				<Feed />
	  		</Container>
  		</div>;
	}
}

ReactDOM.render(
	<Home/>,
	document.getElementById('root')
);

ReactDOM.render(
    <UserHome model={model} />,
    document.getElementById('userhome')
);
