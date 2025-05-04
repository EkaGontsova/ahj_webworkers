export default class DownloadStatus {
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
