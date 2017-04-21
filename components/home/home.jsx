import React from 'react';
import ReactDOM from 'react-dom';
import Model from '../../models/model';

const model = new Model();

class Home extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			listEvents: null
		}

		this.getEvents();
	}

	getEvents = () => {
		model.getAllEvents().then(response => {

			const events = response.getAllEvents;
			const listItems = events.map((item) =>
				<li key={item.id.toString()}>
					<h3>
						<a href={"/event/" + item.id + "/"}>
							{item.title}
						</a>
					</h3>
					<blockquote dangerouslySetInnerHTML={{__html: item.info}} />
				</li>
				);

			this.setState({listEvents: listItems});
			this.forceUpdate();
		}); 
	}

	render() {
		return <div className="container homepage">
			<div className="row">
				<div className="col-sm-8">
				<h1>Events: </h1>
					<ul>
						{this.state.listEvents}
					</ul>
				</div>
				<div className="col-sm-4"></div>
			</div>
		</div>;
	}
}

ReactDOM.render(
	<Home/>,
	document.getElementById('root')
	);