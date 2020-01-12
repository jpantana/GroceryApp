# Sweet Carts
A web app that allows you and friends and/or family members to create and share grocery lists.

[Demo](https://groceryapp-794e3.firebaseapp.com/login)

## Installation Instructions
- Clone down this repo
- Navigate to the project root and run `npm install` (be sure to update any necessary packages)
- Create a new project in [Firebase](http://www.firebase.google.com)
  - Initialize the cloned repo to the firebase project (hosting)
  - Enable Google authentication in the firebase auth tab 
- Create a file named `/helpers/data/apiKeys.json` and add your Firebase keys using the `apiKeys.example.json` as a template
- add that file path to the .gitignore file

## How to Run
- In terminal, type `npm run dev`

***Note**: if you want to make a production build of this project, type `npm run build`.  This will create a folder called build with all the minified code you need.*

## How to deploy
- In your terminal, type `npm run build`
