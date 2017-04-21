import React from 'react';
import InputField from './input';
import Content from './content';
import Avatar from './image';
import { observer } from 'mobx-react';

@observer
class Welcome extends React.Component {

	palm() {
		if (this.props.Model.isEnter) {
			return <Content Model={this.props.Model} />
		} else {
			return <div className="container">
				<div className="row">
					<div className="col-sm-8">
						<h1>Sign in</h1>
						<div className="bg-success">
							<h4>To view the event you just need to fill some fields</h4>
							Please, enter your name, add your photo and choose the language you need
						</div>
			        	<br/>
			        	<Avatar Model={this.props.Model} />
			        	<InputField Model={this.props.Model}/>
	        		</div>
	        		<div className="col-sm-4">
	        			<h3>Some interesting events:</h3>
	        		</div>
	        	</div>
        	</div>;
		}
	}

    render() {
        return <div className="page">{this.palm()}</div>;
    }
}

export default Welcome;