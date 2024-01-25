const GOOGLE_ORIGIN = 'https://github.com';

// Allows users to open the side panel by clicking on the action toolbar icon
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  if (!tab.url) return;
  const url = new URL(tab.url);
  // Enables the side panel on google.com
  if (url.origin === GOOGLE_ORIGIN) {
    await chrome.sidePanel.setOptions({
      tabId,
      path: 'sidepanel.html',
      enabled: true
    });
  } else {
    // Disables the side panel on all other sites
    await chrome.sidePanel.setOptions({
      tabId,
      enabled: false
    });
  }
});

async function getTab() {
  let queryOptions = { active: true, currentWindow: true };
  let tabs = await chrome.tabs.query(queryOptions);
  return tabs[0].url;
}

function getGitHubPost(url) {
  const domain = url.match(/https:\/\/github\.com(\/.*)?/);

  if (domain && domain.length > 1) {
    const pathAfterDomain = domain[1];
    console.log(pathAfterDomain);
    return pathAfterDomain
  } else {
    console.log("无法提取路径。");
    return ''
  }
}

let mapData = ''
chrome.runtime.onMessage.addListener(
  async function (request, sender, sendResponse) {
    console.log(sender.tab ?
      "from a content script:" + sender.tab.url :
      "from the extension");
    if (!!request.greeting) {
      // const curTab = await getTab()
      // const pstr = getGitHubPost(curTab)
      chrome.storage.local.set({ [`article-${request.url || ''}`]: request.greeting }).then(() => {
        console.log("Value is set");
      });
      mapData = request.greeting
      sendResponse({ farewell: "goodbye" });
    }
    // sendResponse({farewell: div.innerHTML});
  }
);

// chrome.tabs.onUpdated.addListener(async function () {
//   console.log("TAB UPDATED")
//   let url = await getTab()
//   const pstr = getGitHubPost(curTab)
//   chrome.storage.local.set({ [`article-${pstr}`]: mapData || '' }).then(() => {
//     console.log("Value is set");
//   });
//   console.log(url)
// })