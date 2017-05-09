import React from 'react';
import Content from './content';
import LoginForm from './loginForm';
import { observer } from 'mobx-react';

@observer
class Welcome extends React.Component {

	palm() {
		if (this.props.model.isGuest) {
			return <Content model={this.props.model} />
		} else {
			return <LoginForm model={this.props.model} />;
		}
	}

    render() {
    	const el = document.querySelector(".loader");
		el.classList.remove("active");
		
        return <div className="page">{this.palm()}</div>;
    }
}

export default Welcome;