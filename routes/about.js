
const text = `<img src="/assets/img/about.jpg" style="width:100%" alt="about"><br><br>Events. The site is a platform for
placing custom events. They can be generated from the control panel, and user
can customize the number of fields he needs and format their output on the page
<br><br>
Users can subscribe for events, comment them, mark details. Each event has its countdown, also it has the built-in Google Map to display the location with the description. To view the event, user needs to become a guest by specifying his name and optionally selecting an avatar. Guests are not fixed at the site and can only view events. As soon as a guest subscribes for at least one event, he becomes a site member with his (newly created) profile. Signed users receive email notifications about the event they subscribed: about new comments or new subscribers.
<br><br>
You can enter from any other browser and specify Email to restore the member’s account on the site. When you delete a profile, all comments and subscriptions are canceled. Site members have a public profiles that contain information about their activity on the site: the number of subscriptions, the number of their comments, the date of registration.
`;

module.exports = function (req, res) {
	res.render('about', { title: 'Events. Easy service to share your events', message: 'About project', text:text})
}
