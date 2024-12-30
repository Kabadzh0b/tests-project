import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import GamesTable from "./GamesTable"; // Update this with the actual path

describe("GamesTable Component", () => {
  //   beforeEach(() => {
  //     // Clear localStorage mock before each test
  //     localStorage.clear();
  //   });

  it("renders correctly", () => {
    const { getByText } = render(<GamesTable />);

    expect(getByText("Date")).toBeTruthy();
    expect(getByText("Deposit")).toBeTruthy();
    expect(getByText("Withdraw")).toBeTruthy();
    expect(getByText("Comission")).toBeTruthy();
    expect(getByText("Create new")).toBeTruthy();
  });

  it("opens the modal when 'Create new' button is pressed", () => {
    const { getByText, getByTestId } = render(<GamesTable />);

    const createButton = getByText("Create new");
    fireEvent.press(createButton);

    expect(getByTestId("modal")).toBeTruthy();
  });

  it("closes the modal when 'Cancel' button is pressed", async () => {
    const { getByText, queryByTestId } = render(<GamesTable />);

    const createButton = getByText("Create new");
    fireEvent.press(createButton);

    const cancelButton = getByText("Cancel");
    fireEvent.press(cancelButton);

    await waitFor(() => {
      expect(queryByTestId("modal")).toBeNull();
    });
  });

  it("saves a new game when 'Save' button is pressed", async () => {
    const mockPlayers = [
      { id: "1", name: "Player 1", games: [] },
      { id: "2", name: "Player 2", games: [] },
    ];

    localStorage.setItem("PLAYER_KEY", JSON.stringify(mockPlayers));

    const { getByText, getAllByPlaceholderText, getByTestId } = render(
      <GamesTable />
    );

    const createButton = getByText("Create new");
    fireEvent.press(createButton);

    // Add a player to the modal
    const addPlayerButton = getByText("Add New Player");
    fireEvent.press(addPlayerButton);

    const depositInputs = getAllByPlaceholderText("Enter deposit");
    const withdrawInputs = getAllByPlaceholderText("Enter withdraw");

    fireEvent.changeText(depositInputs[0], "100");
    fireEvent.changeText(withdrawInputs[0], "50");

    const saveButton = getByText("Save");
    fireEvent.press(saveButton);

    await waitFor(() => {
      const savedGames = JSON.parse(localStorage.getItem("GAME_KEY") || "[]");
      expect(savedGames.length).toBe(1);
      expect(savedGames[0].deposit).toBe(100);
      expect(savedGames[0].withdraw).toBe(50);
    });

    expect(getByTestId("modal")).toBeFalsy();
  });

  it("deletes a game when 'Delete' button is pressed", async () => {
    const mockGames = [
      {
        id: "1",
        players: [],
        deposit: 100,
        withdraw: 50,
        comission: 50,
        date: new Date().toISOString(),
      },
    ];

    localStorage.setItem("GAME_KEY", JSON.stringify(mockGames));

    const { getByText } = render(<GamesTable />);

    const deleteButton = getByText("Delete");
    fireEvent.press(deleteButton);

    await waitFor(() => {
      const savedGames = JSON.parse(localStorage.getItem("GAME_KEY") || "[]");
      expect(savedGames.length).toBe(0);
    });
  });
});
