chrome.runtime.onInstalled.addListener(function(details) {
  if (details.reason === 'install' ||
      details.reason === 'update' && chrome.runtime.getManifest().version === '0.3') {
    chrome.tabs.create({ url: chrome.extension.getURL('options.html') });
  }

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlMatches: 'https://github.com/*' }
          })
        ],
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});

chrome.pageAction.onClicked.addListener(function(tab) {
  chrome.tabs.sendMessage(tab.id, { mode: 'all' });
});

chrome.commands.onCommand.addListener(function(command) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { mode: command });
  });
});
