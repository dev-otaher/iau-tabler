window.onload = ((e) => {
    window.chrome.runtime.onMessage.addListener((msg, sender, response) => {
        if (document.querySelector('.PSPAGE') != null) {
            if (msg.from === "background.js" && msg.to === "content.js" && msg.subject === "send-dom") {
                const frameBody = document.querySelector('#ACE_\\$ICField\\$4\\$\\$0');
                if (frameBody != null) {
                    const dom = {content: frameBody.innerHTML};
                    response(dom);
                }
            } else {
                window.alert("HOP HOP")
            }
        }
    });
})