require('dotenv').config()
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const { subYears, isAfter } = require('date-fns')
const { v4: uuidv4 } = require('uuid')
const serviceAccount = require('./myreCarServiceAccount.json')

// If the runtime exists, this is deployed to firebase, so we don't need the key
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
    getCars: async () => {
      // Simply get all the cars in the db
      try {
        const snapShot = await db
          .collection('cars')
          .orderBy('createdAt', 'desc')
          .get()

        // Return the id of the document combined with the data for the car as the
        const cars = snapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        return cars
      } catch (err) {
        throw Error(err)
      }
    },
    checkForVin: async (_, { vin }) => {
      // We want to ensure that we only have one car with the same vin
      try {
        const snapShot = await db
          .collection('cars')
          .where('vin', '==', vin)
          .get()
        const cars = snapShot.docs.map(doc => doc.data())
        // If there are any cars with the same vin, return true
        if (cars.length) {
          return true
        } else {
          return false
        }
      } catch (err) {
        throw Error(err)
      }
    }
  },
  Mutation: {
    createCar: async (_, { carInput }) => {
      try {
        const { make, model, year, vin } = carInput
        // validate year

        // validate year - can't trust client side
        const isValidYear = validateYearInRange(carInput.year)
        if (!isValidYear) throw Error('Invalid!')

        // doublecheck VIN doesnt exist

        // If all validation has succeeded, create the car
        // and return the car's auto-generated id
        const newCar = await db.collection('cars').add({
          make,
          model,
          year,
          vin,
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        })

        return newCar.id
      } catch (err) {
        throw Error(err)
      }
    },
    updateCar: async (_, args) => {
      const { id, carInput } = args
      try {
        // validate year - can't trust client side
        if (carInput.year) {
          const isValidYear = validateYearInRange(carInput.year)
          if (!isValidYear) throw Error('Invalid!')
        }
        // Firestore handles not updating duplicate values if the are the same
        await db
          .collection('cars')
          .doc(id)
          .update({
            ...carInput
          })
        return true
      } catch (err) {
        throw Error(err)
      }
    }
  }
}

const validateYearInRange = year => {
  return isAfter(new Date(year), subYears(new Date(), 16))
}

const app = express()
const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: error => {
    // Implement system logging with all needed information,
    const refId = uuidv4()
    console.error({
      refId,
      ...error
    })
    // Return an error message without potentially sensitive information
    return {
      message: 'Oops something went wrong!',
      refId: 'test'
    }
  }
})
server.applyMiddleware({ app, path: '/', cors: true })

exports.graphql = functions.https.onRequest(app)
