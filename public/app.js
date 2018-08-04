
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
    let bTag = document.createElement('p');
    let cTag = document.createElement('p');
    let imgTag = document.createElement('img');
    let author = document.createElement('p');
    author.className = 'author';
    console.log(item);
    aTag.className = 'heading';
    author.innerHTML = item.querySelector('authorweb').innerHTML;
    aTag.innerHTML = item.querySelector('titleshort').innerHTML;
    mainTag.appendChild(aTag);
    aTag.appendChild(author);
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
    author.addEventListener('click', function(){ 
      populateAuthorInfo(item);
    });
  }
}

var populateBookInfo = function(book){
  let mainTag = document.getElementById('main');
  clearContent(mainTag);
  let title = document.createElement('h1');
  title.innerText = `Excerpt from ${book.querySelector('titleshort').innerHTML}`;
  mainTag.appendChild(title);
  let example = document.createElement('p');
  example.innerHTML = _.unescape(book.querySelector('excerpt').innerHTML);
  mainTag.appendChild(example);
}

var populateAuthorInfo = function(book){
  let mainTag = document.getElementById('main');
  clearContent(mainTag);
  let title = document.createElement('h1');
  title.innerText = `About ${book.querySelector('authorweb').innerHTML}`;
  mainTag.appendChild(title);
  let example = document.createElement('p');
  example.innerHTML = _.unescape(book.querySelector('authorbio').innerHTML);
  mainTag.appendChild(example);
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
