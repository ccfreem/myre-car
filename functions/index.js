require('dotenv').config()
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const serviceAccount = require('./myreCarServiceAccount.json')
const { subYears, isAfter, isValid } = require('date-fns')
const { is } = require('date-fns/locale')

if (functions.config().runtime) {
  admin.initializeApp()
} else {
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
}
const db = admin.firestore()

// Construct schema, typically this would consist of individual files in a ./schema folder,
// with a file for each business need, but for skim-ability and demo-sake, I figured
// I would save some clicks and keep them here
const typeDefs = gql`
  type Query {
    getCars(id: Int!): [Car]
    checkForVin(vin: String!): Boolean
  }

  type Mutation {
    createCar(carInput: CreateCarInput): String
    updateCar(id: String!, carInput: UpdateCarInput): Boolean
  }

  type Car {
    id: String
    make: String
    model: String
    year: String
    vin: String
  }

  input CreateCarInput {
    make: String!
    model: String!
    year: String!
    vin: String!
  }

  input UpdateCarInput {
    vin: String
    make: String
    model: String
    year: String
  }
`

// The resolvers, same thought as above, should be in its own folder, broken up by
// functionality, but clicks clicks are sacred
const resolvers = {
  Query: {
    getCars: async (parent, args, context, info) => {
      // Simply get all the cars in the db
      try {
        const snapShot = await db.collection('cars').get()
        const cars = []
        snapShot.forEach(doc => cars.push({ id: doc.id, ...doc.data() }))
        return cars
      } catch (err) {
        console.error(err)
      }
    },
    checkForVin: async (_, { vin }) => {
      // We want to ensure that we only have one car with the same vin
      try {
        const snapShot = await db
          .collection('cars')
          .where('vin', '==', vin)
          .get()
        const cars = []
        snapShot.forEach(doc => cars.push(doc.data()))
        // If there are any cars with the same vin, return true
        if (cars.length) {
          return true
        } else {
          return false
        }
      } catch (err) {
        console.error(err)
      }
    }
  },
  Mutation: {
    createCar: async (_, args) => {
      try {
        const { make, model, year, vin } = args.carInput
        // validate year

        // doublecheck VIN doesnt exist

        // If all validation has succeeded, create the car
        // and return the car's auto-generated id
        const newCar = await db.collection('cars').add({
          make,
          model,
          year,
          vin
        })

        return newCar.id
      } catch (err) {
        console.error(err)
      }
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

const checkForValidYear = year => {
  // Probably need to do some date handling per timezone, depending on use case
  const today = new Date()

  if (!isValid(year)) {
    return false
  }

  return isAfter(year, 16)
}
const app = express()
const server = new ApolloServer({ typeDefs, resolvers })
server.applyMiddleware({ app, path: '/', cors: true })

exports.graphql = functions.https.onRequest(app)
