(function() {
  function restoreOptions() {
    chrome.storage.sync.get({ url: '' }, function(options) {
      urlField().value = options.url;
    });
  }

  function urlField() {
    return document.getElementById('url');
  }

  function saveOptions() {
    chrome.storage.sync.set({ url: urlField().value }, function() {
      const notificationClassList = document
                                      .getElementById('notification')
                                      .classList;
      const hideClass = 'd-none';
      notificationClassList.remove(hideClass);
      setTimeout(function() {
        notificationClassList.add(hideClass);
      }, 2000);
    });
  }

  document.addEventListener('DOMContentLoaded', restoreOptions);
  document.getElementById('save').addEventListener('click', saveOptions);
})();
