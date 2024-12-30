import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
