const sendDomMsg = {from: "background.js", to: "content.js", subject: "send-dom"};
const newTab = {url: `chrome-extension://${window.chrome.runtime.id}/index.html`, active: true};
const appendDomMsg = {from: "background.js", to: "builder", subject: "append-dom"};

const isValidTitle = (tabTitle) => {
    return tabTitle === "Enrollment: Add Classes"
        || tabTitle === "Class Search"
        || tabTitle === "التسجيل: إضافة فصول"
        || tabTitle === "بحث عن فصل";
}


window.chrome.browserAction.onClicked.addListener((tab) => {
    if (isValidTitle(tab.title)) {
        window.chrome.tabs.sendMessage(tab.id, sendDomMsg, (response) => {
            if (!response)
                return;
            window.chrome.tabs.create(newTab, (createdTab) => {
                window.chrome.tabs.onUpdated.addListener((tabId, changeInfo, {id, title}) => {
                    if (id === createdTab.id && title === "IAUTabler" && changeInfo.status === 'complete') {
                        window.chrome.tabs.sendMessage(createdTab.id, {...appendDomMsg, content: response.content});
                    }
                })
            })
        })
    }
})