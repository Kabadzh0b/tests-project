import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Modal,
  Pressable,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useGameStore } from "../../stores/gameStore";
import { getGame, updatePlayers } from "./GamesTable.utils";
import { styles } from "./GamesTable.styles";
import { GameRow } from "../GameRow/GameRow";
import { GamePlayerInput } from "src/types";
import { usePlayerStore } from "../../stores/playersStore";

const headerMetrics = ["Deposit", "Withdraw", "Comission"];

const GamesTable = () => {
  const [modalVisible, setModalVisible] = useState<boolean | string>(false);
  const [enteredPlayers, setEnteredPlayers] = useState<GamePlayerInput[]>([]);

  const { games, fetchGames, addGame, deleteGame } = useGameStore();

  const { players, setPlayers, fetchPlayers } = usePlayerStore();

  useEffect(() => {
    fetchGames();
    fetchPlayers();
  }, []);

  const handleSaveGame = () => {
    const newGame = getGame(enteredPlayers);
    updatePlayers(players, newGame, setPlayers);
    addGame(newGame);
    setModalVisible(false);
  };

  return (
    <ScrollView horizontal style={styles.container}>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={[styles.headerCell, styles.headerCell]}>
            <Text style={styles.headerText}>Date</Text>
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

        {games.map((game) => (
          <GameRow
            key={game.id}
            game={game}
            setModalVisible={setModalVisible}
            handleDeleteGame={() => deleteGame(game.id)}
          />
        ))}

        <Modal
          visible={!!modalVisible}
          transparent
          animationType="slide"
          testID="modal"
        >
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
                <View key={player.playerId} style={styles.row}>
                  <View style={[styles.headerCell, styles.playerNameCell]}>
                    <Picker
                      style={styles.playerNameText}
                      selectedValue={player.name}
                      onValueChange={(itemValue) => {
                        setEnteredPlayers(
                          enteredPlayers.map((p) =>
                            p.playerId === player.playerId
                              ? { ...p, name: itemValue }
                              : p
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
                      testID="deposit-input"
                      value={String(player.deposit)}
                      onChangeText={(text) => {
                        const isValid = text.match(/^\d+$/) !== null;
                        if (!isValid) {
                          return;
                        }
                        setEnteredPlayers(
                          enteredPlayers.map((p) =>
                            p.playerId === player.playerId
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
                      testID="withdraw-input"
                      value={String(player.withdraw)}
                      onChangeText={(text) => {
                        const isValid = text.match(/^\d+$/) !== null;
                        if (!isValid) {
                          return;
                        }
                        setEnteredPlayers(
                          enteredPlayers.map((p) =>
                            p.playerId === player.playerId
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
              <View style={styles.row}>
                <Pressable
                  style={[styles.button, { width: "100%" }]}
                  onPress={() => {
                    if (players.length <= 0) {
                      return;
                    }
                    setEnteredPlayers([
                      ...enteredPlayers,
                      {
                        playerId: players[0].id,
                        name: players[0].name,
                        deposit: 0,
                        withdraw: 0,
                      },
                    ]);
                  }}
                >
                  <Text style={styles.metricText}>Add New Player</Text>
                </Pressable>
              </View>
              {/* // TODO: make a helper functions */}
              <View
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
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
      </View>
    </ScrollView>
  );
};

export default GamesTable;
