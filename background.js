function targetUrl() {
  return "https://devdocs.io/";
}

function isTargetUrl(url) {
  // Return whether the URL starts with the Gmail prefix.
  return url.startsWith(targetUrl());
}
function gotoTargetUrl() {
  chrome.tabs.getAllInWindow(undefined, function(tabs) {
    for (var i = 0, tab; tab = tabs[i]; i++) {
      if (tab.url && isTargetUrl(tab.url)) {
        chrome.tabs.update(tab.id, {active: true, pinned: true});
        return;
      }
    }
    chrome.tabs.create({url: targetUrl(), pinned: true});
  });
}

chrome.browserAction.onClicked.addListener(gotoTargetUrl);
