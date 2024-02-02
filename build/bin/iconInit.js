'use strict';

var postcss = require('postcss');
var fs = require('fs');
var path = require('path');
// 读取icon.scss
var fontFile = fs.readFileSync(path.resolve(__dirname, '../../packages/theme-chalk/src/icon.scss'), 'utf8');
// 得到样式节点
var nodes = postcss.parse(fontFile).nodes;
var classList = [];

nodes.forEach((node) => {
  // 节点的选择器
  var selector = node.selector || '';
  // 正则匹配 ([^:]+) 整体意思: 不包含:的其他的一个或者多个字符   ()分组用 ，没有作用  [^:]意思是不包含:这个字符 +至少一个或者多个
  var reg = new RegExp(/\.el-icon-([^:]+):before/);
  var arr = selector.match(reg);
  // arr[1] == ([^:]+)匹配的内容
  if (arr && arr[1]) {
    classList.push(arr[1]);
  }
});

classList.reverse(); // 希望按 css 文件顺序倒序排列

fs.writeFile(path.resolve(__dirname, '../../examples/icon.json'), JSON.stringify(classList), () => {});
