import ContainerException from '@enhavo/dependency-injection/exception/ContainerException.js';

const TYPE_NULL = 'null';
const TYPE_SERVICE = 'service';
const TYPE_STRING = 'string';
const TYPE_NUMBER = 'number';
const TYPE_BOOLEAN = 'boolean';
const TYPE_PARAM = 'param';
const TYPE_JSON = 'json';
const TYPE_CONTAINER = 'container';

export default class Argument
{
    constructor(expression, type = null)
    {
        if((expression === null) && (type === null || type === TYPE_NULL)) {
            this.value = null;
            this.type = TYPE_NULL;
            return;
        }

        if (type !== null) {
            /** @type {string} */
            this.value = expression;
            /** @type {string} */
            this.type = type;
        } else {
            /** @type {string} */
            this.value = this._getValue(expression);
            /** @type {string} */
            this.type = this._getType(expression);
        }

        /** @type {string} */
        this.hash = null;
    }

    _getValue(expression) {
        if (typeof expression == 'object') {
            return JSON.stringify(expression);
        }
        let parts = expression.split(':');
        if(parts.length === 1) {
            return parts[0];
        } else if(parts.length === 2)  {
            return parts[1];
        }
        throw new ContainerException('Argument expression "'+expression+'" should contain maximum one colon.');
    }

    _getType(expression) {
        if (typeof expression == 'object') {
            return 'json';
        }

        let parts = expression.split(':');
        if(parts.length === 1) {
            return TYPE_SERVICE;
        } else if(parts.length === 2)  {
            let types = [TYPE_SERVICE, TYPE_STRING, TYPE_NUMBER, TYPE_PARAM, TYPE_CONTAINER, TYPE_BOOLEAN, TYPE_JSON];
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
