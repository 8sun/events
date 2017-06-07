import React from 'react';
import Content from './content';
import LoginForm from './loginForm';
import { observer } from 'mobx-react';

@observer
class Welcome extends React.Component {

    render() {

			if (document.querySelector(".preloader")) {
				const el = document.querySelector(".preloader");
				el.remove();
			}

      return <div className="page">
				{this.props.model.isGuest ? <Content model={this.props.model} /> : <LoginForm model={this.props.model} />}
			</div>;
    }
}

export default Welcome;
