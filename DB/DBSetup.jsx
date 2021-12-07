
import * as SQLite from "expo-sqlite";

function openDatabase() {
    if (Platform.OS === "web") {
        return {
            transaction: () => {
                return {
                    executeSql: () => { },
                };
            },
        };
    }

    const db = SQLite.openDatabase("db.db");
    return db;
}

const db = openDatabase();


const addUser = (user) => {

    if (user === null) {
        return false;
    }

    db.transaction(
        (tx) => {
            tx.executeSql("insert into users (name, email, country) values (?, ?, ?)", [user.name, user.email, user.country]);
            tx.executeSql("select * from users", [], (_, { rows }) =>
                console.log(JSON.stringify(rows))
            );
        },
        console.log("error")
    );
}

export default db;