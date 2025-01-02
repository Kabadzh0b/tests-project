import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";
import { PlayersMetricsTable } from "./PlayersMetricTable";

describe("PlayersMetricsTable", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const mockPlayers = [
    { id: "1", name: "Player 1", games: [{ deposit: 100, withdraw: 50 }] },
    { id: "2", name: "Player 2", games: [{ deposit: 200, withdraw: 100 }] },
  ];

  it("renders the table with players and metrics", () => {
    jest
      .spyOn(localStorage, "getItem")
      .mockReturnValue(JSON.stringify(mockPlayers));

    render(<PlayersMetricsTable />);

    expect(screen.getByText("Player 1")).toBeTruthy();
    expect(screen.getByText("Player 2")).toBeTruthy();
    expect(screen.getByText("150")).toBeTruthy(); // Player 1 summary
    expect(screen.getByText("Create new")).toBeTruthy();
  });

  it("opens the modal to create a new player", () => {
    jest.spyOn(localStorage, "getItem").mockReturnValue(JSON.stringify([]));

    render(<PlayersMetricsTable />);

    fireEvent.press(screen.getByText("Create new"));
    expect(screen.getByText("Create New Player")).toBeTruthy();
  });

  it("adds a new player", () => {
    jest.spyOn(localStorage, "getItem").mockReturnValue(JSON.stringify([]));
    const setItemMock = jest.spyOn(localStorage, "setItem");

    render(<PlayersMetricsTable />);

    fireEvent.press(screen.getByText("Create new"));
    fireEvent.changeText(
      screen.getByPlaceholderText("Enter player name"),
      "New Player"
    );
    fireEvent.press(screen.getByText("Save"));

    expect(setItemMock).toHaveBeenCalledWith(
      "PLAYER_KEY",
      expect.stringContaining("New Player")
    );
    expect(screen.getByText("New Player")).toBeTruthy();
  });

  it("opens the modal to edit a player", () => {
    jest
      .spyOn(localStorage, "getItem")
      .mockReturnValue(JSON.stringify(mockPlayers));

    render(<PlayersMetricsTable />);

    fireEvent.press(screen.getByText("Edit"));
    expect(screen.getByText("Edit Player")).toBeTruthy();
    expect(screen.getByDisplayValue("Player 1")).toBeTruthy();
  });

  it("edits an existing player", () => {
    jest
      .spyOn(localStorage, "getItem")
      .mockReturnValue(JSON.stringify(mockPlayers));
    const setItemMock = jest.spyOn(localStorage, "setItem");

    render(<PlayersMetricsTable />);

    fireEvent.press(screen.getByText("Edit"));
    fireEvent.changeText(
      screen.getByDisplayValue("Player 1"),
      "Updated Player"
    );
    fireEvent.press(screen.getByText("Save"));

    expect(setItemMock).toHaveBeenCalledWith(
      "PLAYER_KEY",
      expect.stringContaining("Updated Player")
    );
    expect(screen.getByText("Updated Player")).toBeTruthy();
  });

  it("deletes a player", () => {
    jest
      .spyOn(localStorage, "getItem")
      .mockReturnValue(JSON.stringify(mockPlayers));
    const setItemMock = jest.spyOn(localStorage, "setItem");

    render(<PlayersMetricsTable />);

    fireEvent.press(screen.getByText("Delete"));
    expect(setItemMock).toHaveBeenCalledWith(
      "PLAYER_KEY",
      expect.not.stringContaining("Player 1")
    );
    expect(screen.queryByText("Player 1")).toBeNull();
  });

  it("closes the modal when cancel is pressed", () => {
    jest.spyOn(localStorage, "getItem").mockReturnValue(JSON.stringify([]));

    render(<PlayersMetricsTable />);

    fireEvent.press(screen.getByText("Create new"));
    expect(screen.getByText("Create New Player")).toBeTruthy();

    fireEvent.press(screen.getByText("Cancel"));
    expect(screen.queryByText("Create New Player")).toBeNull();
  });
});
