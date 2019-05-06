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
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { mode: command });
  });
});

chrome.runtime.onMessage.addListener(function(request, _sender, sendResponse) {
  if (request.contentScriptQuery === 'card') {
    chrome.storage.sync.get('url', function(options) {
      const cardUrl = `${options.url}/browse/${request.cardId}`;
      fetch(cardUrl)
        .then(function(response) {
          return response.text();
        })
        .then(function(text) {
          sendResponse({ cardUrl: cardUrl, text: text });
        })
        .catch(function(error) {
          console.log('Request failed', error);
        });
    });
    return true;
  }
});
