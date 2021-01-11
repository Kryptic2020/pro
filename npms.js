//npm install --save passport passport-google-oauth20   //passportStrategy
//npm install --save express
//has to create script //"start": "node index.js" // dont remember why

//npm install --save nodemon //has to create script //"dev": "nodemon index.js"
//npm run dev //run nodemon
//npm i --save cookie-session
//npx create-react-app yourappname
//npm start
//npm i --save concurrently
//"dev": "concurrently \"npm run server\" \"npm run client\""  // run 2 servers together in one command prompt 
//npm install --save mongoose
//npm install http-proxy-middleware (only necessary at dev as in production version backend and frontend is compiled into one unique server/file)
//npm run build //create a (optimazed)production version of react at build folder
//npm i --save redux react-redux react-router-dom
//npm i --save materialize-css // library para css styles
//npm i --save axios
//npm i --save redux-thunk
//https://github.com/azmenak/react-stripe-checkout
//npm i --save react-stripe-checkout
//npm i --save stripe  // works for node backend
//npm i --save body-parser  // works for express node backend as it doesn parse without this library  //  bodyparser is a middleware, all middleware >>> app.use()

//npm run build //to deploy //creating the files to production in build directory 

//"heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"  //script

//git add .
//git commit -m "some description"
//git push heroku master
//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  //API SENDGRID EMAILS

//npm i --save sendgrid //third part emailer

//const survey = {litle: 'my title', subject: 'my subject', recipients: 'thi_suzuki@hotmail.com', body: 'here is the body of email' };
//axios.post('/api/surveys', survey);

//https://rallycoding.herokuapp.com/api/music_albums

//function fetchAlbums() {
//  fetch('https://rallycoding.herokuapp.com/api/music_albums')
//    .then(res => res.json())
//    .then(json => { console.log(json) });
//}

//async function fetchAlbums() {
//  const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums')
//  const json = await res.json();
//  console.log(json);
//}
//<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"> //required form materialize icons to work
//npm i --save redux-form
//npm i --save lodash
//npm i --S bcrypt // hashing password
//npm install passport-local // local authentication 

//npx ngrok http 5000 //replacing localtunel - external api to conect to our localhost
//npm i --save path-parser
//npm install passport-facebook
const fetchAlbums = async () => {
  const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums')
  const json = await res.json();
  console.log(json);
}
//npm install --saver nodemailer
fetchAlbums();

//npm install --saver dotenv
//npm install --saver xoauth2

//npm install random-token
//npm install react-datepicker --save
//npx install-peerdeps react-dates
//npm install --saver bootstrap
//npm install @material-ui/core
//npm install --save material-ui-icons
//npm install @material-ui/icons
//npm install react-datepicker --save



//TO DO LIST:

//remove confirm password -AUTH
//add show/hide password with toggle eye icon -AUTH
//remove FIRST NAME -AUTH
//remove LAST NAME password -AUTH
//add FULL NAME-AUTH


