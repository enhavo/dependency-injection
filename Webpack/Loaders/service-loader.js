const Compiler = require('@enhavo/dependency-injection/Compiler/Compiler');
const builder = require('@enhavo/dependency-injection/builder');

module.exports = function(source) {
    let callback = this.async();
    (function(err, result, sourceMaps, meta) {
        let compiler = new Compiler;
        let resultData = compiler.compile(builder);
        callback(null, resultData, sourceMaps, meta);
    })();
};
