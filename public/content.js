// const article = document.querySelector("article");

// // `document.querySelector` may return null if the selector doesn't match anything.
// if (article) {
//   const text = article.textContent;
//   const wordMatchRegExp = /[^\s]+/g; // Regular expression
//   const words = text.matchAll(wordMatchRegExp);
//   // matchAll returns an iterator, convert to array to get word count
//   const wordCount = [...words].length;
//   const readingTime = Math.round(wordCount / 200);
//   const badge = document.createElement("p");
//   // Use the same styling as the publish information in an article's header
//   badge.classList.add("color-secondary-text", "type--caption");
//   badge.textContent = `⏱️ ${readingTime} min read`;

//   // Support for API reference docs
//   const heading = article.querySelector("h1");
//   // Support for article docs with date
//   const date = article.querySelector("time")?.parentNode;

//   (date ?? heading).insertAdjacentElement("afterend", badge);
// }

// deprecated
// chrome.runtime.onMessage.addListener(function(msg, sender){
//     if(msg == "toggle"){
//         toggle();
//     }
// });

// var iframe = document.createElement('iframe'); 
// iframe.style.background = "green";
// iframe.style.height = "100%";
// iframe.style.width = "0px";
// iframe.style.position = "fixed";
// iframe.style.top = "0px";
// iframe.style.right = "0px";
// iframe.style.zIndex = "9000000000000000000";
// iframe.frameBorder = "none"; 
// iframe.src = chrome.extension.getURL("popup.html")

// document.body.appendChild(iframe);

// function toggle(){
//     if(iframe.style.width == "0px"){
//         iframe.style.width="400px";
//     }
//     else{
//         iframe.style.width="0px";
//     }
// }

// chrome.runtime.sendMessage({ message: "popup" }, function (response) {
//     //
//   });

// var port = chrome.runtime.connect({name: "knockknock"});
// port.postMessage({joke: "Knock knock"});
// port.onMessage.addListener(function(msg) {
//   if (msg.question === "Who's there?")
//     port.postMessage({answer: "Madame"});
//   else if (msg.question === "Madame who?")
//     port.postMessage({answer: "Madame... Bovary"});
// });

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


(async () => {
    const article = document.querySelector('article')
    const response = await chrome.runtime.sendMessage({ greeting: article.outerHTML, url: getGitHubPost(window.location.toString()) });
    // do something with response here, not outside the function
    console.log('xxxx', response);
})();