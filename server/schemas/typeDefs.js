
const typeDefs = `#graphql
scalar Date

type User {
_id:ID
username:String!
email:String!
}

type Auth{
token:String
user:User
}

type Game{
fieldname: String
gameDate: Date
startTime: String
Capacity: String
endTime: String
}


type Query{
me:User
}

type Mutation{
createUser(username:String!, email:String!, password:String!):Auth
login(username: String!, password: String!): Auth
game(fieldName: String!, gameDate: Date, startTime: String!, capacity: String!, endTime: String!) : Game
}
`;
module.exports = typeDefs;

