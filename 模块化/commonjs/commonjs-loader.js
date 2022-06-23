/**
 * commonjs loader的玩具实现
 * 这里手动包装模块文件以测试功能,暂时不实现自动包装,也不实现路径查找,路径全部按照绝对路径来搞
 * todo: 实现值拷贝功能
 */

const __mt_module = {
    cache: {},
};

function createModule() {
    return {
        exports: {},
    };
}

function __mt_require(moduleId) {
    if (__mt_module.cache[moduleId]) return __mt_module.cache[moduleId];
    if (!module_definations[moduleId]) throw new Error(`[commonjs-loader]: not find module "${moduleId}"`);
    const module = createModule();
    module_definations[moduleId](module, module.exports, __mt_require);
    return __mt_module.cache[moduleId] = module.exports;
}

const module_definations = {
    'main.js': function (module, exports, require) {
        const sayHello = require('bar.js');
        sayHello('shuai');
    },
    'bar.js': function (module, exports, require) {
        module.exports = function sayHello(name) {
            console.log(`Hello, ${name}`);
        };
    },
};

!(function main(_module, _exports, _require, _modules) {
    _modules['main.js'](_module, _exports, _require);
})(__mt_module, __mt_module.exports, __mt_require, module_definations);


