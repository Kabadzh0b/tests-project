import React from "react";
import {
  render,
  fireEvent,
  screen,
  waitFor,
  within,
} from "@testing-library/react-native";
import { PlayersMetricsTable } from "./PlayersMetricTable";
import AsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

describe("PlayersMetricsTable", () => {
  beforeEach(() => {
    AsyncStorage.clear();
  });

  const mockPlayers = [
    { id: "1", name: "Player 1", games: [{ deposit: 120, withdraw: 50 }] },
    { id: "2", name: "Player 2", games: [{ deposit: 200, withdraw: 100 }] },
  ];

  it("renders the table with players and metrics", () => {
    render(<PlayersMetricsTable />);

    expect(screen.getByText("Player 1")).toBeTruthy();
    expect(screen.getByText("Player 2")).toBeTruthy();
    expect(screen.getByText("70")).toBeTruthy(); // Player 1 summary
    expect(screen.getByText("Create new")).toBeTruthy();
  });

  it("opens the modal to create a new player", () => {
    render(<PlayersMetricsTable />);

    fireEvent.press(screen.getByText("Create new"));
    expect(screen.getByText("Create New Player")).toBeTruthy();
  });

  it("adds a new player", () => {
    const setItemMock = jest.spyOn(AsyncStorage, "setItem");

    render(<PlayersMetricsTable />);

    fireEvent.press(screen.getByText("Create new"));
    fireEvent.changeText(
      screen.getByPlaceholderText("Enter player name"),
      "New Player"
    );
    fireEvent.press(screen.getByText("Save"));

    expect(setItemMock).toHaveBeenCalledWith(
      "players",
      expect.stringContaining("New Player")
    );
    expect(screen.getByText("New Player")).toBeTruthy();
  });

  it("opens the modal to edit a player", () => {
    render(<PlayersMetricsTable />);

    fireEvent.press(screen.getByTestId("Player 1-edit-player-button"));
    expect(screen.getByText("Edit Player")).toBeTruthy();
    expect(screen.getByTestId("player-name-input")).toBeTruthy();
  });

  it("edits an existing player", () => {
    const setItemMock = jest.spyOn(AsyncStorage, "setItem");

    render(<PlayersMetricsTable />);

    fireEvent.press(screen.getByTestId("Player 1-edit-player-button"));
    fireEvent.changeText(
      screen.getByTestId("player-name-input"),
      "Updated Player"
    );
    fireEvent.press(screen.getByText("Save"));

    expect(setItemMock).toHaveBeenCalledWith(
      "players",
      expect.stringContaining("Updated Player")
    );
    expect(screen.getByText("Updated Player")).toBeTruthy();
  });

  it("deletes a player", async () => {
    const setItemMock = jest.spyOn(AsyncStorage, "setItem");

    render(<PlayersMetricsTable />);

    await waitFor(() => {
      expect(screen.getByText("Player 1")).toBeTruthy();
    });

    const deleteButton = screen.getByTestId("Player 1-delete-player-button");

    fireEvent.press(deleteButton);
    expect(setItemMock).toHaveBeenCalledWith(
      "players",
      expect.not.stringContaining("Player 1")
    );
    expect(screen.queryByText("Player 1")).toBeNull();
  });

  it("closes the modal when cancel is pressed", () => {
    render(<PlayersMetricsTable />);

    fireEvent.press(screen.getByText("Create new"));
    expect(screen.getByText("Create New Player")).toBeTruthy();

    fireEvent.press(screen.getByText("Cancel"));
    expect(screen.queryByText("Create New Player")).toBeNull();
  });
});
