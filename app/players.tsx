import React from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const headerMetrics = [
  "Deposit",
  "Withdraw",
  "Summary",
  "Metric 1",
  "Metric 2",
];
const playerData = [
  { id: "1", name: "Player 1", metrics: [100, 50, 150, 200, 300] },
  { id: "2", name: "Player 2", metrics: [200, 75, 275, 150, 250] },
  { id: "3", name: "Player 3", metrics: [150, 60, 210, 100, 180] },
];

const PlayersMetricsTable = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <View>
          {/* Header Row */}
          <View style={styles.row}>
            <View style={[styles.fixedColumn, styles.headerCell]}>
              <Text style={styles.headerText}>Player Name</Text>
            </View>
            {headerMetrics.map((metric, index) => (
              <View key={index} style={styles.headerCell}>
                <Text style={styles.headerText}>{metric}</Text>
              </View>
            ))}
            <View style={[styles.fixedColumn, styles.headerCell]} />
          </View>

          {/* Players Data */}
          <ScrollView>
            {playerData.map((player) => (
              <View key={player.id} style={styles.row}>
                {/* Fixed Player Name Column */}
                <View style={[styles.fixedColumn, styles.playerNameCell]}>
                  <Text style={styles.playerNameText}>{player.name}</Text>
                </View>
                {/* Player Metrics */}
                {player.metrics.map((metric, index) => (
                  <View key={index} style={styles.metricCell}>
                    <Text style={styles.metricText}>{metric}</Text>
                  </View>
                ))}
                <View style={[styles.fixedColumn, styles.metricCell]}>
                  <Text style={styles.metricText}>Edit</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  fixedColumn: {
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    borderRightWidth: 1,
    borderRightColor: "#ccc",
  },
  headerCell: {
    width: 100,
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
    width: 100,
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
