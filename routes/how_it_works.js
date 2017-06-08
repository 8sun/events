
const text = `You can't view the event on the site without becoming a guest. To become a guest, you need to enter your name, select the interface language and upload your avatar (optional). As a guest you get the option to subscribe for events and leave comments. Once you want to subscribe to the event, you will be asked to enter your Email, which will be your identifier on the site. After signing up you instantly become a member of the site and get a public profile that contains information about your activity on the site: the number of subscriptions, the number of your comments, the date of registration. Site will always recognize you whenever you visit it. But if you enter from a different place or browser or cleaned your data in a browser, you will need to sign in. System does not store any passwords, so all you need is just to enter your email specified during registration and receive a letter with a link to the activation. Once you follow it, you're logged in.
 <br><br>
Signed users receive email notifications about the event they subscribed to: about new comments or new subscribers.
 <br><br>
You can delete the profile. But then all comments and subscriptions will be automatically deleted from the site.
 <br><br>
What's next?
 <br><br>
The site version is not yet stable, but we are improving it. In the future, we plan to implement many new features that expand the capabilities of events. The main innovation will touch the separation of events into private and public. We also want to implement detailed statistics for the founders of events. For example, an event for a subscription asks if you will come in black or red for a masquerade. The founder of the event can see how many people will come in black, and how many in red. If most choose black, then for equivalence, the founder can close this option and leave only red.
<br><br>
We will publish innovations in our blog, which we plan to open soon on the site.
 <br><br>
If you have any ideas or want to take part in the project, contact us by mail:
<br>
<a href="mailto:8sun.empire@gmail.com">8sun.empire@gmail.com</a>
`;

module.exports = function (req, res) {
	res.render('about', { title: 'Events. Easy service to share your events', message: 'How it works', text:text})
}
