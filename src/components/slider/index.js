  /**
 * TODO: admit active img 
 * TODO: Styles
 * TODO: Handle begining/end of navigation
 */
const activeClassName = 'active-img';
const activeNavigator = 'active-navigator';

function getCurrentIndex(parent) {
  const current = parent.querySelector(`.${activeNavigator}`);
  return Array.from(current.parentElement.querySelectorAll('.navigator .navigator-item')).indexOf(current);
}

function navigate(parent, index) {
  parent.querySelector(`.img-wrapper .${activeClassName}`).classList.remove(activeClassName);
  parent.querySelectorAll('.img-wrapper img')[index].classList.add(activeClassName);

  parent.querySelector(`.${activeNavigator}`).classList.remove(activeNavigator);
  parent.querySelectorAll('.navigator .navigator-item')[index].classList.add(activeNavigator);
}

function onNavigatorItemClick() {
  return
  const parent = this.parentElement;
  const index = Array.from(parent.children).indexOf(this);
  const current = parent.parentElement.querySelector(`.img-wrapper .${activeClassName}`).classList.remove(activeClassName);
  const active = parent.parentElement.querySelectorAll('.img-wrapper img')[index].classList.add(activeClassName);

  parent.querySelector(`.${activeNavigator}`).classList.remove(activeNavigator);
  this.classList.add(activeNavigator);
}

function createNavigator(direction) {
  let li = document.createElement('li');

  li.innerText = direction;
  li.onclick = function() {
    const parent = this.parentElement.parentElement;
    const current = getCurrentIndex(parent);
    const next = direction === '<' ? current - 1 : current + 1;
    
    navigate(parent, next);
  };

  return li;
}

export default () => {
  var tmpl = document.getElementById('slider-template');
  var SliderProto = Object.create(HTMLElement.prototype);

  SliderProto.createdCallback = function() {
    const root = this.createShadowRoot();
    const imgs = Array.from(this.children || []);
    const content = tmpl.content;
    const imgWrapper = content.querySelector('.img-wrapper');
    const navigator = content.querySelector('.navigator');

    navigator.appendChild(createNavigator('<'));

    imgs.forEach((img, i) => {
      let li = document.createElement('li');

      if (i === 0) {
        img.classList.add(activeClassName);
        li.classList.add(activeNavigator);
      }

      imgWrapper.appendChild(img);
      li.classList.add('navigator-item');
      li.innerText = i + 1;
      li.onclick = onNavigatorItemClick;
      navigator.appendChild(li);
    });

    navigator.appendChild(createNavigator('>'));

    root.appendChild(content);
  };

  SliderProto.attachedCallback = function() {

  };

  SliderProto.detachedCallback = function() {

  };

  SliderProto.attributeChangedCallback = function(attrName, oldVal, newVal) {

  };

  var ImgSlider = document.registerElement('img-slider', {
    prototype: SliderProto
  });
}