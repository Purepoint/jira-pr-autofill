chrome.runtime.onMessage.addListener(function(message) {
  const branchElements = document.getElementsByClassName('branch');
  if (branchElements.length !== 2) {
    return;
  }

  const titleField = document.getElementById('pull_request_title');
  if (message.mode === 'qa') {
    titleField.value = `${titleField.value} - QA`;
    return;
  }

  const branch = document
                   .getElementsByClassName('branch')[1]
                   .getElementsByClassName('css-truncate-target')[0]
                   .innerHTML;

  const cardIdRegexPattern = '[A-Z0-9]+-[0-9]+';
  const cardId = new RegExp(cardIdRegexPattern).exec(branch)[0];
  chrome.runtime.sendMessage(
    { contentScriptQuery: 'card', cardId: cardId },
    function(response) {
      const parser = new DOMParser();
      const parsedResponseText = parser.parseFromString(response.text, 'text/html');
      const replaceRegex = new RegExp(`^\\[(${cardIdRegexPattern})\\]`);
      const title = /(.*) - .*$/.exec(parsedResponseText
                                        .getElementsByTagName('title')[0]
                                        .textContent
                                        .replace(replaceRegex, '$1')
                                      )[1];

      if (message.mode === 'all') {
        titleField.value = title;
      }
      document.getElementById('pull_request_body').value = response.cardUrl;
    }
  );
});
