//Write a JS code to travers the DOM and find an element with a specified id

export const findElement = (id) => {
  const childrens = Array.from(document.body.children);
  let element;

  childrens.forEach(child => {
    if (element) return;

    let tentativeElement = findChildren(id, child);
    if (tentativeElement) {
      element = tentativeElement;
    }
  });

  return element;
}

const findChildren = (id, element) => {
  if (element.id === id) {
    console.log('founded', element);
    return element;
  }

  const childrens = element.children.length ? Array.from(element.children) : [];

  childrens.forEach(child => {
    findChildren(id, child);
  });
};