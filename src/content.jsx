console.log('fries');
const src = chrome.runtime.getURL('injected.html');

const iframe = new DOMParser().parseFromString(
    // eslint-disable-next-line max-len
    `<iframe class="crx" src="${src}" width="500px" height="400px"></iframe>`, 'text/html').body.firstElementChild;

document.body.append(iframe);
