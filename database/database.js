import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('DesafioSQLite.db');

const createTable = () => {
    db.transaction((tx) => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)',
            [],
            () => console.log('Tabla creada correctamente'),
            (_, error) => console.log('Error al crear la tabla:', error)
        );
    });
};

const loadItems = (setItems) => {
    db.transaction((tx) => {
        tx.executeSql(
            'SELECT * FROM items',
            [],
            (_, { rows }) => {
                const data = rows._array.map((item) => ({ id: item.id, name: item.name }));
                setItems(data);
            },
            (_, error) => console.log('Error al cargar los elementos:', error)
        );
    });
};

const addItem = (text, setText, loadItems) => {
    if (text.trim() === '') return;

    db.transaction((tx) => {
        tx.executeSql(
            'INSERT INTO items (name) VALUES (?)',
            [text],
            () => {
                console.log('Elemento agregado correctamente');
                setText('');
                loadItems();
            },
            (_, error) => console.log('Error al agregar el elemento:', error)
        );
    });
};

export default {
    createTable,
    loadItems,
    addItem,
};
