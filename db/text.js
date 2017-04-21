var data = [
{},
{
	snippet: `GraphQL is a query language for your API, and a server-side runtime for executing queries by using a type system you define for your data. 
	<br>GraphQL isn't tied to any specific database or storage engine and is instead backed by your existing code and data.
	<br>A GraphQL service is created by defining types and fields on those types, then providing functions for each field on each type. 
	<br>For example, a GraphQL service that tells us who the logged in user is (me) as well as that user's name might look something like this:
	<pre>type Query {
		me: User
	}
	type User {
		id: ID
		name: String
	}</pre>
	`,
	text: `Once a GraphQL service is running (typically at a URL on a web service), it can be sent GraphQL queries to validate and execute. 
	<br>A received query is first checked to ensure it only refers to the types and fields defined, then runs the provided functions to produce a result.`,
},
{
	snippet: `Hello
	my friend
	`,
	text: `Text 222`,
}
];

module.exports = data;