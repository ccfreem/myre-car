import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

const uri =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5001/myrecar-f4563/us-central1/graphql'
    : process.env.REACT_APP_GRAPHQL_ENDPOINT

// Could use the more middleware, kept it simple, logging - middleware - header
// setting
const client = new ApolloClient({
  uri,
  cache: new InMemoryCache()
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
