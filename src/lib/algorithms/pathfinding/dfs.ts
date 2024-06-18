import { getUntraversedNeighbors } from "../../../utils/getUntraversedNeighbors";
import { checkStack, isEqual } from "../../../utils/helpers";
import { GridType, TileType } from "../../../utils/types";

export const dfs = (grid: GridType, startTile: TileType, endTile: TileType) => {
  const traversedTiles = []; // Initialize an array to store traversed tiles
  const base = grid[startTile.row][startTile.col]; // Get the start tile from the grid
  base.distance = 0; // Set the distance of the start tile to 0
  base.isTraversed = true; // Mark the start tile as traversed
  const untraversedTiles = [base]; // Initialize the stack with the start tile

  while (untraversedTiles.length > 0) {
    // Continue while there are untraversed tiles
    const currentTile = untraversedTiles.pop(); // Get the last tile from the stack
    if (currentTile) {
      // If the current tile is valid
      if (currentTile.isWall) continue; // Skip if the tile is a wall
      if (currentTile.distance === Infinity) break; // Break if the tile's distance is infinity
      currentTile.isTraversed = true; // Mark the tile as traversed
      traversedTiles.push(currentTile); // Add the tile to the traversed tiles array
      if (isEqual(currentTile, endTile)) break; // Break if the tile is the end tile
      const neighbors = getUntraversedNeighbors(grid, currentTile); // Get untraversed neighbors of the tile
      for (let i = 0; i < neighbors.length; i += 1) {
        // Iterate through each neighbor
        if (!checkStack(neighbors[i], untraversedTiles)) {
          // Check if the neighbor is not in the stack
          neighbors[i].distance = currentTile.distance + 1; // Update the neighbor's distance
          neighbors[i].parent = currentTile; // Set the neighbor's parent to the current tile
          untraversedTiles.push(neighbors[i]); // Add the neighbor to the stack
        }
      }
    }
  }
  const path = []; // Initialize an array to store the path
  let current = grid[endTile.row][endTile.col]; // Start from the end tile
  while (current !== null) {
    // Backtrack until the start tile
    current.isPath = true; // Mark the tile as part of the path
    path.unshift(current); // Add the tile to the path
    current = current.parent!; // Move to the parent tile
  }
  return { traversedTiles, path }; // Return the traversed tiles and the path
};
