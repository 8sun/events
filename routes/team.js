
const text = `<img src="/assets/img/team.png" style="width:100%" alt="about"><br><br>This project was developed by our team to give users
ability to create, share and participate in various events. Version is not
stable yet but we are on the finish line. We would like to implement more new
features, but the main goal is to make service convenient and fast as
much as possible.
<br><br>
In our project we use Node.js
as server platform, GraphQL as
an API and database MongoDB. Front-end
was made with help of React and MobX. During the work on the project we create several modules, which
will be published on NPM after careful testing. If you want to take part
in the development or you have questions and suggestions, please contact us by
email:
<a href="mailto:8sun.empire@gmail.com">8sun.empire@gmail.com</a>
`;

module.exports = function (req, res) {
	res.render('about', { title: 'Events. Easy service to share your events', message: 'About team', text:text})
}
