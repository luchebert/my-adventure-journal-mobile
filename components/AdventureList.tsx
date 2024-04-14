import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

interface Adventure {
  _id: string;
  name: string;
  location: string;
}

const AdventuresList = () => {
  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAdventures = async () => {
      try {
        const response = await fetch("http://192.168.1.97:3001/api/adventures");
        const data: Adventure[] = await response.json();
        setAdventures(data);
      } catch (error) {
        console.error("Error fetching adventures:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdventures();
  }, []);

  const handleAdventurePress = (id: string) => {};

  const renderAdventureCard = ({ item }: { item: Adventure }) => {
    return (
      <TouchableOpacity
        onPress={() => handleAdventurePress(item._id)}
        style={styles.adventureCard}
      >
        <View>
          <Text style={styles.adventureName}>{item.name}</Text>
          <Text style={styles.adventureLocation}>{item.location}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={adventures}
          renderItem={renderAdventureCard}
          keyExtractor={(item) => item._id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  adventureCard: {
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  adventureName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  adventureLocation: {
    fontSize: 16,
    color: "#888",
  },
});

export default AdventuresList;
