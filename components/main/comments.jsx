import React from 'react'
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import timeAgo from "time-ago"
const ta = timeAgo();

let model = {};

class Comments extends React.Component {

	constructor(props) {
		super(props);

		model = this.props.model;

		this.state = {
    		comment: "",
    		comments: null,
    		error: null
  		};

  		this.readComments();
	}

	addComment = e => {
		e.preventDefault();
		const comment = this.state.comment;

		if ((comment.length > 3) && (comment.length < 200)) {
			const data = model.writeComment(encodeURI(comment));
			data.then(() => this.readComments());
			this.setState({comment: "", error: ""});
		} else {
			this.setState({error: "Your comment must be between 3 and 200 characters"});
		}
	}

	handleChange = (e, data) => this.setState({comment: data.value});

	readComments = () => {
		const data = model.readComments();
		data.then(response => {
			this.setState({ comments: response.readComments });
		});
	}

	deleteComment = _id => {
		const data = model.deleteComment(_id);
		data.then(() => {
			this.readComments();
		});
	}

	isAuthor = user_id => user_id == model.user_id ? true : false;

	render() {

		let comments = this.state.comments;
		let error = this.state.error;

		return <Comment.Group>

		    <Header as='h3' dividing>{model.t['comments']}</Header>

		    {comments != null ? comments.map((item, i) =>
		    	(
				    <Comment key={i}>
				      <Comment.Avatar src={item.img != "false" ? item.img : "/assets/images/avatar/small/matthew.png"} />
				      <Comment.Content>
				        <Comment.Author as='a'>{item.name}</Comment.Author>
				        <Comment.Metadata>
				          <div>{ta.ago(new Date(item.created))}</div>
				        </Comment.Metadata>
				        <Comment.Text>{decodeURI(item.comment_text)}</Comment.Text>
				        {this.isAuthor(item.user_id) ?
				        	(
					        <Comment.Actions>
					        <Comment.Action onClick={() => this.deleteComment(item._id)}>{model.t['remove']}</Comment.Action>
					        </Comment.Actions>
					        ) : ''}
				      </Comment.Content>
				    </Comment>
			    )
		    ) : ""}


		    <Form reply onSubmit={this.addComment}>
		      <Form.TextArea value={this.state.comment} onChange={this.handleChange} />
		      <Button content={model.t['add_comment']} labelPosition='left' icon='edit' primary />
		    </Form>
		    {error != null ? error : ''}
	  	</Comment.Group>;
	}
}

export default Comments
