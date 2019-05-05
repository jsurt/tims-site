const sdURLs = [
  "https://soundcloud.com/oembed?format=json&url=https://soundcloud.com/timothy-freeman-2/neon-midnight&iframe=true",
  "https://soundcloud.com/oembed?format=json&url=https://soundcloud.com/timothy-freeman-2/schedule-i&iframe=true"
];

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    xhr = null;
  }
  return xhr;
}

// Make the actual CORS request.
function makeCorsRequest(url) {
  var url;

  var xhr = createCORSRequest("GET", url);
  if (!xhr) {
    alert("CORS not supported");
    return;
  }
  xhr.onload = function() {
    const response = xhr.responseText;
    //const data = JSON.stringify(response);
    const data = JSON.parse(response);
    console.log(data);
    insertSDWidgets(data.html);
    //console.log(data);
    // var title = getTitle(text);
    // alert("Response from CORS request to " + url + ": " + title);
  };

  xhr.onerror = function() {
    alert("Woops, there was an error making the request.");
  };

  xhr.send();
}

const getSDWidgets = urls => {
  for (let i = 0; i < urls.length; i++) {
    makeCorsRequest(urls[i]);
  }
};

const insertSDWidgets = html => {
  $(".sd-widgets-wrap").append(html);
};

getSDWidgets(sdURLs);
