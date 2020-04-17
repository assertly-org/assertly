const generateSelectors = (e, dataAttribute) => {
  if (!e || !e.target || !e.target.hasAttribute) {
    console.error('no valid event passed to generateSelectors', e);
    return;
  }

  let { selectors, uniqueSelectors } = generateSingleNodeSelector(e.target, dataAttribute);
  let allSelectors = uniqueSelectors;

  const recurseDepth = 5;
  let nodePointer = e.target;
  const nestedSingleSelectors = [selectors];
  for (let x = 0; x < recurseDepth; x++) {
    nodePointer = nodePointer.parentNode;
    if (nodePointer) {
      const parentSelectorRes = generateSingleNodeSelector(nodePointer, dataAttribute);
      nestedSingleSelectors.unshift(parentSelectorRes.selectors);
    }
  }

  // console.log('built selector hierarchy', JSON.stringify(nestedSingleSelectors));
  const nestedSelectors = generateNestedSelectors(nestedSingleSelectors);
  allSelectors = allSelectors.concat(nestedSelectors);

  return allSelectors;
};

// selector for a single dom node
const generateSingleNodeSelector = (node, dataAttribute) => {
  let selectors = [];

  const priority = [dataAttribute, 'id', 'data-', 'class', 'href', 'src'];
  const ignoreList = ['data-reactid', 'data-react-checksum'];

  const attributes = node ? node.attributes : [];
  const prioritySortedAttributes = attributes
    ? prioritizeAttributes(attributes, priority, ignoreList)
    : [];

  for (let x = 0; x < prioritySortedAttributes.length; x++) {
    const attr = prioritySortedAttributes[x];

    // priority is specified dataAttribute
    if (attr.name === dataAttribute) {
      selectors.push(formatDataSelector(node, dataAttribute));
    }

    // next priority is ID
    if (attr.name === 'id') {
      selectors.push(`#${node.id}`);
    }

    // data attribute non-specified to Assertly
    if (attr.name.match(/^data-/)) {
      selectors.push(`[${attr.name}="${attr.value}"]`);
    }

    // css class
    if (attr.name === 'class') {
      const className = attr.value.trim().replace(/\s+/g, '.');
      selectors.push(`.${className}`);
    }

    // remaining selectors
    if (attr.name === 'href' || attr.name === 'src') {
      selectors.push(`[${attr.name}="${attr.value}"]`);
    }
  }

  const uniqueSelectors = checkSelectorUniqueness(selectors, node);

  return { selectors, uniqueSelectors };
};

// a specified data attribute (data-test-id) is more specific than ID, which is better than a css class, etc.
const prioritizeAttributes = (attributes, priority, ignoreList) => {
  const sortedKeys = Object.keys(attributes).sort((curr, next) => {
    let currPos = priority.indexOf(attributes[curr].name);
    let nextPos = priority.indexOf(attributes[next].name);

    // deal with regex where indexOf is doing a string match only
    if (currPos === -1 && attributes[curr].name.match(/^data-/)) {
      currPos = priority.indexOf('data-');
    }
    if (nextPos === -1 && attributes[next].name.match(/^data-/)) {
      nextPos = priority.indexOf('data-');
    }

    if (nextPos === -1) {
      if (currPos === -1) {
        return 0;
      }
      return -1;
    }
    return currPos - nextPos;
  });

  // remove items from the attributes that are on the ignoreList
  const ignoreRemovedList = [];
  for (let x = 0; x < sortedKeys.length; x++) {
    const key = sortedKeys[x];

    let ignored = false;
    for (let y = 0; y < ignoreList.length; y++) {
      if (attributes[key].name === ignoreList[y]) {
        ignored = true;
      }
    }

    if (!ignored) {
      ignoreRemovedList.push(attributes[key]);
    }
  }

  return ignoreRemovedList;
};

// selectors might not be unique so validate or try to increase specificity
const checkSelectorUniqueness = (selectors, node) => {
  let uniqueSelectors = [];
  selectors.forEach(selector => {
    const nodeList = document.querySelectorAll(selector);
    if (nodeList.length === 1) {
      uniqueSelectors.push(selector);
    } else if (nodeList.length > 1) {
      const increasedSpecificityUniqueSelectors = increaseSelectorSpecificity(selector, node);
      uniqueSelectors = uniqueSelectors.concat(increasedSpecificityUniqueSelectors);
    }
  });

  return uniqueSelectors;
};

// attempt to make the selector more specific to get a single unique DOM element
const increaseSelectorSpecificity = (selector, node) => {
  let prefix = node.nodeName.toLowerCase();
  if (node.type) {
    prefix = `${prefix}[type="${node.type}"]`;
  }
  const addElTypeSelector = `${prefix}${selector}`;
  const nodeList = document.querySelectorAll(addElTypeSelector);
  if (nodeList.length === 1) {
    return [addElTypeSelector];
  } else {
    const additionalSpecificityAttributes = ['placeholder', 'href', 'src'];
    for (let x = 0; x < additionalSpecificityAttributes.length; x++) {
      const attr = additionalSpecificityAttributes[x];
      if (node[attr]) {
        const selectorAttempt = `${addElTypeSelector}[${attr}="${node[attr]}"]`;
        const selectorAttemptNodeList = document.querySelectorAll(selectorAttempt);
        if (selectorAttemptNodeList.length === 1) {
          return [selectorAttempt];
        }
      }
    }
  }
  return [];
};

// if a node does not have a unique selector, the dom hierarchy might produce a unique nested selector
const generateNestedSelectors = selectors => {
  const nestedSelectors = iterateNestedSelectors(selectors);
  return nestedSelectors;
};

const iterateNestedSelectors = nodeSelectors => {
  if (nodeSelectors.length === 0) {
    return [];
  }

  let nestedSelectors = [];

  const currNodeSelectors = nodeSelectors.shift();
  // iterate each selector on this dom element
  for (let x = 0; x < currNodeSelectors.length; x++) {
    const currNodeSelector = currNodeSelectors[x];
    if (currNodeSelector) {
      let currHierarchicalSelector = currNodeSelector;
      // iterate existing nested selectors
      for (let y = 0; y < nodeSelectors.length; y++) {
        const nodeSelector = nodeSelectors[y];
        if (nodeSelector && nodeSelector.length > 0) {
          currHierarchicalSelector += ' ' + nodeSelector;
        }
      }

      nestedSelectors.push(currHierarchicalSelector);
    }
  }

  if (nodeSelectors && nodeSelectors.length) {
    const recursiveNodeSelectors = iterateNestedSelectors(nodeSelectors);
    nestedSelectors = nestedSelectors.concat(recursiveNodeSelectors);
  }

  return nestedSelectors;
};

const formatDataSelector = (element, attribute) => {
  return `[${attribute}="${element.getAttribute(attribute)}"]`;
};

export default generateSelectors;
