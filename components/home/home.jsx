import React from 'react';
import ReactDOM from 'react-dom';

import Feed from './feed';
import Modal from './modal';
import { Container, Grid, Image } from 'semantic-ui-react'


class Home extends React.Component {

	render() {

		const el = document.querySelector(".loader");
		el.classList.remove("active");

		return <Container>
    		<Grid padded className="homepage">
    			<Grid.Row>
			      <Grid.Column width={3}>
			        <Image src='/assets/images/wireframe/image.png' />
			      </Grid.Column>
			      <Grid.Column width={10}>
			        <Image src='/assets/images/wireframe/paragraph.png' />
			      </Grid.Column>
			      <Grid.Column width={3}>
			        <Image src='/assets/images/wireframe/image.png' />
			      </Grid.Column>
			    </Grid.Row>

			    <Grid.Row>
			      <Grid.Column computer={10} tablet={8} mobile={16}>
			        <h1>Events: </h1>
			        <Feed />
			      </Grid.Column>
			      <Grid.Column computer={6} tablet={8} mobile={16}>
			        <Modal />
			      </Grid.Column>
			    </Grid.Row>
			  </Grid>
  		</Container>;
	}
}

ReactDOM.render(
	<Home/>,
	document.getElementById('root')
	);