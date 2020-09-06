require('dotenv').config()
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const serviceAccount = require('./myreCarServiceAccount.json')

if (functions.config().runtime) {
  admin.initializeApp()
} else {
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
}
const db = admin.firestore()

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    getCars(id: Int!): [Car]
    checkForVin(vin: String!): Boolean
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
    vin: String
  }
`

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    getCars: async (parent, args, context, info) => {
      const snapShot = await db.collection('cars').get()
      const cars = []
      snapShot.forEach(doc => cars.push({ id: doc.id, ...doc.data() }))
      return cars
    },
    checkForVin: async (_, { vin }) => {
      // We want to ensure that we only have one car with the same vin
      const snapShot = await db.collection('cars').where('vin', '==', vin).get()
      const cars = []
      snapShot.forEach(doc => cars.push(doc.data()))
      // If there are any cars with the same vin, return true
      if (cars.length) {
        return true
      } else {
        return false
      }
    }
  },
  Mutation: {
    createCar: async (parent, args, context, info) => {
      const { make, model, year, VIN } = args.carInput
      // validate year

      // doublecheck VIN doesnt exist

      // If all validation has succeeded, create the car
      // and return the car's auto-generated id
      const newCar = await db.collection('cars').add({
        make: make,
        model: model,
        year: year,
        vin: VIN
      })

      return newCar.id
    }
  }
}

const app = express()
const server = new ApolloServer({ typeDefs, resolvers })
server.applyMiddleware({ app, path: '/', cors: true })

exports.graphql = functions.https.onRequest(app)
