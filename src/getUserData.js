const userId = document.getElementById("lmao").innerText;

chrome.storage.local.set({ cgnzr_user_id: userId });
