var fs = require('fs');
var save = require('file-save');
var resolve = require('path').resolve;
var basename = require('path').basename; // 返回一个 path 的最后一部分
// 语言文件路径
var localePath = resolve(__dirname, '../../src/locale/lang');
// 得到所有语言文件的列表 比如:['af-ZA.js', 'ar.js', ...]
var fileList = fs.readdirSync(localePath);
// 转换方法
var transform = function(filename, name, cb) {
  // 文件转码异步 transformFile(文件名,options,回调函数)
  require('babel-core').transformFile(resolve(localePath, filename), {
    plugins: [
      'add-module-exports',
      ['transform-es2015-modules-umd', {loose: true}]
    ],
    moduleId: name
  }, cb);
};

// 遍历文件列表
fileList
  // 之遍历js文件
  .filter(function(file) {
    return /\.js$/.test(file);
  })
  .forEach(function(file) {
    // name为../../src/locale/lang里面的文件名 basename('../../src/locale/lang')
    var name = basename(file, '.js');
    // transform('zh-CN.js','zh-CN',)
    transform(file, name, function(err, result) {
      if (err) {
        console.error(err);
      } else {
        var code = result.code;

        code = code
          .replace('define(\'', 'define(\'element/locale/')
          .replace('global.', 'global.ELEMENT.lang = global.ELEMENT.lang || {}; \n    global.ELEMENT.lang.');
        save(resolve(__dirname, '../../lib/umd/locale', file)).write(code);

        console.log(file);
      }
    });
  });
