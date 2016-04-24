import carousel from './components/carousel';
import slider from './components/slider';
import TabBar from './components/tab-bar';
import Tree from './components/tree';
import Tags from './components/tags';
import Accordion from './components/accordion';

window.Tags = Tags;
window.TabBar = TabBar;
window.Tree = Tree;
window.Accordion = Accordion;

document.addEventListener("DOMContentLoaded", () => {
  slider();
});