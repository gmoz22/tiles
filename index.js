/**
 * Algorithm to calculate scores
 */

const DEBUG = false;

// shortcuts
var _l = console.log;

// Main settings
const levels = 2; // max levels

// UI
const UI_WIDTH = 640;
const UI_HEIGHT = 1136;


/**
 * @function generateGrid
 * @description Generates a grid for a specific level
 * @param level Level of difficulty
 * @returns {JSON} {grid, maxTiles, maxFilledTiles}
 */
var generateGrid = function(level) {

    _l('Generating grid...');

    // Calculate the grid size for that level
    var gridSize = Math.round(level * 1.1) + 1;
    _l('gridSize = Math.round('+level+' * 1.1) + 1 = ' + gridSize);

    // Calculate the number of tiles for this grid
    var maxTiles = gridSize * gridSize;
    _l('maxTiles: ' + maxTiles);

    // Calculate the number of filled tiles
    var maxFilledTiles = Math.floor(maxTiles / 2);
    _l('maxFilledTiles: ' + maxFilledTiles);

    // Generate grid
    var matrix = new Array();
    var tilesProcessed = 0;
    var tilesFilled = 0;

    // for each row
    for (var i=0; i<gridSize; i++) {
        matrix[i] = new Array();
        DEBUG && _l('\nRow ' + (i+1));

        // for each column
        for (var j=0; j<gridSize; j++) {
            DEBUG && _l('- column ' + (j+1));
            var thisTile = Math.round(Math.random());
            var isForced = false;
            DEBUG && _l('thisTile: '+thisTile);

            // Filled tile
            if (thisTile) {
                // check if there are filled tiles left
                if (tilesFilled>=maxFilledTiles) {
                    DEBUG && _l('Forcing empty tile');
                    thisTile = 0;
                    isForced = true;
                }
            }

            DEBUG && _l('Filled tiles left: ' + (maxTiles - tilesFilled));
            DEBUG && _l('Tiles left to process: ' + (maxTiles-tilesProcessed));

            // Check if the number of filled tiles left equals the number of tiles not processed
            // In that case, we have to fill all following tiles
            if ( !isForced) {
                if ((maxFilledTiles - tilesFilled) == (maxTiles-tilesProcessed)) {
                    DEBUG && _l('Forcing filled tile');
                    thisTile = 1;
                }
            }

            // Increment tiles filled counter
            if (thisTile) {
                tilesFilled++;
            }

            // Create tile
            matrix[i][j] = thisTile;
            tilesProcessed++;
        }

        DEBUG && _l('=>' + matrix[i].join('') + '\n');

    }

    return {grid: matrix, maxTiles: maxTiles, maxFilledTiles: maxFilledTiles};
};



for (var level = 1; level <= levels; level++) {

    _l('\n==========\nLEVEL '+level+'\n==========');

    var go = generateGrid(level);
    var filledTiles = 0;

    _l('GRID:\n');

    for (var i = 0; i < go.grid.length; i++) {
        
        var col = go.grid[i];
        for (var j = 0; j < col.length; j++) {
            col[j] && filledTiles++;
        }
        
        _l(go.grid[i].join(''));
    }

    _l('\nHealth check: '+(go.maxFilledTiles==filledTiles?'OK':'ERROR!')+' (grid should have ' + go.maxFilledTiles + ' filled tiles, found ' + filledTiles + ' filled tiles)');

}