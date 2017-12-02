chrome.runtime.onMessage.addListener(function(message) {
  const branchElements = document.getElementsByClassName('branch');
  if (branchElements.length !== 2) {
    return;
  }
  const branch = document
                   .getElementsByClassName('branch')[1]
                   .getElementsByClassName('css-truncate-target')[0]
                   .innerHTML;

  const cardIdRegexPattern = '[A-Z0-9]+-[0-9]+';
  const cardId = new RegExp(cardIdRegexPattern).exec(branch)[0];
  const cardUrl = `https://jira.bgchtest.info/browse/${cardId}`;
  const xhr = new XMLHttpRequest();
  xhr.open('GET', cardUrl, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      const parser = new DOMParser();
      const response = parser.parseFromString(xhr.responseText, 'text/html');
      const replaceRegex = new RegExp(`^\\[(${cardIdRegexPattern})\\]`);
      const title = /(.*) - .*$/.exec(response
                                        .getElementsByTagName('title')[0]
                                        .innerHTML
                                        .replace(replaceRegex, '$1')
                                      )[1];

      if (message.mode === 'all') {
        document.getElementById('pull_request_title').value = title;
      }
      document.getElementById('pull_request_body').value = cardUrl;
    }
  }
  xhr.send();
});
