import firebase from "firebase"


const firebase_config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_CENTER_ID,
    appId: process.env.REACT_APP_ID,
    databaseURL: process.env.REACT_APP_DATABASE_URL
}

firebase.initializeApp(firebase_config)
const auth = firebase.auth()
let userID = ""


auth.signInAnonymously() //anonymous authentication
  .then(() => {
    console.log('User signed in anonymously');
  })
  .catch(error => {
    if (error.code === 'auth/operation-not-allowed') {
      console.log('Enable anonymous in your firebase console.');
    }

    console.error(error);
  });

auth.onAuthStateChanged((user)=>{
    if (user){
        const date_object = new Date()
        const date = date_object.getDate() + '-' + String(date_object.getMonth()+1) + '-' + date_object.getFullYear()
        const time = date_object.toLocaleTimeString()
        userID = user.uid + '_' + date + '_' + time
    }
    else{
        console.log('user is signed out')
    }
})


const DatabaseActions = (props) => {
    
    const READ_ONCE = 1
    const WRITE_CHOICES = 2

    const readOnce = (sub_db) => {
        if (sub_db === "client_categories"){
            sub_db = "users/" + userID + '/' + sub_db + '/' + String(props.index)
        }
        const dbRef = firebase.database().ref();
        dbRef.child(sub_db).get().then((snapshot) => {
        if (snapshot.exists()) {
            props.getDatabaseData(snapshot.val(), props.index)
        } else {
            console.log("No data available");
        }
        }).catch((error) => {
        console.error(error);
        });

    }


    const writeClientChoises = (sub_db, item) => {
        firebase.database().ref('users/' + userID + '/' + sub_db).set(item);
        
    }

    
    const menu = (action, db) => {
        if (action === READ_ONCE){
            return readOnce(db)
        }
        if (action === WRITE_CHOICES){
            return writeClientChoises(db, props.item)
        }
    }

    return (
        <div>
            {menu(props.action, props.database_name)}
        </div>
    )

}

export default DatabaseActions