//import { initializeApp } from "firebase/app"
import 'firebase/database'
import { getDatabase, ref, child, get, onValue, set } from "firebase/database";
import admin from 'firebase-admin';
const FIREBASE_APP = admin.initializeApp()

const DatabaseActions = (props) => {
    
    const READ_ONCE = 1
    const READ = 2
    const WRITE_CHOICES = 3
    const WRITE_PREFERENCES = 4

    const readOnce = (sub_db) => {
        const dbRef = ref(getDatabase(FIREBASE_APP));
        get(child(dbRef, `${sub_db}`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
        } else {
            console.log("No data available");
        }
        }).catch((error) => {
        console.error(error);
        });
    }

    const read = (sub_db) => {
        const db = getDatabase(FIREBASE_APP);
        const starCountRef = ref(db, + sub_db);
        onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        });
    }

    const writeClientChoises = (sub_db, item) => {
        const db = getDatabase(FIREBASE_APP);
        set(ref(db, sub_db + '/' + item.id), {
          id: item.id,
          name: item.name,
          rating : item.rating
        });
    }

    const writeOptionPreferences = (sub_db, item) => {
        const db = getDatabase(FIREBASE_APP);
        set(ref(db, sub_db + '/' + item.id), {
            id: item.id,
            cur_match: item.cur_match,
            cur_set: item.cur_set,
            option1: item.option1,
            option2: item.option2,
            attr_chosen: item.attr_chosen,
            reaction_time: item.reaction_time,
            is_equivalent: item.is_equivalent,
        });
    }

    const menu = (action, db) => {
        if (action === READ_ONCE){
            return readOnce(db)
        }
        if (action === READ) {
            return read(db)
        }
        if (action === WRITE_CHOICES){
            return writeClientChoises(db, props.item)
        }
        if (action === WRITE_PREFERENCES){
            return writeOptionPreferences(db, props.item)
        }
    }

    return (
        <div>
            {menu(props.action, props.db)}
        </div>
    )

}

export default DatabaseActions