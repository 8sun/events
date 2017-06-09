var db = require('../db/index');
var {event, subscribe, comment} = require('../models/mongo');

var graphqlHTTP = require('express-graphql');
var { buildSchema, GraphQLObjectType, GraphQLString } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Event {
    error: ErrorType,
    id: Int!,
    info: String!,
    title: String!,
    snippet: String,
    text: String,
    status: Boolean!,
    commentsCount: Int,
    subscribersCount: Int,
    start: String,
    icon: String,
  },
  type ErrorType {
    key: String,
    message: String!
  },
  type Comment {
    error: ErrorType,
    _id: String!,
    event_id: Int!,
    user_id: String!,
    img: String!,
    name: String!,
    comment_text: String,
    created: String,
  },
  type Subscribe {
    email: String!,
    event_id: Int!,
    user_id: String!,
    img: String!,
    name: String!,
    inTheme: Boolean!,
    created: String,
    commentsCount: Int,
    subscribeCount: Int,
    firstDate: String,
  },
  type Query {
   getContentEvent(id: Int!): Event
   getTranslate(language: Int): String
   isSubscribe(event_id: Int!, user_id: String!): Boolean
   isUser(user_id: String!): Subscribe
   getSubscribers(event_id: Int!) : [Subscribe]
   removeSubscriber(event_id: Int!, user_id: String!): Boolean
   removeAllSubscribe(user_id: String!): Boolean
   getAllEvents: [Event]
   readComments(event_id: Int!): [Comment]
 },
 type Mutation {
    subscribe(event_id: Int!, user_id: String!, email: String!, img: String, name: String!, inTheme: Boolean): String
    writeComment(event_id: Int!, user_id: String!, img: String, name: String!, comment_text: String!): Comment
    deleteComment(_id: String!): Boolean
  }
 `);

// The root provides a resolver function for each API endpoint
var root = {
  getTranslate: function ({language}) {

    var phrase = db[language];

    return JSON.stringify(db[language]);
  },

  getContentEvent: function ({id}) {

    return event.findOne({id: id}).then(function (res) {
      if(!res) {
        return { error: {key:1, message:"oops"}};
      }
      return res;
    });
  },

  subscribe: function ({event_id, user_id, email, img, name, inTheme}) {

    return subscribe.findOne({
      $and: [
      { 'event_id' : event_id },
      { 'user_id': user_id }
      ]
    }).then(function (res) {
      if(res) {
        return JSON.stringify({ error: "this user_id is exist already"});
      }

      var e = new subscribe({ event_id: event_id, user_id: user_id, email: email, img: img, name: name, inTheme: inTheme, created: Date.now() });
      return e.save().then(function (ok) {
        return JSON.stringify(ok);
      })

    });
  },

  isSubscribe: function ({event_id, user_id}) {

    return subscribe.findOne({
      $and: [
      { 'event_id' : event_id },
      { 'user_id': user_id }
      ]
    }).then(function (res) {
      if(res) {
        return true;
      } else {
        return false;
      }

    });
  },

  isUser: function ({user_id}) {

    return subscribe.findOne({'user_id': user_id}).then(async function (res) {
      if(res) {

        const commentsCount = await comment.count({user_id: user_id}).then(function(count){
          return count;
        });

        const subscribeCount = await subscribe.count({user_id: user_id}).then(function(count){
          return count;
        });

        const firstDate = await subscribe.find({user_id: user_id},{created:1}).limit(1).sort({created:-1}).then(function(result){
          return result[0].created;
        });

        res.commentsCount = commentsCount;
        res.subscribeCount = subscribeCount;
        res.firstDate = firstDate;

        return res;
      }
    });
  },

  getSubscribers({event_id}) {

    return subscribe.find({ event_id : event_id }).then(function (res) {
      if(res) {

        return res.map(async function(item){

          const commentsCount = await comment.count({user_id: item.user_id}).then(function(count){
            return count;
          });

          const subscribeCount = await subscribe.count({user_id: item.user_id}).then(function(count){
            return count;
          });

          const firstDate = await subscribe.find({user_id: item.user_id},{created:1}).limit(1).sort({created:-1}).then(function(result){
            return result[0].created;
          });

          item.commentsCount = commentsCount;
          item.subscribeCount = subscribeCount;
          item.firstDate = firstDate;
          return item;
        });
      }
    });
  },

  removeSubscriber: function ({event_id, user_id}) {

    return subscribe.remove({
      $and: [
      { 'event_id' : event_id },
      { 'user_id': user_id }
      ]
    }).then(function (res) {
      if(res) {
        return true;
      } else {
        return false;
      }

    });
  },

  removeAllSubscribe: function ({user_id}) {

    return subscribe.remove({ user_id: user_id }).then(function (res) {
      return res;
    }).then(function (res) {
      if(res) {
        comment.remove({ user_id: user_id }).then(function (res) {
          return true;
        });
      } else {
        return false;
      }

    });
  },

  getAllEvents: function () {

    // Working code for aggreagation MongoDB
    // return event.aggregate({$limit:3},
    //   {$unwind: "$id"},
    //   {$lookup:{from:"comments", localField:"id", foreignField:"event_id", as: "comment"}},
    //   {$match: {"comments": {$ne: []}} },
    //   {$count: "comment"}).then(function (res) {
    //   if(!res) {
    //     return { error: {key:1, message:"oops"}};
    //   }

    return event.find({},{}).limit(5).sort({id:-1}).then(function (res) {
      if(!res) {
        return { error: {key:1, message:"oops"}};
      }

      return res.map(function(item){
        const commentsCount = comment.count({event_id: item.id}).then(function(count){
          return count;
        });

        const subscribersCount = subscribe.count({event_id: item.id}).then(function(count){
          return count;
        });

        item.commentsCount = commentsCount;
        item.subscribersCount = subscribersCount;
        return item;
      })
    });
  },

  writeComment: function ({event_id, user_id, img, name, comment_text}) {

    var e = new comment({ event_id: event_id, user_id: user_id, img: img, name: name, comment_text: comment_text, created: Date.now() });
    return e.save().then(function (res) {
      if(!res) {
        return { error: {key:1, message:"oops"}};
      }
      return res;
    })

  },

  readComments: function ({event_id}) {

    return comment.find({ event_id : event_id },{},{
        sort:{
          created: 1 //Sort by Date Added DESC
      }
    }).then(function (res) {
      if(!res) {
        return { error: {key:1, message:"oops"}};
      }
      return res;
    });

  },

  deleteComment: function ({_id}) {

    return comment.remove({ _id: _id }).then(function (res) {
      if(res) {
        return true;
      } else {
        return false;
      }

    });
  },

};

// var schema = buildSchema(`
//   type Character {
//     hello: String!
//     we_have_good_news: String!
//   },
//   type Query {
//     getData(language: Int!): Character
//   }
//   `);

// var AddressType = new GraphQLObjectType({
//   name: 'Address',
//   fields: {
//     street: { type: GraphQLString },
//     number: { type: GraphQLInt },
//     formatted: {
//       type: GraphQLString,
//       resolve(obj) {
//         return obj.number + ' ' + obj.street
//       }
//     }
//   }
// });

module.exports = graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
});
