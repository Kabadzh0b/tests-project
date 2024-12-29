import { Picker } from "@react-native-picker/picker";
import { PLAYER_KEY, GAME_KEY } from "../constants";
import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Modal } from "react-native";
import { Pressable, TextInput } from "react-native-gesture-handler";

const headerMetrics = ["Deposit", "Withdraw", "Summary"];

type Player = {
  id: string;
  name: string;
  deposit: number;
  withdraw: number;
};

type Game = {
  id: string;
  name: string;
  players: Player[];
  description: string;
  comission: number;
};

const GamesTable = () => {
  const [modalVisible, setModalVisible] = useState<boolean | string>(false);
  const fetchedPlayers: Player[] = JSON.parse(
    localStorage.getItem(PLAYER_KEY) || "[]"
  );

  const fetchedGames: Game[] = JSON.parse(
    localStorage.getItem(GAME_KEY) || "[]"
  );

  // state for rerendering the table
  const [players, setPlayers] = useState<Player[]>(fetchedPlayers);
  const [playerNameValue, setPlayerNameValue] = useState<string>("");

  const [enteredPlayers, setEnteredPlayers] = useState<Player[]>([...players]);

  const handleSaveGame = () => {
    if (modalVisible === true) {
      const newPlayer = {
        id: new Date().getTime().toString(),
        name: playerNameValue,
        deposit: 0,
        withdraw: 0,
      };
      localStorage.setItem(PLAYER_KEY, JSON.stringify([...players, newPlayer]));
      setPlayers([...players, newPlayer]);
      setModalVisible(false);
      return;
    }

    const newPlayers = players.map((p) => {
      if (p.id === modalVisible) {
        return { ...p, name: playerNameValue };
      }
      return p;
    });
    localStorage.setItem(PLAYER_KEY, JSON.stringify(newPlayers));
    setPlayers(newPlayers);
    setModalVisible(false);
  };

  const handleDeleteGame = (playerId: string) => {
    const newPlayers = players.filter((p) => p.id !== playerId);
    localStorage.setItem(PLAYER_KEY, JSON.stringify(newPlayers));
    setPlayers(newPlayers);
    setModalVisible(false);
  };

  return (
    <ScrollView horizontal style={styles.container}>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={[styles.headerCell, styles.headerCell]}>
            <Text style={styles.headerText}>Player Name</Text>
          </View>
          {headerMetrics.map((metric, index) => (
            <View key={index} style={styles.headerCell}>
              <Text style={styles.headerText}>{metric}</Text>
            </View>
          ))}
          <Pressable
            style={[
              styles.headerCell,
              {
                backgroundColor: "#99FF99",
              },
            ]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.headerText}>Create new</Text>
          </Pressable>
        </View>

        {players.map((player) => (
          <View key={player.id} style={styles.row}>
            <View style={[styles.headerCell, styles.playerNameCell]}>
              <Text style={styles.playerNameText}>{player.name}</Text>
            </View>
            <View style={styles.metricCell}>
              <Text style={styles.metricText}>{player.deposit}</Text>
            </View>
            <View style={styles.metricCell}>
              <Text style={styles.metricText}>{player.withdraw}</Text>
            </View>
            <View style={styles.metricCell}>
              <Text style={styles.metricText}>
                {player.withdraw - player.deposit}
              </Text>
            </View>
            <View
              style={[
                styles.headerCell,
                { display: "flex", flexDirection: "row", gap: 10 },
              ]}
            >
              <Pressable
                style={[
                  styles.button,
                  {
                    backgroundColor: "#fff",
                  },
                ]}
                onPress={() => setModalVisible(player.id)}
              >
                <Text style={styles.metricText}>Edit</Text>
              </Pressable>
              <Pressable
                style={[styles.button, { backgroundColor: "#FF5555" }]}
                onPress={() => handleDeleteGame(player.id)}
              >
                <Text style={styles.metricText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>
      <Modal visible={!!modalVisible} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              padding: 20,
              backgroundColor: "#fff",
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {modalVisible === true ? "Create New" : "Edit"} Game
            </Text>
            <View style={styles.row}>
              <View style={[styles.headerCell, styles.headerCell]}>
                <Text style={styles.headerText}>Player Name</Text>
              </View>
              <View style={styles.metricCell}>
                <Text style={styles.metricText}>Deposit</Text>
              </View>
              <View style={styles.metricCell}>
                <Text style={styles.metricText}>Withdraw</Text>
              </View>
              <View style={styles.metricCell}>
                <Text style={styles.metricText}>Total</Text>
              </View>
            </View>
            {enteredPlayers.map((player) => (
              <View key={player.id} style={styles.row}>
                <View style={[styles.headerCell, styles.playerNameCell]}>
                  <Picker
                    style={styles.playerNameText}
                    selectedValue={player.name}
                    onValueChange={(itemValue) => {
                      setEnteredPlayers(
                        enteredPlayers.map((p) =>
                          p.id === player.id ? { ...p, name: itemValue } : p
                        )
                      );
                    }}
                  >
                    {players.map((p) => (
                      <Picker.Item key={p.id} label={p.name} value={p.name} />
                    ))}
                  </Picker>
                </View>
                <View style={styles.metricCell}>
                  <TextInput
                    value={String(player.deposit)}
                    onChangeText={(text) => {
                      const isValid = text.match(/^\d+$/) !== null;
                      if (!isValid) {
                        return;
                      }
                      setEnteredPlayers(
                        enteredPlayers.map((p) =>
                          p.id === player.id
                            ? { ...p, deposit: Number(text) }
                            : p
                        )
                      );
                    }}
                    style={styles.metricText}
                    placeholder="Enter deposit"
                  />
                </View>
                <View style={styles.metricCell}>
                  <TextInput
                    value={String(player.withdraw)}
                    onChangeText={(text) => {
                      const isValid = text.match(/^\d+$/) !== null;
                      if (!isValid) {
                        return;
                      }
                      setEnteredPlayers(
                        enteredPlayers.map((p) =>
                          p.id === player.id
                            ? { ...p, withdraw: Number(text) }
                            : p
                        )
                      );
                    }}
                    style={styles.metricText}
                    placeholder="Enter withdraw"
                  />
                </View>
                <View style={styles.metricCell}>
                  <Text style={styles.metricText}>
                    {player.withdraw - player.deposit}
                  </Text>
                </View>
              </View>
            ))}
            <View style={styles.row}>
              <View style={[styles.headerCell, styles.headerCell]}>
                <Text style={styles.headerText}>Total:</Text>
              </View>
              <View style={styles.metricCell}>
                <Text style={styles.metricText}>
                  {enteredPlayers
                    .map((p) => p.deposit)
                    .reduce((a, b) => a + b, 0)}
                </Text>
              </View>
              <View style={styles.metricCell}>
                <Text style={styles.metricText}>
                  {enteredPlayers
                    .map((p) => p.withdraw)
                    .reduce((a, b) => a + b, 0)}
                </Text>
              </View>
              <View style={styles.metricCell}>
                <Text style={styles.metricText}></Text>
              </View>
            </View>
            {/* // TODO: make a helper functions */}
            <View style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                Game deposit:{" "}
                {enteredPlayers
                  .map((p) => p.deposit)
                  .reduce((a, b) => a + b, 0)}
              </Text>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                Game withdraw:{" "}
                {enteredPlayers
                  .map((p) => p.withdraw)
                  .reduce((a, b) => a + b, 0)}
              </Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
              <Pressable
                style={{
                  backgroundColor: "#000",
                  padding: 10,
                  borderRadius: 5,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={handleSaveGame}
              >
                <Text style={{ color: "#fff", fontSize: 16 }}>Save</Text>
              </Pressable>
              <Pressable
                style={{
                  backgroundColor: "#000",
                  padding: 10,
                  borderRadius: 5,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: "#fff", fontSize: 16 }}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  headerCell: {
    flex: 1,
    minWidth: 100,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#dcdcdc",
    borderRightWidth: 1,
    borderRightColor: "#ccc",
  },
  playerNameCell: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  metricCell: {
    flex: 1,
    minWidth: 100,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: "#ccc",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerText: {
    fontWeight: "bold",
  },
  playerNameText: {
    fontWeight: "bold",
  },
  metricText: {
    textAlign: "center",
  },
  button: {
    borderRadius: 5,
    padding: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#000",
    borderWidth: 1,
    flex: 1,
  },
});

export default GamesTable;
