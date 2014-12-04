
var Class = require('lib/class.js');

/**
 * @class Grid
 * @description Grid class
 * @param level Level of difficulty
 * @returns {Object}
 */
var Grid = Class({

    level: 1, // Default level
    
    matrix: [], // Empty grid
    
    maxTiles: 0,
    maxFilledTiles: 0,
    tilesProcessed: 0,
    tilesFilled: 0,

    __constructor: function(args) {
        // console.log('Received args: ', args);
        this.setLevel(args.level);
        this.generate();
    },

    setLevel: function(level){
        this.level = level;
    },
    getLevel: function(){
        return this.level;
    },

    setMatrix: function(matrix){
        this.matrix = matrix;
    },
    getMatrix: function(){
        return this.matrix;
    },

    getMaxFilledTiles: function(){
        return this.maxFilledTiles;
    },

    generate: function() {

        console.log('Generating grid...');

        // Calculate the grid size for that level
        this.gridSize = Math.round(this.getLevel() * 1.1) + 1;
        console.log('gridSize: ' + this.gridSize);

        // Calculate the number of tiles for this grid
        this.maxTiles = this.gridSize * this.gridSize;
        console.log('maxTiles: ' + this.maxTiles);

        // Calculate the number of filled tiles
        this.maxFilledTiles = Math.floor(this.maxTiles / 2);
        console.log('maxFilledTiles: ' + this.maxFilledTiles);

        // Generate grid
        var matrix = this.getMatrix();

        // for each row
        for (var i=0; i<this.gridSize; i++) {
            matrix[i] = new Array();
            DEBUG && console.log('\nRow ' + (i+1));

            // for each column
            for (var j=0; j<this.gridSize; j++) {
                DEBUG && console.log('- column ' + (j+1));
                var thisTile = Math.round(Math.random());
                var isForced = false;
                DEBUG && console.log('thisTile: '+thisTile);

                // Filled tile
                if (thisTile) {
                    // check if there are filled tiles left
                    if (this.tilesFilled>=this.maxFilledTiles) {
                        DEBUG && console.log('Forcing empty tile');
                        thisTile = 0;
                        isForced = true;
                    }
                }

                DEBUG && console.log('Filled tiles left: ' + (this.maxTiles - this.tilesFilled));
                DEBUG && console.log('Tiles left to process: ' + (this.maxTiles-this.tilesProcessed));

                // Check if the number of filled tiles left equals the number of tiles not processed
                // In that case, we have to fill all following tiles
                if ( !isForced) {
                    if ((this.maxFilledTiles - this.tilesFilled) == (this.maxTiles - this.tilesProcessed)) {
                        DEBUG && console.log('Forcing filled tile');
                        thisTile = 1;
                    }
                }

                // Increment tiles filled counter
                if (thisTile) {
                    this.tilesFilled++;
                }

                // Create tile
                matrix[i][j] = thisTile;
                this.tilesProcessed++;
            }

            DEBUG && console.log('=>' + matrix[i].join('') + '\n');

        }
        
        this.setMatrix(matrix);
    }

});

module.exports = Grid;
