'use strict';
/**
 * 读取examples/i18n/page.json文件的语言配置和examples/pages/template模板，进行，生成examples/pages下面的各种语言文件
 */
var fs = require('fs');
var path = require('path');
// 读取官网页面的翻译配置,内置了四种语言
var langConfig = require('../../examples/i18n/page.json');

langConfig.forEach(lang => {
  try {
    // 判断examples/pages/zh-CN文件是否存在,不存在执行catch,生成文件目录
    fs.statSync(path.resolve(__dirname, `../../examples/pages/${ lang.lang }`));
  } catch (e) {
    fs.mkdirSync(path.resolve(__dirname, `../../examples/pages/${ lang.lang }`));
  }

  Object.keys(lang.pages).forEach(page => {
    // 模板路径 /examples/pages/template/index.tpl
    var templatePath = path.resolve(__dirname, `../../examples/pages/template/${ page }.tpl`);
    // 输出路径 /examples/pages/zh-CN/index.vue
    var outputPath = path.resolve(__dirname, `../../examples/pages/${ lang.lang }/${ page }.vue`);
    // 读取模板文件内容
    var content = fs.readFileSync(templatePath, 'utf8');
    // 读取index页面的所有键值对
    var pairs = lang.pages[page];
    // 遍历键值对,通过正则匹配替换模板中的key
    Object.keys(pairs).forEach(key => {
      content = content.replace(new RegExp(`<%=\\s*${ key }\\s*>`, 'g'), pairs[key]);
    });
    // 将替换后的内容生成新的vue文件
    fs.writeFileSync(outputPath, content);
  });
});
