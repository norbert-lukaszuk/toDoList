"use strict";

// service worker registration - remove if you're not going to use it

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('serviceworker.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

const ul = document.querySelector('ul');

const addButon = document.querySelector('.button');

/* for(let i=0; i<localStorage.length;i++){  
  const div = document.createElement('div');
  const local = localStorage.getItem(localStorage.key(i));
  const object = JSON.parse(local);
  
  let task = object.task;
  div.textContent = task;
  div.setAttribute('class',object.class);
  ul.prepend(div);
} */

addButon.addEventListener('click',(e)=>{
  const container = document.createElement('div');
  const del = document.createElement('span');
  const item = document.createElement('span');
  const form = document.getElementById('toList');
  const key = form.value;
  let object={
    class: '',
    item: '',
    status: 'notDone',
  }
  object.item = form.value;
  object.class = 'item';
  const stringify = JSON.stringify(object);
  localStorage.setItem(key,stringify);
  // const parse = JSON.parse(stringify);
  item.textContent = object.item;
  // item.textContent=form.value;
  // container.setAttribute('class', object.class);
  ul.prepend(container);
  // li.appendChild(container);
  container.appendChild(item);
  container.appendChild(del);
  container.classList.add('container');
  del.classList.add('delete');
  item.classList.add('item');
  item.classList.add(object.class);
  // li.classList.add('notDone');
  del.textContent = 'X';
  form.value = '';
})

ul.addEventListener('click', e=>{
  const key = e.target.textContent;
  const local = localStorage.getItem(key);
  let object = JSON.parse(local);

if(e.target.tagName === 'SPAN' && e.target.classList.contains('delete')){
  let key = e.target.previousElementSibling.textContent;//element obok, przed tym
  localStorage.removeItem(key);
  e.target.parentElement.remove();
}

if(e.target.tagName === 'SPAN' && e.target.classList.contains('item')){
  e.target.classList.toggle('lineTrough');
  e.target.parentElement.classList.toggle('done');
  
  // const spanAtr = e.target.removeAttribute('class');
 
}
if(e.target.tagName === 'DIV' && e.target.classList.contains('container')){
  
  e.target.classList.toggle('done');
  e.target.firstChild.classList.toggle('lineTrough');
  const attr = e.target.getAttribute('class');
   
  
  
  
 /*  if(attr === 'notDone'){
  e.target.setAttribute('class','lineTrough');
  object.class = 'lineTrough';
  // e.target.setAttribute('style','width: 200px;');
  // localStorage.setItem(name,JSON.stringify(object));
  console.log(object.class);

}
 if(attr === 'lineTrough'){
  // e.target.removeAttribute('class');
  e.target.setAttribute('class','notDone');
  object.class = 'notDone';
  console.log(object.class);

}  */

// localStorage.setItem(name,JSON.stringify(object));
  // localStorage.setItem('atr',attr);
  // console.log(attr);
  // alert(attr);
}
})

ul.addEventListener('dblclick',(e)=>{
  if(e.target.tagName === 'DIV'){
    e.target.remove();
    
  }
  const name = e.target.innerText;
    console.log(name);
    localStorage.removeItem(name);
})