
class ParameterBag
{
    constructor() {
        this._data = {};
    }

    set(key, value) {
        if(typeof key !== "string") {
            throw "Key should be a string"
        }

        let path = key.split('.');
        let namespace = path.pop();
        let node = this._data;

        if(path.length > 0) {
            for (let part of path) {
                if (typeof node[part] === "undefined") {
                    node[part] = {};
                }
                node = node[part];
            }
        }

        node[namespace] = value;
    }

    get(key) {
        if(typeof key !== "string") {
            throw "Key should be a string"
        }

        let path = key.split('.');
        let namespace = path.shift();
        let node = this._data;

        node = node[namespace];

        if(path.length > 0) {
            for (namespace of path) {
                if (typeof node[namespace] === "undefined") {
                    return null;
                }
                node = node[namespace];
            }
        }

        return node;
    }
}

module.exports = ParameterBag;