import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";

interface Adventure {
  _id: string;
  name: string;
  location: string;
}

interface SingleAdventureProps {
  route: {
    params: {
      adventureId: string;
    };
  };
}

const SingleAdventure = ({ route }: SingleAdventureProps) => {
  const [adventure, setAdventure] = useState<Adventure | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAdventure = async () => {
      const { adventureId } = route.params;
      try {
        const response = await fetch(
          `http://192.168.1.97:3001/api/adventures/${adventureId}`
        );
        const data: Adventure = await response.json();
        setAdventure(data);
      } catch (error) {
        console.error("Error fetching adventure:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdventure();
  }, [route.params]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!adventure) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Adventure not found</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{adventure.name}</Text>
      <Text>{adventure.location}</Text>
    </View>
  );
};

export default SingleAdventure;
