import {$} from '../../utils';

const activeNavClassName = 'active-nav';
const activeSectionClassName = 'active-section';
const actions = [];

function onTabClick(e) {
  const target = e.target;
  const section = target.getAttribute('data-link');
  const wrapper = this.parentElement;

  $('.active-nav', this).classList.remove(activeNavClassName);
  target.classList.add(activeNavClassName);

  $(`.${activeSectionClassName}`, wrapper).classList.remove(activeSectionClassName);
  $(`.tab-content [data-section="${section}"]`, wrapper).classList.add(activeSectionClassName);
}

const add = (element) => {
  return (name, contentHTML) => {
    const nav = document.createElement('li');
    const content = document.createElement('li');

    nav.setAttribute('data-link', name);
    nav.textContent = name;
    content.innerHTML = contentHTML;    
    content.setAttribute('data-section', name);

    $('.tab-nav', element).appendChild(nav);
    $('.tab-content', element).appendChild(content);

    actions.push(name);
  }
}

const undo = (element) => {
  return () => {
    const name = actions.pop();
    if (!name) return;

    $(`.tab-nav [data-link="${name}"]`, element).remove();
    $(`.tab-content [data-section="${name}"]`, element).remove();
  };
};

export default (element = '', options) => {
  element = typeof element === 'string' ? $(element) : element;

  $('.tab-nav', element).addEventListener('click', onTabClick);

  return {
    add: add(element),
    undo: undo(element)
  };
}