import React from 'react';
import ReactDOM from 'react-dom';

import Feed from './feed';
import Userline from '../main/userline';
import { Container, Grid, Image } from 'semantic-ui-react';
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
			{model.isUser ? (<Userline model={model} />) : ''}
			<Container>
	    		<Grid padded className="homepage">
				    <Grid.Row>
				      <Grid.Column computer={10} tablet={8} mobile={16}>
				        <h1>Events: </h1>
				        <Feed />
				      </Grid.Column>
				      <Grid.Column computer={6} tablet={8} mobile={16}>

				      </Grid.Column>
				    </Grid.Row>
				  </Grid>
	  		</Container>
  		</div>;
	}
}

ReactDOM.render(
	<Home/>,
	document.getElementById('root')
);
