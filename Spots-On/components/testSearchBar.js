// THIS IS ONLY FOR TESTING AND LOOKING AT CODE
// NOT FOR USE!



import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    // Implement your search logic here, e.g., by filtering data based on searchText.
    // For demonstration purposes, we'll use a static list of items.
    const data = ['Apple', 'Banana', 'Cherry', 'Date', 'Fig', 'Grapes', 'Lemon'];

    const filteredResults = data.filter(item =>
      item.toLowerCase().includes(searchText.toLowerCase())
    );

    setSearchResults(filteredResults);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <Button title="Search" onPress={handleSearch} />
      <Button title="Clear" onPress={() => setSearchText('')} />

      <FlatList
        data={searchResults}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.resultText}>{item}</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    width: 300,
    borderRadius: 50,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(44, 103, 101, .8)',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  resultText: {
    fontSize: 18,
    marginVertical: 5,
  },
});

export default SearchBar;
