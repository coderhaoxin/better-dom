var _ = require("./utils"),
    $Node = require("./node");

/**
 * Get property value by name
 * @param  {String} key property name
 * @return {Object} property value
 */
$Node.prototype.get = function(key) {
    var el = this;

    if (typeof key === "string") {
        if (key[0] === "_") {
            return this._data[key.substr(1)];
        } else {
            return this._node[key];
        }
    } else if (Array.isArray(key)) {
        return key.reduce(function(r, key) { return r[key] = el.get(key), r; }, {});
    }

    throw _.makeError("get");
};

/**
 * Set property value by name
 * @param  {String} key   property name
 * @param  {Object} value property value
 * @return {$Node}
 */
$Node.prototype.set = function(key, value) {
    var keyType = typeof key;

    if (keyType === "string") {
        if (key[0] === "_") {
            this._data[key.substr(1)] = value;
        } else {
            this._node[key] = value;
        }

        return this;
    } else if (key && keyType === "object") {
        return _.forOwn(key, function(value, key) {
            this.set(key, value);
        }, this);
    }

    throw _.makeError("set");
};
