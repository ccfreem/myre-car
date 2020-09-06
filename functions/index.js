const functions = require('firebase-functions')
const admin = require('firebase-admin')
const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const serviceAccount = require('./myreCarServiceAccount.json')
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
// admin.initializeApp()
const db = admin.firestore()

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    getCars(id: Int!): [Car]
  }
  type Mutation {
    createCar(carInput: CarInput): String
  }

  input CarInput {
    make: String
    model: String
    year: String
    VIN: String
  }

  type Car {
    id: String
    make: String
    model: String
    year: String
    VIN: String
  }
`

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    getCars: (parent, args, context, info) => {
      return [
        {
          id: '123213',
          make: 'Fjord',
          model: 'Fiesta',
          year: '1988',
          VIN: '1232131'
        },
        {
          id: '123213',
          make: 'Fjord',
          model: 'Fiesta',
          year: '1988',
          VIN: '1232131'
        },
        {
          id: '123213',
          make: 'Fjord',
          model: 'Fiesta',
          year: '1988',
          VIN: '1232131'
        },
        {
          id: '123213',
          make: 'Fjord',
          model: 'Fiesta',
          year: '1988',
          VIN: '1232131'
        },
        {
          id: '123213',
          make: 'Fjord',
          model: 'Fiesta',
          year: '1988',
          VIN: '1232131'
        },
        {
          id: '123213',
          make: 'Fjord',
          model: 'Fiesta',
          year: '1988',
          VIN: '1232131'
        },
        {
          id: '123213',
          make: 'Fjord',
          model: 'Fiesta',
          year: '1988',
          VIN: '1232131'
        },
        {
          id: '123213',
          make: 'Fjord',
          model: 'Fiesta',
          year: '1988',
          VIN: '1232131'
        },
        {
          id: '123213',
          make: 'Fjord',
          model: 'Fiesta',
          year: '1988',
          VIN: '1232131'
        },
        {
          id: '123213',
          make: 'Fjord',
          model: 'Fiesta',
          year: '1988',
          VIN: '1232131'
        }
      ]
    }
  },
  Mutation: {
    createCar: (parent, args, context, info) => {
      return 'String'
    }
  }
}

// setup Cloud Function
const app = express()
const server = new ApolloServer({ typeDefs, resolvers })
server.applyMiddleware({ app, path: '/', cors: true })

exports.graphql = functions.https.onRequest(app)
