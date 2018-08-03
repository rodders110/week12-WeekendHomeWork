
var makeRequest = function(url, callback){
  console.log('request started');
  const request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.addEventListener("load", callback);
  request.send();
}

var requestComplete = function(){
  console.log('restComplete');
  if(this.status !==200){
    console.log("Error with API request: ${url}");
    return
  }
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(this.responseText, 'text/xml');
  console.log(xmlDoc);
  populateBookList(xmlDoc);
}

var clearContent = function(node){
  while (node.hasChildNodes()){
    node.removeChild(node.lastChild);
  }
}

var populateBookList = function(doc){
  let mainTag = document.getElementById('main');
  clearContent(mainTag);
  var list = doc.querySelectorAll('title');
  for(let item of list){
    let aTag = document.createElement('p');
    let bTag = document.createElement('p');
    console.log(item);
    aTag.innerHTML = item.querySelector('titleshort').innerHTML;
    mainTag.appendChild(aTag);
    let str = _.unescape(item.querySelector('flapcopy').innerHTML);
    let str2 = str.replace(/<[^>]*>?/gm, ' ');
    str2 = str2.replace(/&#8217;/gm, '\'');
    str2 = str2.replace(/&#160;/gm, '\'');
    bTag.innerText = str2;
    aTag.appendChild(bTag);
  }
}


var app = function(){
  const url = 'https://reststop.randomhouse.com/resources/titles/?search=';
  // ;
const search = document.getElementById("search_bar");

search.addEventListener("keyup", function(e) {
      if (!e) { var e = window.event; }
      e.stopImmediatePropagation(); // sometimes useful

      // Enter is pressed
      if (e.keyCode == 13) {
        makeRequest(url + search.value, requestComplete)
      }
  }, false);

}



window.addEventListener("keypress", app);
