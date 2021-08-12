console.log(window.location.pathname);

//function leaveCall(userId) {
//console.log(userId + " is leaving the call");
//chrome.runtime.sendMessage(
//{
//contentScriptQuery: "postData",
//data: JSON.stringify({ userId: userId }),
//url: "http://localhost:3333/api/v1/leave-meet",
//},
//function (response) {
//if (response != undefined && response != "") {
//callback(response);
//} else {
//callback(null);
//}
//}
//);
//}

if (window.location.pathname !== "/") {
  const meetCode =
    window.location.pathname.split("/")[
      window.location.pathname.split("/").length - 1
    ];
  chrome.storage.local.set({ meetCode });
  console.log(meetCode);
  chrome.storage.local.get(["cgnzr_user_id"], async ({ cgnzr_user_id }) => {
    try {
      //const { success, message, data } = await (
      //await fetch("https://41e2954adab9.ngrok.io/api/v1/join-meet", {
      //method: "POST",
      //body: JSON.stringify({
      //meetCode: meetCode,
      //userId: cgnzr_user_id,
      //}),
      //headers: {
      //Accept: "application/json",
      //"Content-Type": "application/json",
      //"Access-Control-Allow-Origin": "https://meet.google.com",
      //},
      //})
      //).json();
      //console.log(success, message, data);
      chrome.runtime.sendMessage(
        {
          contentScriptQuery: "postData",
          data: JSON.stringify({ meetCode, userId: cgnzr_user_id }),
          url: "http://cognizer.kavin.me/api/v1/join-meet",
        },
        function (response) {
          if (response != undefined && response != "") {
            console.log(response);
          } else {
            console.log(null);
          }
        }
      );

      //const leaveButton = document.querySelector(
      //'button[aria-label="Leave call"]'
      //);
      //console.log(leaveButton);
      //.addEventListener("click", () => {
      //console.log("Clicked");
      //return;
      //leaveCall(cgnzr_user_id);
      //});
    } catch (e) {
      console.log(e.toString());
    }
    //const posts = await (
    //await fetch("https://jsonplaceholder.typicode.com/posts", {
    //method: "POST",
    //body: JSON.stringify({
    //title: "foo",
    //body: "bar",
    //userId: 1,
    //}),
    //headers: {
    //Accept: "application/json",
    //"Content-Type": "application/json",
    //},
    //})
    //).json();
    //console.log(posts);
  });
}
