console.log("running script again");
console.log(Date.now());

chrome.storage.local.get(
  ["meetCode", "cgnzr_user_id"],
  async ({ meetCode, cgnzr_user_id }) => {
    const url = `https://cognizer.kavin.me/api/v1/list-meet-people?meetCode=${meetCode}&userId=${cgnzr_user_id}`;
    console.log(url);
    chrome.runtime.sendMessage(
      {
        contentScriptQuery: "getData",
        url,
      },
      function (response) {
        console.log(response);
        if (response != undefined && response != "") {
          for (guy of response.data) {
            document.getElementById("people").innerHTML += `
              <div class="person" id="${guy.id}">
                <div class="left">
                  <img src="${guy.avatar_url}" alt="${guy.name} Avatar" width="40px" height="40px" />
                  <div class="left-content">
                    <h3 class="name">${guy.name}</h3>
                  </div>
                </div>
                <div class="right">
                  <a href="mailto:${guy.email}" target="_blank"><i class="fas fa-lg fa-envelope"></i></a>
                </div>
              </div>
            `;
            if (guy.phone) {
              document.querySelector(
                `div.person#${guy.id} > div.left-content`
              ).innerHTML += `
                <p class="phone">${guy.phone}</p>
              `;
            }
            if (guy.facebook) {
              document.querySelector(
                `div.person#${guy.id}> div.right`
              ).innerHTML += `
                <a href="${guy.facebook}" target="_blank"><i class="fab fa-lg fa-facebook"></i></a>
              `;
            }
            if (guy.linkedin) {
              document.querySelector(
                `div.person#${guy.id}> div.right`
              ).innerHTML += `
                <a href="${guy.linkedin}" target="_blank"><i class="fab fa-lg fa-linkedin"></i></a>
              `;
            }
            if (guy.twitter) {
              document.querySelector(
                `div.person#${guy.id}> div.right`
              ).innerHTML += `
                <a href="${guy.twitter}" target="_blank"><i class="fab fa-lg fa-twitter"></i></a>
              `;
            }
            if (guy.github) {
              document.querySelector(
                `div.person#${guy.id}> div.right`
              ).innerHTML += `
                <a href="${guy.github}" target="_blank"><i class="fab fa-lg fa-github"></i></a>
              `;
            }
          }
        } else {
          console.log(null);
        }
      }
    );
  }
);
