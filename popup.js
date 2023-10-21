// get the list of element where we will displace the urls
const tabList = document.getElementById('tabList');

// query the tabs and display them
chrome.tabs.query({}, function(tabs) {
    for (let i = 0; i < tabs.length; i++) {
        const tab = tabs[i];
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.setAttribute('href', tab.url);
        a.setAttribute('target', '_blank');
        a.appendChild(document.createTextNode(tab.title));
        li.appendChild(a);
        tabList.appendChild(li);
    }
});

// open the existing tab when clicking on the link
tabList.addEventListener('click', function(e) {
    e.preventDefault();
    if (e.target.nodeName === 'A') {
        chrome.tabs.create({ url: e.target.href });
    }
});