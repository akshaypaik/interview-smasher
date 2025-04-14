export default function swDev() {
    const swURL = './sw.js';
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register(swURL, { scope: '/' }).then((response) => {
            console.warn("response: ", response);
        }).catch((error) => {
            console.error(error);
        });
    } else {
        console.error("service worker not wroking!");
    }
}