import carousel from './components/carousel';
import slider from './components/slider';
import TabBar from './components/tab-bar';

window.TabBar = TabBar;

document.addEventListener("DOMContentLoaded", () => {
  slider();
});