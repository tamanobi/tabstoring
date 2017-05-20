function create(url, title) {
  const wrapper = document.createElement('div');
  const elm = document.createElement('a');
  elm.textContent = title;
  elm.setAttribute('href', url);
  wrapper.appendChild(elm);
  return wrapper;
}

function getAllTabString(evt, func) {
  chrome.tabs.query({}, tabs => {
    let a = [];
    tabs.forEach( tab => {
      a.push({
        "url": tab.url,
        "title": tab.title
      });
    });
    func(evt, a);
  });
}

function copy() {
  const copyText = document.querySelector("#copying");
  copyText.select();
  document.execCommand("Copy");
}

function openUrl() {
  const urlsString = document.querySelector("#opening").value;
  console.log(document.querySelector("#opening"));
  urlsStringSeparatedLine = urlsString.split("\n");
  console.log(urlsString, urlsStringSeparatedLine);
  urlsStringSeparatedLine.forEach(line => {
    console.log(line);
    const url = line.split("\t")[0];
    if (url !== "") {
      chrome.tabs.create({"url": url});
    }
  });
}

document.addEventListener("DOMContentLoaded", function(event) {
  let urls_string = "";
  chrome.tabs.query({}, tabs => {
    urls_string = "";
    tabs.forEach( tab => {
      urls_string += `${tab.url}\t${tab.title}\n`;
      //document.body.appendChild(create(tab.url, tab.title));
    });
    document.querySelector("#copying").textContent = urls_string;
  });

  document.querySelector("#copy").addEventListener("click", copy);
  document.querySelector("#open").addEventListener("click", openUrl);
});

