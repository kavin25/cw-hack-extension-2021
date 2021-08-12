//https://stackoverflow.com/questions/53405535/how-to-enable-fetch-post-in-chrome-extension-contentscript

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.contentScriptQuery == "getData") {
    var url = request.url;
    fetch(url)
      .then((response) => response.json())
      .then((response) => sendResponse(response))
      .catch();
    return true;
  }
  if (request.contentScriptQuery == "postData") {
    fetch(request.url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: request.data,
    })
      .then((response) => response.json())
      .then((response) => sendResponse(response))
      .catch((error) => console.log("Error:", error));
    return true;
  }
});

chrome.browserAction.onClicked.addListener((_) => {
  chrome.tabs.executeScript(null, { file: "popup.js" });
  console.log("clicked");
});
