import { openDatabase } from 'expo-sqlite';

const db = openDatabase('app.db');

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS user (localId INTEGER PRIMARY KEY NOT NULL, id TEXT NOT NULL, token TEXT NOT NULL, fullName TEXT NOT NULL, email TEXT NOT NULL, imageUrl TEXT, maxDistance INTEGER NOT NULL);',
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

export const insertUserDetails = userDetails => {  
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO user (id, token, fullName, email, imageUrl, maxDistance) VALUES (?, ?, ?, ?, ?, ?);',
                [userDetails.id, userDetails.token, userDetails.fullName, userDetails.email, userDetails.imageUrl, userDetails.maxDistance],
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

export const updateImageUrl = imageUrl => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `UPDATE user SET imageUrl = '${imageUrl}' ;`,
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

export const updateMaxDistance = maxDistance => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `UPDATE user SET maxDistance = ${maxDistance} ;`,
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

export const removeUser = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'DELETE from user;',
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