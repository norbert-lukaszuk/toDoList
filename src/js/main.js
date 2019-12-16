"use strict";

import { type } from "os";

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
let input = document.querySelector('.input')
let taskObject={
  taskName: '',
  key: '',
  taskClass:  [],
  containerClass: [],
  timeStamp: null,
}


input.addEventListener('submit', e =>{
    e.preventDefault();
    taskObject.taskName = input.form.value;
    taskObject.key = taskObject.taskName;
    input.reset();
    taskObject.containerClass = ['container'];
    taskObject.taskClass = '';
    const container = document.createElement('div');
    ul.prepend(container);
    container.classList.add(taskObject.containerClass);
    const timeStamp = new Date();
    taskObject.timeStamp = timeStamp.getTime();
    const now = new Date();
    const timeDiff = now - timeStamp;
    const timeCount = document.createElement('span');
    container.appendChild(timeCount);
    timeCount.classList.add('clock');
    timeCount.innerText = `${Math.round(timeDiff/1000/60)} m. ago`;
    const taskName = document.createElement('span');
    container.appendChild(taskName);
    taskName.classList.add('item');
    taskName.innerText = taskObject.taskName;
    taskObject.taskClass = ['item'];
    const delButton = document.createElement('span');
    container.appendChild(delButton);
    delButton.classList.add('delete');
    delButton.innerText = 'X';
    
    const stringify = JSON.stringify(taskObject);
    localStorage.setItem(taskObject.key, stringify);
})


 for(let i=0; i<localStorage.length;i++){  //pętla iterujące przez localStorage
  // get data from localStorage
  const local = localStorage.getItem(localStorage.key(i));//pobranie z localStorage elementu o danym w pętli kluczu
  const taskObject = JSON.parse(local);//parsowanie do obiektu
  // container create
  const container = document.createElement('div');
  ul.prepend(container);
  const containerClass = taskObject.containerClass;
  container.classList.add(...containerClass);
  // time stamp
  let now = new Date();
  let timeStamp = taskObject.timeStamp;
  let timeDiff = now.getTime() - timeStamp;
  const timeCount = document.createElement('span');
  container.appendChild(timeCount);
  timeCount.classList.add('clock');
  timeCount.innerText = `${Math.round(timeDiff/1000/60)} m. ago`;
  // task create
  const taskName = document.createElement('span');
  container.appendChild(taskName);
  taskName.innerText = taskObject.taskName;
  const taskClass = taskObject.taskClass;
  taskName.classList.add(...taskClass);
  // del button create
  const delButton = document.createElement('span');
  container.appendChild(delButton);
  delButton.classList.add('delete');
  delButton.innerText = 'X';
  
}


ul.addEventListener('click', e=>{
  const key = e.target.textContent;
  const local = localStorage.getItem(key);
  let taskObject = JSON.parse(local);

if(e.target.tagName === 'SPAN' && e.target.classList.contains('delete')){
  let key = e.target.previousElementSibling.textContent;//element obok, przed tym
  localStorage.removeItem(key);
  e.target.parentElement.remove();
}

if(e.target.tagName === 'SPAN' && e.target.classList.contains('item')){
  
  e.target.classList.toggle('itemDone');
  let taskClass = e.target.classList.value;
  taskObject.taskClass = taskClass.split(' ');
  e.target.parentElement.classList.toggle('containerDone');
  e.target.previousSibling.classList.toggle('clockHide');
  let containerClass = e.target.parentElement.classList.value;
  taskObject.containerClass = containerClass.split(' ');
  let stringify = JSON.stringify(taskObject);
  localStorage.setItem(key, stringify);
  
}
if(e.target.tagName === 'DIV' && e.target.classList.contains('container') || e.target.classList.contains('containerDone') ){
  e.target.classList.toggle('containerDone');
  let containerClass = e.target.classList.value;
  e.target.firstChild.classList.toggle('itemDone');
  let taskClass = e.target.firstChild.classList.value;
  // console.log(e.target.firstChild.classList.value);
  taskObject.taskClass = taskClass.split(' ');
  console.log(taskClass);
  let stringify = JSON.stringify(taskObject);
  localStorage.setItem(key, stringify);

 
}
})

