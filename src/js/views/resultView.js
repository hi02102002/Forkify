import View from './View';
import previewView from './previewView.js';
import icon from '../../img/icons.svg';

class ResultView extends View {
  _parentEl = document.querySelector('.results');
  _errMessage = 'No recipes found for your query! please try again!!!';
  _message = '';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultView();
