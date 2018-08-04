
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
    console.log(`No content found`);
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
    let cTag = document.createElement('p');
    let imgTag = document.createElement('img');
    console.log(item);
    aTag.className = 'heading';
    aTag.innerHTML = item.querySelector('titleshort').innerHTML + " - " + item.querySelector('authorweb').innerHTML ;
    mainTag.appendChild(aTag);
    let str = item.querySelector('flapcopy').innerHTML;
    str2 = _.unescape(str);
    cTag.innerHTML = str2;
    mainTag.appendChild(cTag);
    let urlStr = 'https://reststop.randomhouse.com/resources/titles/' + item.querySelector('isbn').innerHTML;
    imgTag.src = urlStr;
    mainTag.appendChild(imgTag);
    imgTag.addEventListener('click', function(){
      populateBookInfo(item);
    });
    
  }
}

var populateBookInfo = function(book){
  let url = 'https://reststop.randomhouse.com/resources/';
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
