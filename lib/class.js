/**
 * Simple JavaScript class handler
 * @param methods
 * @returns {Function}
 * @constructor
 */
var Class = function(methods) {
    var _class = function() {
        this.__constructor.apply(this, arguments);
    };

    for (var property in methods) {
        _class.prototype[property] = methods[property];
    }

    if (!_class.prototype.__constructor) {
        _class.prototype.__constructor = function(){};
    }

    return _class;
};

module.exports = Class;
