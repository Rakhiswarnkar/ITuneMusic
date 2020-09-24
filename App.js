import React, { useState } from "react";
import Axios from "axios";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  FlatList,
  Image,
} from "react-native";

const Item = ({ item }) => (
  <View style={styles.list}>
    <Image
      style={styles.picture}
      source={{
        uri: item.artworkUrl100,
      }}
    />
    <Text style={{ color: "#9a969a", textAlign: "center" }}>
      {item.artistName}
    </Text>
    <Text style={{ color: "white", textAlign: "center" }}>
      {item.primaryGenreName}
    </Text>
  </View>
);

export default function App() {
  const [searchedText, setSearchedText] = useState("");
  const [iTuneData, setITunedata] = useState(null);

  const handleOnPressSeach = () => {
    Axios.get(`https://itunes.apple.com/search?term=${searchedText}`)
      .then((responseJson) => {
        setITunedata(responseJson.data.results);
        console.log("iTuneData", responseJson.data);
      })
      .catch((error) => {
        console.error(error);
      });
    setSearchedText("");
  };

  const renderItem = ({ item }) => <Item item={item} />;

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            padding: 10,
            backgroundColor: "#fff",
          }}
          onChangeText={(text) => setSearchedText(text)}
          placeholder="Search artist Name"
          value={searchedText}
        />
        <Button title="search" color="#9a969a" onPress={handleOnPressSeach} />
      </View>
      <View>
        {iTuneData ? (
          <FlatList data={iTuneData} renderItem={renderItem} />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282c34",
    alignItems: "center",
    paddingTop: 40,
  },
  picture: {
    height: 100,
    width: 100,
    alignSelf: "center",
  },
  list: {
    margin: 20,
  },
});
