import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import database from './database/database';

export default function App() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    database.createTable();
    database.loadItems(setItems);
  }, []);

  const addItem = () => {
    database.addItem(text, setText, () => database.loadItems(setItems));
  };

  return (
    <View style={{ backgroundColor: "#b0a18f", flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Lista de elementos</Text>

        <View style={styles.listContainer}>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Text style={styles.item}> - {item.name}</Text>}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ingrese un elemento"
            value={text}
            onChangeText={setText}
          />
          <Button title="Agregar" onPress={addItem} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: "40%",
    padding: 30,
    backgroundColor: '#dfcdb4',
    borderRadius: 20,
    alignSelf: "center",
    marginTop: "30%"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    alignSelf: "center"
  },
  listContainer: {
    flex: 1,
    width: "100%",
  },
  item: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    marginRight: 8,
    paddingHorizontal: 8,
    borderWidth: 0.3,
    borderRadius: 8,
  },
});