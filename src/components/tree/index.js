export default class {
  constructor(element, object) {
    this.element = element;

    const html = this.render(object);

    this.element.innerHTML = `<ul class="tree">${html}</ul>`;

    this.addEvents();
  }

  render(treeObject) {
    if (treeObject instanceof Array) {
      treeObject = treeObject.reduce((prev, current, i) => {
        prev[i] = current;
        return prev;  
      }, {});
    }

    const html = Object.keys(treeObject).map(k => {
      let value = treeObject[k];
      if (typeof value === 'object') {
        const childs = this.render(value);
        return `<div class="tree-parent">
                 <div class="tree-title">+ ${k}</div>
                 <ul>${childs}</ul>
                </div>`;
      }

      return `<li>${k}: ${value}</li>`;
    });

    return html.join('');
  }

  addEvents() {
    const parents = [...this.element.querySelectorAll('.tree-title')];

    parents.forEach(p => {
      p.addEventListener('click', function() {
        const parent = this.parentElement;
        const text = (parent.classList.contains('visible') ? '+' : '-') + ' ' + this.textContent.substring(2);

        this.textContent = text;
        parent.classList.toggle('visible');
      });
    });
  }
}