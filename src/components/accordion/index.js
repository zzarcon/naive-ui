//TODO: Do it 100% JS Api https://github.com/RubaXa/Sortable/
import {$} from '../../utils';

const activeClassName = 'active';
let accordionEl;

export default (selector, options) => {
  accordionEl = $(selector);
  accordionEl.classList.add('accordion');

  addEvents();
  $('li', accordionEl).classList.add(activeClassName);
}

const addEvents = () => {
  accordionEl.addEventListener('click', onTitleClicked);
};

const onTitleClicked = (e) => {
  const target = e.target;
  const parent = target.parentElement;
  if (!target.classList.contains('accordion-title')) return;

  const current = $(`li.${activeClassName}`, accordionEl);
  if (current && current != parent) current.classList.remove(activeClassName);

  parent.classList.toggle(activeClassName);
}