(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {};

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
* TODO: admit active img 
* TODO: Styles
* TODO: Handle begining/end of navigation  
*/
var activeClassName = 'active-img';
var activeNavigator = 'active-navigator';

function getCurrentIndex(parent) {
  var current = parent.querySelector('.' + activeNavigator);
  return Array.from(current.parentElement.querySelectorAll('.navigator .navigator-item')).indexOf(current);
}

function navigate(parent, index) {
  parent.querySelector('.img-wrapper .' + activeClassName).classList.remove(activeClassName);
  parent.querySelectorAll('.img-wrapper img')[index].classList.add(activeClassName);

  parent.querySelector('.' + activeNavigator).classList.remove(activeNavigator);
  parent.querySelectorAll('.navigator .navigator-item')[index].classList.add(activeNavigator);
}

function onNavigatorItemClick() {
  return;
  var parent = this.parentElement;
  var index = Array.from(parent.children).indexOf(this);
  var current = parent.parentElement.querySelector('.img-wrapper .' + activeClassName).classList.remove(activeClassName);
  var active = parent.parentElement.querySelectorAll('.img-wrapper img')[index].classList.add(activeClassName);

  parent.querySelector('.' + activeNavigator).classList.remove(activeNavigator);
  this.classList.add(activeNavigator);
}

function createNavigator(direction) {
  var li = document.createElement('li');

  li.innerText = direction;
  li.onclick = function () {
    var parent = this.parentElement.parentElement;
    var current = getCurrentIndex(parent);
    var next = direction === '<' ? current - 1 : current + 1;

    navigate(parent, next);
  };

  return li;
}

exports.default = function () {
  var tmpl = document.getElementById('slider-template');
  var SliderProto = Object.create(HTMLElement.prototype);

  SliderProto.createdCallback = function () {
    var root = this.createShadowRoot();
    var imgs = Array.from(this.children || []);
    var content = tmpl.content;
    var imgWrapper = content.querySelector('.img-wrapper');
    var navigator = content.querySelector('.navigator');

    navigator.appendChild(createNavigator('<'));

    imgs.forEach(function (img, i) {
      var li = document.createElement('li');

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

  SliderProto.attachedCallback = function () {};

  SliderProto.detachedCallback = function () {};

  SliderProto.attributeChangedCallback = function (attrName, oldVal, newVal) {};

  var ImgSlider = document.registerElement('img-slider', {
    prototype: SliderProto
  });
};

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('../../utils');

var activeNavClassName = 'active-nav';
var activeSectionClassName = 'active-section';

function onTabClick(e) {
  var target = e.target;
  var section = target.getAttribute('data-link');
  var wrapper = this.parentElement;

  (0, _utils.$)('.active-nav', this).classList.remove(activeNavClassName);
  target.classList.add(activeNavClassName);

  (0, _utils.$)('.' + activeSectionClassName, wrapper).classList.remove(activeSectionClassName);
  (0, _utils.$)('.tab-content [data-section="' + section + '"]', wrapper).classList.add(activeSectionClassName);
}

var add = function add(element) {
  return function (name, contentHTML) {
    var nav = document.createElement('li');
    var content = document.createElement('li');

    nav.setAttribute('data-link', name);
    nav.textContent = name;
    content.innerHTML = contentHTML;
    content.setAttribute('data-section', name);

    (0, _utils.$)('.tab-nav', element).appendChild(nav);
    (0, _utils.$)('.tab-content', element).appendChild(content);
  };
};

exports.default = function () {
  var element = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
  var options = arguments[1];

  element = typeof element === 'string' ? (0, _utils.$)(element) : element;

  (0, _utils.$)('.tab-nav', element).addEventListener('click', onTabClick);

  return {
    add: add(element, options)
  };
};

},{"../../utils":5}],4:[function(require,module,exports){
'use strict';

var _carousel = require('./components/carousel');

var _carousel2 = _interopRequireDefault(_carousel);

var _slider = require('./components/slider');

var _slider2 = _interopRequireDefault(_slider);

var _tabBar = require('./components/tab-bar');

var _tabBar2 = _interopRequireDefault(_tabBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.TabBar = _tabBar2.default;

document.addEventListener("DOMContentLoaded", function () {
  (0, _slider2.default)();
});

},{"./components/carousel":1,"./components/slider":2,"./components/tab-bar":3}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var $ = exports.$ = function $(selector, element) {
  return (element || document).querySelector(selector);
};

},{}]},{},[4]);
