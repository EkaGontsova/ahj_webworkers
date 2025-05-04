import List from './List';

const url = 'https://ahj-webworkers-server.onrender.com/films/new';

const container = document.querySelector('.page');

const list = new List(url, container);

list.init();
