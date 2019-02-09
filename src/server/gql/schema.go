package gql

const Schema = `schema {
	subscription: Subscription
	mutation: Mutation
	query: Query
}
type Query {
	hello: String!
}
type Subscription {
	helloSaid(): HelloSaidEvent!
}
type Mutation {
	sayHello(msg: String!): HelloSaidEvent!
}
type HelloSaidEvent {
	id: String!
	msg: String!
}`
