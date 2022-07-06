import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
} from "react-native";

export default function DetailPage({ navigation, route }) {
  const [pokemon, setPokemon] = useState([]);
  const [color, setColor] = useState('')

  const fetchPokemonDetails = async () => {
    try {
      let data = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${route.params.pokemon}`
      );
      data = await data.json();
      console.log(data, '========');
      setPokemon(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchPokemonDetails();
  }, []);
  return (
    <View style={{ flex: 1, alignItems: "center", backgroundColor: '#F0EBE3'}}>
        <Text style={{ color: "black", fontSize: 40, marginTop: 10 }}>
          {pokemon.name}
        </Text>
        <Image
          style={styles.image}
          source={{
            uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${pokemon.name}.png`,
          }}
        />
        <View style={styles.detail}>
        <Text style={{ fontSize: 35, marginBottom: 10 }}>About</Text>
        <Text style={styles.text}>Height: {pokemon.height}</Text>
        <Text style={styles.text}>Weight: {pokemon.weight}</Text>
        </View>
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 250,
  },
  text: {
    fontSize: 22,
  },
  detail: {
    flex: 1, 
    width: '100%', 
    alignItems: 'center', 
    backgroundColor: '#FFFFFF',
    paddingTop: 15,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  }
});
