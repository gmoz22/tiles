
// Global
DEBUG = false;

// Requires
var Grid = require('models/grid.js');


// Main settings
var levels = 5; // max levels

// UI
// const UI_WIDTH = 640;
// const UI_HEIGHT = 1136;


for (var level = 1; level <= levels; level++) {

    console.log('\n==========\nLEVEL '+level+'\n==========');

    var grid = new Grid({level:level});
    var matrix = grid.getMatrix();
    var filledTiles = 0;

    console.log('GRID:\n');

    for (var i = 0; i < matrix.length; i++) {

        var col = matrix[i];
        for (var j = 0; j < col.length; j++) {
            col[j] && filledTiles++;
        }

        console.log(matrix[i].join(' '));
    }

    console.log('\nHealth check: '+(grid.getMaxFilledTiles()==filledTiles?'OK':'ERROR!')+' (grid should have ' + grid.getMaxFilledTiles() + ' filled tiles, found ' + filledTiles + ' filled tiles)');

}