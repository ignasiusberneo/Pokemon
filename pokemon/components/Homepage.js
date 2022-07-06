import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Homepage() {
  const navigation = useNavigation();
  const [pokemons, setPokemons] = useState([]);

  const fetchPokemons = async () => {
    try {
      let data = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
      );
      data = await data.json();
      setPokemons(data.results);
    } catch (error) {}

    // fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
    // .then(res => res.json())
    // .then(pokemons => setPokemons(pokemons.results));
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  if (!pokemons) {
    return <ActivityIndicator size={"large"} />;
  }
  return (
    <View>
      <View style={{ alignItems: "center", marginTop: 10 }}>
        <Text style={{ fontSize: 40 }}>PokeDex</Text>
      </View>

      <ScrollView>
        <View style={styles.container}>
          {pokemons.map((pokemon, index) => {
            return (
              <TouchableOpacity
                activeOpacity={0.5}
                key={index}
                style={styles.card}
                onPress={() =>
                  navigation.navigate("DetailPage", {
                    pokemon: pokemon.name,
                  })
                }
              >
                <Image
                  style={{ width: 150, height: 150 }}
                  source={{
                    uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${pokemon.name}.png`,
                  }}
                />
                <Text
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "black",
                    marginBottom: 10,
                  }}
                >
                  {pokemon.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 30,
  },
  card: {
    display: "flex",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: "#F0EBE3",
    borderRadius: 30,
  },
});
