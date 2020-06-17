import {
  findReactElement,
  getCoordinates,
  getComponentName,
  getComponentProps,
  getComponentFileName
} from "./utils";


import EventRecorder from "./event-recorder";
import ClientInterface from "./types/Client";
import Message from "./types/Message";
import { EventType } from "./types/EventType";

interface Component {}

export default class AssertlyClient implements ClientInterface {
  eventsToRecord: EventType[] = ["click", "change"];

  private eventRecorder: EventRecorder;
  private componentEventCache: Message[] = [];
  private previousComponent: Component | null = null;
  private previousMsg: Message | null = null;

  constructor() {
    this.eventRecorder = new EventRecorder({
      recordEvents: this.eventsToRecord,
      eventCallback: this.recordEvent,
      reconcileCallback: this.reconcileEventCache,
    });
  }

  start = () => {
    this.eventRecorder.start();
  };

  stop = () => {
    this.eventRecorder.stop();
  };

  clearEventCache = () => {
    this.componentEventCache = [];
  };

  reconcileEventCache = (event: Event) => {
    const reactComponent = event.target ? findReactElement(event.target) : null;
    if (reactComponent !== this.previousComponent) {
      this.componentEventCache.forEach((msg) => {
        this.sendEvent(msg);
      });
      this.clearEventCache();
    }
  };

  getMessage = (reactComponent: any, event: KeyboardEvent | Event): Message => {
    const target = event.target || event.srcElement;
    const inputTarget = target as HTMLInputElement;
    const linkTarget = target as HTMLLinkElement;

    const props = getComponentProps(reactComponent);
    return {
      action: event.type,
      checked: event?.target?.hasOwnProperty("checked")
        ? inputTarget.checked
        : null,
      componentName: getComponentName(reactComponent?._debugOwner),
      coordinates: getCoordinates(event),
      // filename: reactComponent?._debugSource?.fileName,
      filename: getComponentFileName(reactComponent,10)?.filename,
      linenumber: getComponentFileName(reactComponent,10)?.linenumber,
      href: linkTarget.href ? linkTarget.href : null,
      keyCode: (event as KeyboardEvent).keyCode
        ? (event as KeyboardEvent).keyCode
        : null,
      props,
      tagName: inputTarget.tagName,
      tagType: inputTarget.type,
      textContent: inputTarget.textContent || inputTarget.innerText,
      timestamp: new Date().getTime(),
      value: inputTarget.value,
    };
  };

  recordEvent = (event: Event) => {
    const nodeTarget = event.target as Node;

    if (this.previousMsg && this.previousMsg.timestamp === event.timeStamp)
      return;
    if (event.type === "load" && nodeTarget.nodeName === "#document") return;

    if (!event.target) return;

    try {
      if (this.previousMsg) {
        if (
          (event.type === "change" || event.type === "click") &&
          this.previousMsg &&
          this.previousMsg.action === "click" &&
          new Date().getTime() - this.previousMsg.timestamp < 100
        ) {
          console.log("message not send due to time");
          return;
        }
      }

      const reactComponent = findReactElement(event.target);
      console.log('reactComponent: ', reactComponent)
      const msg: Message = this.getMessage(reactComponent, event);
      console.log('record event msg', msg)

      localStorage.setItem("lastEvent", JSON.stringify(msg));
      this.previousMsg = msg;

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

  sendEvent = async (message: Message) => {
    // const accountId = window["dataLayer"][0]["apiKey"];
    const accountId = (window as { [key: string]: any })["dataLayer"][0]["apiKey"]
    const url = `//localhost:3002/api/accounts/${accountId}/events/`;
    // console.log('this is the sendEvent', message)
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
        event: [message],
        // TODO: test set id should be set when creating/loading testset in the runner
        placeholder: null,
      }),
    });
  };
}

(<any>window).eventRecorder = new AssertlyClient();
(<any>window).eventRecorder.start();