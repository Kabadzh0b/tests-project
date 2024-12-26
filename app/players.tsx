import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Modal,
} from "react-native";
import {
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";

const headerMetrics = ["Deposit", "Withdraw", "Summary"];
// const playerData = [
//   { id: "1", name: "Player 1", metrics: [100, 50, 150, 200, 300] },
//   { id: "2", name: "Player 2", metrics: [200, 75, 275, 150, 250] },
//   { id: "3", name: "Player 3", metrics: [150, 60, 210, 100, 180] },
// ];

type Player = {
  id: string;
  name: string;
  deposit: number;
  withdraw: number;
};

const PlayersMetricsTable = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const players: Player[] = JSON.parse(localStorage.getItem("players") || "[]");
  return (
    <ScrollView horizontal style={styles.container}>
      <View style={styles.container}>
        {/* Header Row */}
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

        {/* Players Data */}
        {players.map((player) => (
          <View key={player.id} style={styles.row}>
            {/* Fixed Player Name Column */}
            <View style={[styles.headerCell, styles.playerNameCell]}>
              <Text style={styles.playerNameText}>{player.name}</Text>
            </View>
            {/* Player Metrics */}
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
            <Pressable
              style={styles.headerCell}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.metricText}>Edit</Text>
            </Pressable>
          </View>
        ))}
      </View>
      <Modal visible={modalVisible} transparent animationType="slide">
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
              gap: 30,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Edit Player
            </Text>
            <View style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                Player Name
              </Text>
              <TextInput
                style={{ fontSize: 16, fontWeight: "bold" }}
                placeholder="Enter player name"
              />
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
              >
                <Text
                  style={{ color: "#fff", fontSize: 16 }}
                  onPress={() => setModalVisible(false)}
                >
                  Cancel
                </Text>
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
});

export default PlayersMetricsTable;
