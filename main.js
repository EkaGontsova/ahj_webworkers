/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// ./src/js/ListItem.js
class ListItem {
  constructor(item) {
    this.item = item;
    this.create();
  }
  create() {
    this.element = document.createElement('li');
    this.element.classList.add('list-item');
    const titleEl = document.createElement('div');
    titleEl.classList.add('list-item__title');
    const date = `${new Date(this.item.date).toLocaleTimeString().slice(0, -3)} ${new Date(this.item.date).toLocaleDateString()}`;
    titleEl.textContent = date;
    const imgEl = document.createElement('img');
    imgEl.classList.add('list-item__img');
    imgEl.src = this.item.img;
    imgEl.setAttribute('alt', 'афиша');
    const contentEl = document.createElement('div');
    contentEl.classList.add('list-item__content');
    contentEl.textContent = this.item.content;
    const wrapperEl = document.createElement('div');
    wrapperEl.classList.add('list-item__wrapper');
    wrapperEl.appendChild(imgEl);
    wrapperEl.appendChild(contentEl);
    this.element.appendChild(titleEl);
    this.element.appendChild(wrapperEl);
  }
}
;// ./src/js/DownloadStatus.js
class DownloadStatus {
  constructor() {
    this.element = document.createElement('li');
    this.element.classList.add('loading-item');
    this.element.innerHTML = `
      <div class="loading-item__title"></div>
      <div class="loading-item__wrapper">
        <div class="loading-item__img"></div>
        <div class="loading-item__content">
          <div class="content__string"></div>
          <div class="content__string"></div>
        </div>
      </div>`;
  }
}
;// ./src/js/List.js
/* eslint-disable no-unused-vars */


class List {
  constructor(url, element) {
    this.url = url;
    this.element = element;
  }
  init() {
    List.initSharedWorker('./worker.bundle.js');
    this.bindToDom();
    this.showDownloadInterface();
    this.update();
  }
  bindToDom() {
    this.listUpdateEl = this.element.querySelector('.list-update');
    this.onClickUpdate = this.onClickUpdate.bind(this);
    this.listUpdateEl.addEventListener('click', this.onClickUpdate);
    this.listItemsEl = this.element.querySelector('.list-items');
    this.errorEl = this.element.querySelector('.error');
  }
  async update() {
    try {
      const responseJson = await fetch(this.url);
      if (responseJson.ok) {
        const response = await responseJson.json();
        this.items = response;
        this.renderItems();
      }
    } catch (error) {
      this.showError();
    }
  }
  renderItem(item) {
    const itemEl = new ListItem(item);
    this.listItemsEl.appendChild(itemEl.element);
  }
  renderItems() {
    this.clear();
    this.items.forEach(item => this.renderItem(item));
  }
  clear() {
    [...this.listItemsEl.children].forEach(el => el.remove());
  }
  onClickUpdate(e) {
    e.preventDefault();
    this.showDownloadInterface();
    this.update();
  }
  showDownloadInterface() {
    this.clear();
    for (let i = 0; i < 3; i += 1) {
      this.listItemsEl.appendChild(new DownloadStatus().element);
    }
  }
  showError() {
    this.errorEl.classList.remove('hidden');
  }
  hideError() {
    this.errorEl.classList.add('hidden');
  }
  static initSharedWorker(worker) {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register(worker, {
        scope: './'
      }).then(reg => {}).catch(error => {});
    }
  }
}
;// ./src/js/app.js

const url = 'https://ahj-webworkers-server.onrender.com/films/new';
const container = document.querySelector('.page');
const list = new List(url, container);
list.init();
;// ./src/index.js


/******/ })()
;