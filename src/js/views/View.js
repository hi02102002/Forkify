import icon from '../../img/icons.svg';

export default class View {
  _data;
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }
    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDom = document.createRange().createContextualFragment(newMarkup);

    const newELs = Array.from(newDom.querySelectorAll('*')); // tao ra dom ao
    const curELs = Array.from(this._parentEl.querySelectorAll('*'));

    newELs.forEach((newEl, i) => {
      const curEL = curELs[i];
      if (
        !newEl.isEqualNode(curEL) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEL.textContent = newEl.textContent;
      }

      if (!newEl.isEqualNode(curEL)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEL.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentEl.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
            <div class="spinner">
            <svg>
              <use href="${icon}#icon-loader"></use>
            </svg>
          </div> 
        `;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errMessage) {
    const markup = `
    <div class="error">
            <div>
              <svg>
                <use href="src/img/icons.svg#${icon}-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div> 
    
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
    <div class="message">
            <div>
              <svg>
                <use href="src/img/icons.svg#${icon}-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div> 
    
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}
