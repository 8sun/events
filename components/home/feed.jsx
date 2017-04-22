import React, { Component } from 'react'
import { Feed, Icon } from 'semantic-ui-react'
import Model from '../../models/model';

const model = new Model();

class  FeedExampleBasic extends Component {

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
				<Feed.Event key={item.id.toString()}>
			      <Feed.Label image='/assets/images/avatar/small/joe.jpg' />
			      <Feed.Content>
			        <Feed.Summary>
			          <a href={"/event/" + item.id + "/"}>{item.title}</a> posted on his page
			          <Feed.Date>3 days ago</Feed.Date>
			        </Feed.Summary>
			        <Feed.Extra text>
			          <div dangerouslySetInnerHTML={{__html: item.info}} />
			        </Feed.Extra>
			        <Feed.Meta>
			          <Feed.Like>
			            <Icon name='like' />
			            5 Likes
			          </Feed.Like>
			        </Feed.Meta>
			      </Feed.Content>
			    </Feed.Event>
			);

			this.setState({listEvents: listItems});
			this.forceUpdate();
		}); 
	}

	render() {

		return (
			<Feed>{this.state.listEvents}</Feed>
			)
	}
}

export default FeedExampleBasic
