#!/usr/bin/env node

const fs = require('fs');
const Nightmare = require('nightmare');

require('nightmare-download-manager')(Nightmare);

if (!process.env.ACCOUNT_LOGIN) {
  console.log("env ACCOUNT_LOGIN not set");
  process.exit(1);
}

if (!process.env.ACCOUNT_PASSWORD) {
  console.log("env ACCOUNT_PASSWORD not set");
  process.exit(1);
}

var downloadDir = '.';

if (process.argv[2]) {
  downloadDir = process.argv[2];
}

try {
  downloadDir = fs.realpathSync(downloadDir);
  fs.accessSync(downloadDir, fs.F_OK);
} catch (e) {
  console.log("directory '" + downloadDir +  "' is not a directory or not writeable. exiting.");
  process.exit(1);
}

console.log('will download invoices to: ' + downloadDir);

nightmare = Nightmare({
  show: !!process.env.DEBUG,
  paths: {
    downloads: downloadDir
  }
});

nightmare.on('download', function(state, downloadItem){
  if (state == 'started') {
    console.log("downloading invoice " +  downloadItem['filename'] );
    nightmare.emit('download', downloadItem);
  }
})

nightmare
  .downloadManager()
  .goto('https://kreditkarten-banking.lbb.de/lbb/')
  .type('input[name=user]',     process.env.ACCOUNT_LOGIN)
  .type('input[name=password]', process.env.ACCOUNT_PASSWORD)
  .click('input[name=bt_LOGON]')
  .wait('a.haupt[id="nav.stmt"]')
  .click('a.haupt[id="nav.stmt"]')
  .wait('input[name=bt_STMT]')
  .evaluate(function () {
    var buttons = document.querySelectorAll('input[name=bt_STMT]');
    return Array.prototype.map.call(buttons, function(e) {
      return e.getAttribute('value')
    });
  })
  .then((dates) => {
    dates.forEach(function(date) {
      nightmare
        .click('input[name="bt_STMT"][value="' + date + '"]')
        .wait('input[name="bt_STMTPDF"]')
        .click('input[name="bt_STMTPDF"]')
        .waitDownloadsComplete()
        .back()
    });
    nightmare.waitDownloadsComplete();
    return nightmare.end();
  })
  .catch(function (error) {
    console.error('failed:', error);
  });
