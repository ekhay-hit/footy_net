const typeDefs = `#graphql
scalar Date

type User {
_id:ID
username:String!
email:String!
avatar:String
}

type Auth{
token:String
user:User
}

type Game{
gameDate: Date!
startTime: String!
capacity: Int!
endTime: String!
isRecurring:Boolean
players:[User]
userId:ID!
fieldId: Fields!
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
gameByDate(gameDate:Date!): [Game]
}

type Mutation{

createUser(username:String!, email:String!, password:String!):Auth

login(username: String!, password: String!): Auth

createGame(fieldName: String!, gameDate: Date!, startTime: String!, capacity:Int!, endTime: String!, isRecurring:Boolean!) : Game

addField(location: String!, fieldName: String!, image:String!): Fields

removeField(fieldId:ID!): MutationResponse

updateUser(avatar:String!):Auth

# saveUser(user: UserInput!): User
}
`;
module.exports = typeDefs;
