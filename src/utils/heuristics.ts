import { MAX_COLS, MAX_ROWS } from "./constants";
import { GridType, TileType } from "./types";

const retrieveHeuristicCost = (currentTile: TileType, endTile: TileType) => {
  const manhattanDistance = 1; // Define the constant multiplier for Manhattan distance
  const r = Math.abs(currentTile.row - endTile.row); // Calculate the absolute difference in rows between the current tile and the end tile
  const c = Math.abs(currentTile.col - endTile.col); // Calculate the absolute difference in columns between the current tile and the end tile
  return manhattanDistance * (r + c); // Return the Manhattan distance (sum of row and column differences)
};

export const initHeuristicCost = (grid: GridType, endTile: TileType) => {
  const heuristicCost = []; // Initialize an empty array to store heuristic costs
  for (let i = 0; i < MAX_ROWS; i += 1) {
    // Loop through each row in the grid
    const row = []; // Initialize an empty array to store heuristic costs for the current row
    for (let j = 0; j < MAX_COLS; j += 1) {
      // Loop through each column in the current row
      row.push(retrieveHeuristicCost(grid[i][j], endTile)); // Calculate and add the heuristic cost for the current tile
    }
    heuristicCost.push(row); // Add the row of heuristic costs to the heuristicCost array
  }
  return heuristicCost; // Return the 2D array of heuristic costs
};

export const initFunctionCost = () => {
  const functionCost = []; // Initialize an empty array to store function costs
  for (let i = 0; i < MAX_ROWS; i += 1) {
    // Loop through each row in the grid
    const row = []; // Initialize an empty array to store function costs for the current row
    for (let j = 0; j < MAX_COLS; j += 1) {
      // Loop through each column in the current row
      row.push(Infinity); // Set the initial function cost for each tile to Infinity
    }
    functionCost.push(row); // Add the row of function costs to the functionCost array
  }
  return functionCost; // Return the 2D array of function costs
};
