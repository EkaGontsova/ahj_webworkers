export default class ListItem {
  constructor(item) {
    this.item = item;
    this.create();
  }

  create() {
    this.element = document.createElement('li');
    this.element.classList.add('list-item');
    const titleEl = document.createElement('div');
    titleEl.classList.add('list-item__title');
    const date = `${new Date(this.item.date).toLocaleTimeString().slice(0, -3)
    } ${
      new Date(this.item.date).toLocaleDateString()}`;
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
