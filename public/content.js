const isMsgFromContentJs = (msg) => {
    return msg.from === "background.js" && msg.to === "content.js" && msg.subject === "send-dom"
}

const isArabic = (dom) => {
    return dom.querySelector('html[lang="ar"]') !== null;
}

window.onload = ((e) => {
    window.chrome.runtime.onMessage.addListener((msg, sender, response) => {
        if (isMsgFromContentJs(msg)) {
            const frameBody = document.querySelector('#ACE_\\$ICField\\$4\\$\\$0');
            if (frameBody !== null) {
                if (!isArabic(document)) {
                    const dom = {content: frameBody.innerHTML};
                    response(dom);
                } else {
                    response("arabic-version");
                }
            }
        }
    });
})