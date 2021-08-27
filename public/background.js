const sendDomMsg = {from: "background.js", to: "content.js", subject: "send-dom"};
const newTab = {url: `chrome-extension://${window.chrome.runtime.id}/index.html`, active: true};
const appendDomMsg = {from: "background.js", to: "builder", subject: "append-dom"};

const isValidTitle = (tabTitle) => {
    switch (tabTitle) {
        case "Enrollment: Add Classes":
        case "التسجيل: إضافة فصول":
        case "Class Search":
        case "بحث عن فصل":
        case "Enrollment Shopping Cart":
        case "عربة تسوق التسجيل":
            return true;
        default:
            return false;
    }
}

window.chrome.browserAction.onClicked.addListener((tab) => {
    if (isValidTitle(tab.title)) {
        window.chrome.tabs.sendMessage(tab.id, sendDomMsg, (response) => {
            if (!response || response === "no-data") {
                window.alert("No data found! Refresh page or search for classes then try again.");
                return;
            }
            if (response === "arabic-version") {
                window.alert("Arabic is not supported yet :'D\n" +
                    "Please use PeopleSoft's english version.")
                return;
            }
            window.chrome.tabs.create(newTab, (createdTab) => {
                window.chrome.tabs.onUpdated.addListener((tabId, changeInfo, {id, title}) => {
                    if (id === createdTab.id && title === "IAUTabler" && changeInfo.status === 'complete') {
                        window.chrome.tabs.sendMessage(createdTab.id, {...appendDomMsg, content: response.content});
                    }
                })
            })
        })

    } else
        window.alert('Invalid website! Search for classes on PeopleSoft then try again.')
})