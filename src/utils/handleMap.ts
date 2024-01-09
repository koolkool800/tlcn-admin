export const $$ = (name: string) => {
  return document.querySelectorAll(name);
};
export const $ = (name: string) => {
  return document.querySelector(name);
};

export const $element = (element: any, value: string) => {
  return element?.querySelector(value);
};

export const $elements = (element: any, value: string) => {
  return element?.querySelectorAll(value);
};

/**
 * the event add listener for mouse enter and leave
 *
 */

export const handleGetValueFromClick = (element: any) => {
  const allGroups = $$('g[id="Group"] > g');
  let color = '';
  allGroups.forEach((item: any) => {
    if (item.getAttribute('id') === element.currentTarget.getAttribute('id')) {
      const gFirst = $element(item, 'g');
      const elementFirst = $element(gFirst, ':first-child');
      color = `${elementFirst.getAttribute('fill')}`;
      item.style.filter = 'brightness(1)';
    } else {
      item.style.filter = 'brightness(0.25)';
    }
  });
  const gs = $elements(element.currentTarget as HTMLElement, 'g');
  const sectionsName: string[] = [];
  gs.forEach((item: any) => {
    sectionsName.push(item.textContent.trim());
  });
  return {
    groupId: element.currentTarget.getAttribute('id'),
    color,
    sections: sectionsName,
  };
};

export const handleGetValueItem = (element: any) => {
  return {
    section: element.currentTarget.textContent.trim(),
    groupName: element.currentTarget.parentNode.getAttribute('id'),
  };
};

// handle active initial item in map/
export const handleActiveInitialItem = (groupId: string) => {
  const allGroups = $$('g[id="Group"] > g');
  allGroups.forEach((element: Element) => {
    if (element.getAttribute('id') === groupId) {
      (element as HTMLElement).style.filter = 'brightness(1)';
    } else {
      (element as HTMLElement).style.filter = 'brightness(0.2)';
    }
  });
};
