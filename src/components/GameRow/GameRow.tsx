import { Pressable, Text, View } from "react-native";
import { Game } from "src/types";
import { styles } from "../GamesTable/GamesTable.styles";
import dayjs from "dayjs";

export const GameRow = ({
  game,
  setModalVisible,
  handleDeleteGame,
}: {
  game: Game;
  setModalVisible: (value: boolean | string) => void;
  handleDeleteGame: () => void;
}) => {
  return (
    <View key={game.id} style={styles.row}>
      <View style={[styles.headerCell, styles.playerNameCell]}>
        <Text style={styles.playerNameText}>
          {dayjs(game.date).format("DD/MM/YYYY")}
        </Text>
      </View>
      <View style={styles.metricCell}>
        <Text style={styles.metricText}>{game.deposit}</Text>
      </View>
      <View style={styles.metricCell}>
        <Text style={styles.metricText}>{game.withdraw}</Text>
      </View>
      <View style={styles.metricCell}>
        <Text style={styles.metricText}>{game.deposit - game.withdraw}</Text>
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
          onPress={() => setModalVisible(game.id)}
        >
          <Text style={styles.metricText}>Edit</Text>
        </Pressable>
        <Pressable
          testID="delete-game-button"
          style={[styles.button, { backgroundColor: "#FF5555" }]}
          onPress={handleDeleteGame}
        >
          <Text style={styles.metricText}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
};
