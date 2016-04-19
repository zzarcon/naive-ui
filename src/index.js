import carousel from './components/carousel';
import slider from './components/slider';
import TabBar from './components/tab-bar';
import Tree from './components/tree';

window.TabBar = TabBar;
window.Tree = Tree;

document.addEventListener("DOMContentLoaded", () => {
  slider();
});