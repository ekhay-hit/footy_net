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
_id: ID!
location: String!
fieldName: String!
image:String!
userId: ID!
}

#This mutation will be used to store resoponse of other mutation like delete and update
#so it will return a result of success true or false and customize message
type MutationResponse{
success: Boolean!
message: String
}


# all get or read request here
type Query{
me:User
fieldsByUser:[Fields!]!
}

# all mutation here
type Mutation{

createUser(username:String!, email:String!, password:String!):Auth

login(username: String!, password: String!): Auth

addField(location: String!, fieldName: String!, image:String!): Fields

removeField(fieldId:ID!): MutationResponse


# saveUser(user: UserInput!): User
}
`;
module.exports = typeDefs;
