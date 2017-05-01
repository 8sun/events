const Lokka = require('lokka').Lokka;
const Transport = require('lokka-transport-http').Transport;

const client = new Lokka({
	transport: new Transport('/graphql')
});

export default {

	getTranslate(language) {

		return client.query(`
		{
			getTranslate(language:${language})
		}
		`);
	},

	subscribe(event_id, user_id, email, img, name, inTheme) {

		return client.mutate(`
		{
			subscribe(event_id: ${event_id}, user_id: "${user_id}", email: "${email}", img: "${img}", name: "${name}", inTheme: ${inTheme})
		}
		`);
	},

	isSubscribe(event_id, user_id) {

		return client.query(`
		{
			isSubscribe(event_id: ${event_id}, user_id: "${user_id}")
		}
		`);
	},

	getSubscribers(event_id) {

		return client.query(`
		{
			getSubscribers(event_id: ${event_id})
		}
		`);
	},

	removeSubscriber(event_id, user_id) {

		return client.query(`
		{
			removeSubscriber(event_id: ${event_id}, user_id: "${user_id}")
		}
		`);
	},

	removeAllSubscribe(user_id) {

		return client.query(`
		{
			removeAllSubscribe(user_id: "${user_id}")
		}
		`);
	},

	

	getContentEvent(id) {

		return client.query(`
		{
			getContentEvent(id:${id}) {
				error {
					key,
					message,
				},
				id,
				title,
				info,
				snippet,
				text,
				status,
			}
		}
		`);
	},

	getAllEvents() {

		return client.query(`
		{
			getAllEvents {
				error {
					key,
					message,
				},
				id,
				title,
				info,
				snippet,
				text,
				status,
			}
		}
		`);
	},

	writeComment(event_id, user_id, img, name, comment_text) {
		return client.mutate(`
		{
			writeComment(event_id: ${event_id}, user_id: "${user_id}", img: "${img}", name: "${name}", comment_text: "${comment_text}") {
				error {
					key,
					message,
				},
				_id,
				user_id,
				event_id,
				img
				name
				comment_text,
				created,
			}
		}
		`);
	},

	readComments(event_id) {

		return client.query(`
		{
			readComments(event_id: ${event_id}) {
				error {
					key,
					message,
				},
				_id,
				user_id,
				img
				name
				event_id,
				comment_text,
				created,
			}
		}
		`);
	},

	deleteComment(_id) {

		return client.mutate(`
		{
			deleteComment(_id: "${_id}")
		}
		`);
	},
}