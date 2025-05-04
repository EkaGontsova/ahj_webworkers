/* eslint-disable no-unused-vars */
import ListItem from './ListItem';
import DownloadInterface from './DownloadStatus';

export default class List {
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
    this.items.forEach((item) => this.renderItem(item));
  }

  clear() {
    [...this.listItemsEl.children].forEach((el) => el.remove());
  }

  onClickUpdate(e) {
    e.preventDefault();
    this.showDownloadInterface();
    this.update();
  }

  showDownloadInterface() {
    this.clear();
    for (let i = 0; i < 3; i += 1) {
      this.listItemsEl.appendChild(new DownloadInterface().element);
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
      navigator.serviceWorker
        .register(worker, { scope: './' })
        .then((reg) => {
        })
        .catch((error) => {
        });
    }
  }
}
