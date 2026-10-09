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

const child = spawn(electronBinary, [appPath], {
  detached: true,
  stdio: 'ignore',
  windowsHide: true,
});

child.on('error', (err) => {
  console.error('琅琊铁鞭启动失败:', err.message);
  process.exit(1);
});

child.unref();
