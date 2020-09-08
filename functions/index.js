require('dotenv').config()
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const serviceAccount = require('./myreCarServiceAccount.json')
const { subYears, isAfter } = require('date-fns')

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
    createCar(carInput: CreateCarInput): String
    updateCar(id: String!, carInput: UpdateCarInput): Boolean
  }

  input CreateCarInput {
    make: String!
    model: String!
    year: String!
    vin: String!
  }

  input UpdateCarInput {
    make: String
    model: String
    year: String
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
    createCar: async (_, args) => {
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
    },
    updateCar: async (_, args) => {
      const { id, carInput } = args
      console.log('got here')
      try {
        // validate year - can't trust client side
        const isValidYear = isAfter(
          new Date(carInput.year),
          subYears(new Date(), 16)
        )
        console.log(carInput)
        // Firestore handles not updating duplicate values if the are the same
        await db
          .collection('cars')
          .doc(id)
          .update({
            ...carInput
          })
        return true
      } catch (err) {
        return false
      }
    }
  }
}

const app = express()
const server = new ApolloServer({ typeDefs, resolvers })
server.applyMiddleware({ app, path: '/', cors: true })

exports.graphql = functions.https.onRequest(app)
