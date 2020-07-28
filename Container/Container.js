
export class Container
{
    constructor()
    {
        this.services = [];
    }

    get(name) {
        for (let service in this.services) {
            if (service.name === name) {
                return service.instance;
            }
        }

        let service = new Service(name, this._call('get' + name, this));
        this.services.push(service);

        return service.instance;
    }

    _call(functionName, context /*, args */)
    {
        let args = Array.prototype.slice.call(arguments, 2);
        let namespaces = functionName.split(".");
        let func = namespaces.pop();
        for (let i = 0; i < namespaces.length; i++) {
            context = context[namespaces[i]];
        }
        return context[func].apply(context, args);
    }
}

class Service
{
    constructor(name, instance) {
        this.name = name;
        this.instance = instance;
    }
}
