import { ApolloLink, split, concat } from 'apollo-link';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import url from '../../_api';

const graphqlHTTP_URI = url.graphql_http();
const graphqlWS_URI = url.graphql_ws();




const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const token = localStorage.getItem('AUTH_TOKEN') || null
  operation.setContext({
    headers: {
      authorization: token,
    }
  });
  return forward(operation);
})

const httpLink = new HttpLink({ 
  uri: graphqlHTTP_URI,
  credentials: 'same-origin' 
});

const wsLink = new WebSocketLink({
  uri: graphqlWS_URI,
  credentials: 'same-origin',
  options: {
    reconnect: true,
    connectionParams: {
      AUTH_TOKEN: localStorage.getItem('AUTH_TOKEN'),
    },
  }
})


// create my middleware using the applyMiddleware method from subscriptions-transport-ws
const subscriptionMiddleware = {
  applyMiddleware (options, next) {
    //console.log(options);
    next();
  }
}
// add the middleware to the web socket link via the Subscription Transport client
wsLink.subscriptionClient.use([subscriptionMiddleware])


const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
)


const client = new ApolloClient({
  link: concat(authMiddleware, link),
  cache: new InMemoryCache(),
  //connectToDevTools: true, #debug for apollo connection
});

export default client;