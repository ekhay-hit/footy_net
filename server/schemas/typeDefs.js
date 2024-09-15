const typeDefs = `
type User{
_id:ID
username:String!
email:String!
}

# all get or read request here
type Query{
getUser(id:ID!):User
}

# all mutation here
type Mutation{
createUser(username:String!, email:String!, password:String!):User
}
`;
module.exports = typeDefs;
