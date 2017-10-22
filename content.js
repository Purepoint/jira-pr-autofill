(function() {
  const branch = document.getElementsByClassName('branch')[1].getElementsByClassName('css-truncate-target')[0].innerHTML.substring(0, 8);
  const cardUrl = `https://jira.bgchtest.info/browse/${branch}`;
  const xhr = new XMLHttpRequest();
  xhr.open('GET', cardUrl, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      const response = document.createElement('response');
      response.innerHTML = xhr.responseText;
      const title = response.getElementsByTagName('title')[0].innerHTML.replace(/^\[(.{8})\]/, '$1').slice(0, -12);
      document.getElementById('pull_request_title').value = title;
      document.getElementById('pull_request_body').value = cardUrl;
    }
  }
  xhr.send();
})();
