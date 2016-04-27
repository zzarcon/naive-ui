//Include search functionality http://maxcdn.thedesigninspiration.com/wp-content/uploads/2013/08/dropdown-psd-63.jpg
//http://getbootstrap.com/components/#dropdowns
// Overlay functionality https://dev7studios.com/dropit/#

const $ = window.$ = {fn: {}};

$.fn.drop = function(options) {
  options = $.extend($.fn.drop.options, options);
  const element = $(this);
  const button = element.find('.drop-button');
  const items = element.find('.drop-items');
  
  element.addClass('drop-wrapper');
  element.data('options', options);

  button.on('click', () => {
    element.toggleClass('active');
  });

  items.on('click', function(e) {
    const {target} = e;

    options.onClick(target);
  });

  if (options.hover) {
    element.on('mouseover', () => {
      console.log('over');
      element.addClass('active');
    });
    element.on('mouseleave', () => {
      element.removeClass('active');
    });
  }

  return this;
};

$.fn.drop.options = {
  hover: false,
  overlay: false,
  onClick: () => {}
};

$.fn.search = function(options = {results: []}) {
  const element = $(this);
  const input = element.find('.search-input');
  const {results} = options;
  const resultsHtml = results.map(r => {
    return `<li class="search-result">${r}</li>`;
  }).join('');
  
  element.addClass('searchable');
  element.append(`
    <ul class="search-results-wrapper">${resultsHtml}</ul>
    <div class="search-empty">No results</div>
  `);  

  input.on('keyup', function(e) {
    const input = $(this);
    if (e.keyCode === 27) {
      input.val('');
    }

    const value = input.val();
    const matches = results.filter(r => r.includes(value));
    const wrapperAction = value ? 'show' : 'hide';
    const noResultsAction = matches.length ? 'hide' : 'show';

    element.find('.search-results-wrapper')[wrapperAction]();
    element.find('.search-empty')[noResultsAction]();

    element.find('.search-result').each(function(_, result) {
      let el = $(result);
      const action = matches.includes(el.text()) ? 'show' : 'hide';

      el[action]();
    });
  });
};
