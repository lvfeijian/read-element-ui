/**
 * 监听/examples/pages/template目录下面的模板文件，如果模板文件修改了就会执行npm run i18n
 */
const path = require('path');
const templates = path.resolve(process.cwd(), './examples/pages/template');
// chokidar是一个监听工具，监控文件和目录的变化
const chokidar = require('chokidar');
let watcher = chokidar.watch([templates]);

watcher.on('ready', function() {
  watcher
    .on('change', function() {
      exec('npm run i18n');
    });
});

function exec(cmd) {
  return require('child_process').execSync(cmd).toString().trim();
}
