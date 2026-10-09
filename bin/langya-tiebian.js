#!/usr/bin/env node
// 琅琊铁鞭 · 启动器：拉起 Electron 托盘应用
const path = require('path');
const { spawn } = require('child_process');

let electronBinary;
try {
  electronBinary = require('electron');
} catch (e) {
  console.error('Could not load Electron. Try: npm install -g langya-tiebian');
  process.exit(1);
}

const appPath = path.resolve(__dirname, '..');
const debug = process.argv.includes('--debug') || process.argv.includes('-d');

if (debug) {
  // 前台模式：报错直接打到终端，方便排查
  const child = spawn(electronBinary, [appPath], { stdio: 'inherit' });
  child.on('error', (err) => {
    console.error('琅琊铁鞭启动失败:', err.message);
    process.exit(1);
  });
} else {
  const child = spawn(electronBinary, [appPath], {
    detached: true,
    stdio: 'ignore',
    windowsHide: true,
  });

  child.on('error', (err) => {
    console.error('琅琊铁鞭启动失败:', err.message);
    console.error('试试前台模式看报错: tiebian --debug');
    process.exit(1);
  });

  child.unref();
}
