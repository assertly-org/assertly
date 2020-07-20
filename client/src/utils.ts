import Coordinates from "./types/Coordinates";

export function getComponentInfo(component: any, maxNest: number, resultArray: any): any {
  

  // console.log('findFileName: ', component)

  if (!component || maxNest === 0) {
    // console.log('resultArray: ', resultArray)
    return resultArray
  }

  if (component?._debugSource?.fileName) {
    // the owner of the node where the 'source' filename exists is the file that you want the props for 
    const props = getComponentProps(component?._debugOwner)
    const name = getComponentName(component?._debugOwner)
    resultArray.push({
      filename: component?._debugSource?.fileName, 
      // the line number is really for the next component down in the tree that is being called from the 'filename'
      linenumber: component?._debugSource?.lineNumber, 
      props: props, 
      componentName: name})
    return getComponentInfo(component?._debugOwner,maxNest-1,resultArray)
  } else {
    return getComponentInfo(component?._debugOwner,maxNest-1,resultArray)
  }

}

export function getComponentProps(component: any, props = {}): any {
  if (!component) {
    functionStringify(props);
    return props;
  }

  const newProps = component.pendingProps
    ? { ...props, ...component.pendingProps }
    : props;
  delete newProps.children;

  if (
    component?.type?.__proto__ &&
    ["Component", "PureComponent"].includes(component.type.__proto__.name)
  ) {
    functionStringify(newProps);
    return newProps;
  }

  return getComponentProps(component._debugOwner, newProps);
}

export function getComponentName(fiber: any): any {
  if (!fiber) return null;

  if (fiber.elementType && fiber.elementType.name) {
    return fiber.elementType.name;
  }

  if (fiber.elementType && fiber.elementType.displayName) {
    return fiber.elementType.displayName;
  }

  if (fiber.type.displayName) {
    return fiber.type.displayName;
  }

  if (fiber.type.name) {
    return fiber.type.name;
  }
  return getComponentName(fiber._debugOwner);
}

const eventsWithCoordinates: { [key: string]: any } = {
  mouseup: true,
  mousedown: true,
  mousemove: true,
  mouseover: true,
};

export function getCoordinates(event: Event): Coordinates | null {
  const mouseEvent = event as MouseEvent;

  return eventsWithCoordinates[event.type]
    ? { x: mouseEvent.clientX, y: mouseEvent.clientY }
    : null;
}

// map react classes to dom elements
export function findReactElement(target: EventTarget): any {
  // console.dir(target)
  const key = Object.keys(target).find((key) =>
    key.startsWith("__reactInternalInstance$")
  );
  // console.log('key: ', key)
  // creates an object out of the target passed
  const targetMap = target as { [key: string]: any };

  const internalInstance = key ? targetMap[key] : null;
  console.log('React Node if Found: ', internalInstance)
  if (internalInstance == null) return null;

  // console.log('internalInstance2: ', internalInstance)
  // return internalInstance._debugOwner
  //   ? internalInstance._debugOwner.stateNode
  //   : internalInstance.return.stateNode;

  return internalInstance;

  // for (let key: string in target) {
  //   if (key.startsWith("__reactInternalInstance$")) {
  //     // console.log('keys in the find ReactElement', target[key])
  //     return target[key];
  //   }
  // }
  // return null;
}

export function functionStringify(obj: any): void {
  for (let k in obj) {
    if (obj[k] && {}.toString.call(obj[k]) === "[object Function]") {
      try {
        // obj[k] = "" + obj[k];
        obj[k] = "[Function]"
      } catch (e) {
        console.error("Error stringifying prop", e);
      }
    }
  }
  stripExtraComponentProps(obj);
}



function stripExtraComponentProps(props: any): void {
  const keys = Object.keys(props);
  for (const key of keys) {
    if (
      Object.prototype.toString.call(props[key]) === "[object Object]" &&
      (props[key].hasOwnProperty("_owner") ||
        key === "inputRef" ||
        key === "InputProps")
    ) {
      delete props[key];
    }
  }
}
