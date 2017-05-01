import client from '../client/client';

import { observable } from 'mobx';

class Model {

	getAllEvents() {
		return client.getAllEvents();
	}
}

export default Model;
