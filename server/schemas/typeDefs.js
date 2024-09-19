const typeDefs = `
type User {
_id:ID
username:String!
email:String!
}

type Auth{
token:String
user:User
}

type Fields {
_id: ID
location: String
fieldName: String
// created_at: Date
games: Game
}

# all get or read request here
type Query{
me:User
}

# all mutation here
type Mutation{
createUser(username:String!, email:String!, password:String!):Auth
login(username: String!, password: String!): Auth
}
`;
module.exports = typeDefs;
