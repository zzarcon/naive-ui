// Input which support tags http://bevacqua.github.io/insignia/
// http://new.tinygrab.com/e14c28c920edb44f44899492d460693664df28e50c.png
import {$} from '../../utils';
const deleteCode = 8;
const defaultOptions = {
  delimiter: ' '
};
let options;
let tagWrapper;
let container;
let input; 

export default (selector, userOptions) => {
  options = Object.assign({}, userOptions, defaultOptions);

  input = $(selector);
  const parent = input.parentElement;

  tagWrapper = document.createElement('span');
  container = document.createElement('div');

  container.classList.add('tg-container');
  tagWrapper.classList.add('tg-before');

  parent.insertBefore(container, input);
  container.appendChild(tagWrapper);
  container.appendChild(input);

  input.classList.add('tg-input');
  // input.addEventListener('keydown', onKey);
  input.addEventListener('keyup', onKey);
  parent.addEventListener('click', onContainerClick);
};

function onContainerClick(e) {
  input.focus();
}

function onKey(e) {
  const val = this.value;
  const lastChar = val.substr(-1);
  const code = e.keyCode;
  const isDel = code === deleteCode;
  const isDelimiter = lastChar === options.delimiter;

  if (isDel && val.length <= 0) {
    removeTag();
  } 

  if (val && isDelimiter) {
    addTag(val.trim());
    this.value = '';
  }
}

const addTag = (val) => {
  const tag = document.createElement('span');

  tag.classList.add('tg-tag');
  tag.textContent = val;
  tagWrapper.appendChild(tag);
};

const removeTag = () => {
  const lastTag = $('.tg-tag:last-child', tagWrapper);

  if (lastTag) {
    input.value = lastTag.textContent;
    lastTag.remove();
  }
}