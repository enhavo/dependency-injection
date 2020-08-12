const ContainerException = require('@enhavo/dependency-injection/Exception/ContainerException');

const TYPE_SERVICE = 'service';
const TYPE_STRING = 'string';
const TYPE_NUMBER = 'number';
const TYPE_PARAM = 'param';
const TYPE_CONTAINER = 'container';

class Argument
{
    constructor(expression) {
        if(typeof expression !== 'string') {
            throw new ContainerException('Argument expression should be type of string "'+(typeof expression)+'" given.');
        }

        /** @type {string} */
        this.value = this._getValue(expression);
        /** @type {string} */
        this.type = this._getType(expression);
        /** @type {string} */
        this.hash = null;
    }

    _getValue(expression) {
        let parts = expression.split(':');
        if(parts.length === 1) {
            return parts[0];
        } else if(parts.length === 2)  {
            return parts[1];
        }
        throw new ContainerException('Argument expression "'+expression+'" should contain maximum one colon.');
    }

    _getType(expression) {
        let parts = expression.split(':');
        if(parts.length === 1) {
            return TYPE_SERVICE;
        } else if(parts.length === 2)  {
            let types = [TYPE_SERVICE, TYPE_STRING, TYPE_NUMBER, TYPE_PARAM, TYPE_CONTAINER];
            if(!types.includes(parts[0])) {
                throw new ContainerException('Argument expression type not valid. Should be one of ['+types.join(',')+'] but got "'+parts[0]+'"');
            }
            return parts[0];
        }
        throw new ContainerException('Argument expression "'+expression+'" should contain maximum one colon.');
    }

    getHash() {
        return this.hash;
    }

    setHash(hash) {
        this.hash = hash;
    }

    getValue()
    {
        return this.value;
    }

    getType()
    {
        return this.type;
    }
}

module.exports = Argument;
