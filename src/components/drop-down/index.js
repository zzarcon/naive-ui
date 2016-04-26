//Include search functionality http://maxcdn.thedesigninspiration.com/wp-content/uploads/2013/08/dropdown-psd-63.jpg
//http://getbootstrap.com/components/#dropdowns
// Overlay functionality https://dev7studios.com/dropit/#

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