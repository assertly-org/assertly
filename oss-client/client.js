import generateSelectors from "./selector-lib";
import EventRecorder from "./event-recorder";

export default class AssertlyClient {
  eventsToRecord = {
    CLICK: "click",
    CHANGE: "change",
  };

  constructor() {
    this.componentEventCache = [];
    this.previousComponent = null;
    this.previousEvent = null;
    this.dataAttribute = null;
    this.eventRecorder = new EventRecorder({
      eventsToRecord: this.eventsToRecord,
      eventCallback: this.recordEvent,
      reconcileCallback: this.reconcileEventCache,
    });
  }

  start = () => {
    this.eventRecorder.start();
  };

  clearEventCache = () => {
    this.componentEventCache = [];
  };

  reconcileEventCache = (e) => {
    const reactComponent = findReactElement(e.target);
    if (reactComponent !== this.previousComponent) {
      this.componentEventCache.forEach((msg) => {
        this.sendEvent(msg);
      });
      this.clearEventCache();
    }
  };

  getComponentName = (fiber) => {
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
    return this.getComponentName(fiber._debugOwner);
  };

  getComponentProps = (component, props = {}) => {
    if (!component) {
      functionStringify(props);
      return props;
    }
    const newProps = component.pendingProps
      ? { ...props, ...component.pendingProps }
      : props;
    delete newProps.children;

    if (
      component.type.__proto__ &&
      ["Component", "PureComponent"].includes(component.type.__proto__.name)
    ) {
      functionStringify(newProps);
      return newProps;
    }

    return this.getComponentProps(component._debugOwner, newProps);
  };

  getMessage = (reactComponent, selectors, e) => {
    const target = e.target || e.srcElement;
    const textContent = target.textContent || target.innerText;

    const props = this.getComponentProps(reactComponent);
    return {
      filename:
        reactComponent?._debugSource?.fileName &&
        reactComponent._debugSource.fileName,
      componentName: this.getComponentName(reactComponent._debugOwner),
      props,
      selector: selectors,
      value: e.target.value,
      checked: e.target.hasOwnProperty("checked") ? e.target.checked : null,
      tagName: e.target.tagName,
      tagType: e.target.type,
      action: e.type,
      keyCode: e.keyCode ? e.keyCode : null,
      href: e.target.href ? e.target.href : null,
      textContent,
      timestamp: new Date().getTime(),
      coordinates: getCoordinates(e),
    };
  };

  recordEvent = (e) => {
    if (this.previousEvent && this.previousEvent.timeStamp === e.timeStamp)
      return;
    if (e.type === "load" && e.target.nodeName === "#document") return;
    // we explicitly catch any errors and swallow them, as none node-type events are also ingested.
    // for these events we cannot generate selectors, which is OK
    try {
      const selectors = generateSelectors(e, this.dataAttribute);

      if (
        selectors &&
        selectors.length > 0 &&
        selectors[0] &&
        selectors[0].match("assertly")
      ) {
        return;
      }

      if (this.previousEvent) {
        if (
          (e.type === "change" || e.type === "click") &&
          this.previousEvent &&
          this.previousEvent.action === "click" &&
          new Date().getTime() - this.previousEvent.timestamp < 100
        ) {
          console.log("message not send due to time");
          return;
        }
      }

      const reactComponent = findReactElement(e.target);

      const msg = this.getMessage(reactComponent, selectors, e);

      localStorage.setItem("lastEvent", JSON.stringify(msg));
      this.previousEvent = msg;

      if (
        !this.previousComponent ||
        (this.previousComponent && this.previousComponent === reactComponent)
      ) {
        this.previousComponent = reactComponent;
        if (
          this.previousComponent &&
          msg.checked !== null &&
          msg.action === "click"
        ) {
          console.log("repeated click action message sent");
          this.sendEvent(msg);
          return;
        }
        this.componentEventCache.push(msg);

        return;
      } else {
        this.clearEventCache();
      }

      this.previousComponent = reactComponent;

      this.sendEvent(msg);
    } catch (e) {
      console.error("Error recording event", e);
    }
  };

  sendEvent = async (msg) => {
    const accountId = window["dataLayer"][0]["apiKey"];
    const url = `//localhost:3002/api/accounts/${accountId}/events/`;

    await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: window.location.href,
        payload: msg,
        // TODO: test set id should be set when creating/loading testset in the runner
        testSetId: "60652b19-98f3-40b4-88f7-88c71dbc788a",
      }),
    });
  };
}

function getCoordinates(evt) {
  const eventsWithCoordinates = {
    mouseup: true,
    mousedown: true,
    mousemove: true,
    mouseover: true,
  };
  return eventsWithCoordinates[evt.type]
    ? { x: evt.clientX, y: evt.clientY }
    : null;
}

// map react classes to dom elements
function findReactElement(node) {
  for (var key in node) {
    if (key.startsWith("__reactInternalInstance$")) {
      // console.log('keys in the find ReactElement', node[key])
      return node[key];
    }
  }
  return null;
}

const functionStringify = (obj) => {
  for (let k in obj) {
    if (obj[k] && {}.toString.call(obj[k]) === "[object Function]") {
      try {
        obj[k] = "" + obj[k];
      } catch (e) {
        console.error("Error stringifying prop", e);
      }
    }
  }
  stripExtraComponentProps(obj);
};

function stripExtraComponentProps(props) {
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
