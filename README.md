# myre-car

A repository for consideration to HyreCar.

## Requirements

High Level - Create your own single page web application that allows users to perform queries and commands to cars that they own using React as your frontend and Graphql/Node.js as your backend.

Details:

1. Use apollo server for backend
2. Use react for front end
3. No need for a persistence layer
4. Implement error handling
5. Be creative
6. Form validation
7. Likes: material-ui, hooks, apollo client

## Acknowledgements

1. This is not “Done”
   - Definition of Done for this was enough to start a conversation
2. Step 0 - I didn’t validate requirements
   - Usually this needs to be buttoned down prior to touching code
   - Conversations save money
3. Things I would work on
   - Responsive design
   - More CSS reuse (theming)
   - Break out components more
   - Expand on validation
   - Consistency
     - I use a lot of different methods in here, to start a conversation, not to declare what is “right” or “wrong”
   - State management - getting REAALLLY close
   - More branches - I don’t ever commit directly to dev
     - Break out by features - prs
   - CICD - manual deployments are scary
   - TESTS

## Project overview

For this project, I leveraged [Firebase](https://firebase.google.com/) to create a fully serverless demo. I've used it for dozens of POCs to get things up and running quickly and because it seemed like a good opportunity to poke around an see what's changed since I last touched it.

This project uses [Cloud Functions for Firebase](https://firebase.google.com/docs/functions), for the apollo server and [Cloud Firestore](https://firebase.google.com/docs/firestore) for a NoSQL database. I also configured the frontend to be hosted using [Firebase Hosting](https://firebase.google.com/docs/hosting).

Getting started:

1. Either request a key temporary service key, or create your own firebase project and setup your local development environments using the following guides.

- getting started with [functions](https://firebase.google.com/docs/functions/get-started)
- getting started with [firestore](https://firebase.google.com/docs/firestore/quickstart)
- getting started with [hosting](https://firebase.google.com/docs/hosting/deploying)

## Concurrent local development

This project utilizes [concurrently](https://www.npmjs.com/package/concurrently) to facilitate local testing

1. In BOTH directories install packages using `yarn`
2. Navigate to `./frontend` and run `yarn all`

By running yarn all you will concurrently run the react app and the apollo server using the following command: "all": "concurrently \"cd ../functions&& yarn serve\" \"yarn start\""

## Apollo Server

You can run the server locally using [firebase functions local emulator suite](https://firebase.google.com/docs/emulator-suite)

1. Navigate to `./functions`
2. Install using `yarn`
3. Ensure you have an active service key labeled as `./functions/myreCarServiceAccount.json` this is needed to interact with the db
4. Start the local server `yarn serve`
5. Open up the gql playground at `http://localhost:5001/{your-project-name}/graphql`

## Frontend

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

1. Navigate to `./frontend`
2. Install using `yarn`
3. Run the app in development mode `yarn start`

# Questions

1. What’s a typical - what are the big projects coming up?
2. What’s the lifecycle - higher ups -> management -> designers? -> pms? -> testers -> support staff?
3. How are developers evaluated
4. How long has your team been together
5. Am I here as a replacement? Or is this to accommodate growth
6. Given what you know about me and my skillset, where do see gaps in what I would be doing.
7. What are potential barriers that I may face?
8. Confirm my location
