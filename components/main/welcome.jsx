import React from 'react';
import Content from './content';
import LoginForm from './loginForm';
import { observer } from 'mobx-react';

@observer
class Welcome extends React.Component {

	palm() {
		if (this.props.Model.isEnter) {
			return <Content Model={this.props.Model} />
		} else {
			return <LoginForm Model={this.props.Model} />;
		}
	}

    render() {
        return <div className="page">{this.palm()}</div>;
    }
}

export default Welcome;