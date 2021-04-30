import { openDatabase } from 'expo-sqlite';

const db = openDatabase('app.db');

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS user (localId INTEGER PRIMARY KEY NOT NULL, id TEXT NOT NULL, token TEXT NOT NULL, name TEXT NOT NULL, email TEXT NOT NULL);',
                [],
                () => {
                    resolve();
                },
                (_, error) => {
                    reject(error); 
                })
        });
    });

    return promise;
};

export const insertUserDetails = (id, token, name, email) => {  
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO user (id, token, name, email) VALUES (?, ?, ?, ?);',
                [id, token, name, email],
                (_, result) => {
                    resolve(result);
                },
                (_, error) => {
                    reject(error); 
                })
        });
    });
}

export const fetchUserDetails = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM user ORDER BY localId desc LIMIT 1;',
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, error) => {
                    reject(error); 
                })
        });
    });
}

export const removeUserTable = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'DROP TABLE IF EXISTS user;',
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, error) => {
                    reject(error); 
                })
        });
    });
}