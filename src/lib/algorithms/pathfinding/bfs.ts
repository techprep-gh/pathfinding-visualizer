import { getUntraversedNeighbors } from "../../../utils/getUntraversedNeighbors";
import { isEqual } from "../../../utils/helpers";
import { isInQueue } from "../../../utils/isInQueue";
import { GridType, TileType } from "../../../utils/types";

export const bfs = (grid: GridType, startTile: TileType, endTile: TileType) => {
  const traversedTiles: TileType[] = []; // Initialize an array to store traversed tiles
  const base = grid[startTile.row][startTile.col]; // Get the start tile from the grid
  base.distance = 0; // Set the distance of the start tile to 0
  base.isTraversed = true; // Mark the start tile as traversed
  const unTraversed = [base]; // Initialize the queue with the start tile

  while (unTraversed.length) {
    // Continue while there are untraversed tiles
    const tile = unTraversed.shift() as TileType; // Get the first tile from the queue
    if (tile.isWall) continue; // Skip if the tile is a wall
    if (tile.distance === Infinity) break; // Break if the tile's distance is infinity
    tile.isTraversed = true; // Mark the tile as traversed
    traversedTiles.push(tile); // Add the tile to the traversed tiles array
    if (isEqual(tile, endTile)) break; // Break if the tile is the end tile

    const neighbors = getUntraversedNeighbors(grid, tile); // Get untraversed neighbors of the tile
    for (let i = 0; i < neighbors.length; i += 1) {
      // Iterate through each neighbor
      if (!isInQueue(neighbors[i], unTraversed)) {
        // Check if the neighbor is not in the queue
        const nei = neighbors[i]; // Get the neighbor tile
        nei.distance = tile.distance + 1; // Update the neighbor's distance
        nei.parent = tile; // Set the neighbor's parent to the current tile
        unTraversed.push(nei); // Add the neighbor to the queue
      }
    }
  }

  const path = []; // Initialize an array to store the path
  let tile = grid[endTile.row][endTile.col]; // Start from the end tile
  while (tile !== null) {
    // Backtrack until the start tile
    tile.isPath = true; // Mark the tile as part of the path
    path.unshift(tile); // Add the tile to the path
    tile = tile.parent!; // Move to the parent tile
  }
  return { traversedTiles, path }; // Return the traversed tiles and the path
};
