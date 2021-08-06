const sendDomMsg = {from: "background.js", to: "content.js", subject: "send-dom"};
const newTab = {url: `chrome-extension://${window.chrome.runtime.id}/index.html`, active: true};
const appendDomMsg = {from: "background.js", to: "builder", subject: "append-dom"};

window.chrome.browserAction.onClicked.addListener((tab) => {
    window.chrome.tabs.sendMessage(tab.id, sendDomMsg, ({content}) => {
        window.chrome.tabs.create(newTab, (createdTab) => {
            window.chrome.tabs.onUpdated.addListener((tabId, changeInfo, {id, title}) => {
                if (id === createdTab.id && title === "IAUTabler" && changeInfo.status === 'complete') {
                    window.chrome.tabs.sendMessage(createdTab.id, {...appendDomMsg, content: content});
                }
            })
        })
    })
})