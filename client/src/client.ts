import {
  findReactElement,
  getCoordinates,
  getComponentName,
  getComponentProps,
  getComponentInfo
} from "./utils";


import EventRecorder from "./event-recorder";
import ClientInterface from "./types/Client";
import Message from "./types/Message";
import { EventType } from "./types/EventType";

interface Component { }

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
        console.log('in the reconcile')
        this.sendEvent(msg);
      });
      this.clearEventCache();
    }
  };

  createPopupMenu = (message: Message) => {
    
    const eventTime = new Date().getTime()
    const divID = "componentMenu" + eventTime
    const mouseEvent = event as MouseEvent;
    const menuDiv = document.createElement("DIV");

    const previousMenus = Array.from(document.getElementsByClassName('componentMenu'));
    previousMenus?.map( (val:any) => val.remove())

    menuDiv.setAttribute("id", divID);
    menuDiv.setAttribute("class", 'componentMenu');
    document.body.appendChild(menuDiv);
    menuDiv.style.position = "absolute";
    menuDiv.style.left = mouseEvent.x + 'px';
    menuDiv.style.top = mouseEvent.y +'px';
    menuDiv.style.zIndex = '5';


    // const HeaderBtn = document.createElement("BUTTON");   
    // HeaderBtn.style.width = '150px';
    // HeaderBtn.innerHTML = 'Assertly';
    // (HeaderBtn as HTMLButtonElement).disabled = true;
    // menuDiv.appendChild(HeaderBtn);   
    // const br = document.createElement("br");
    // menuDiv.appendChild(br);   

    message?.componentInfo?.map((val: any) => {
      const btn = document.createElement("BUTTON");   
      btn.style.width = '150px';
      btn.innerHTML = val?.componentName;                 
      if(btn.innerHTML) {
        btn.addEventListener('click', () => this.componentMenuClick(event, divID, message))
        menuDiv.appendChild(btn);             
        const br = document.createElement("br");
        menuDiv.appendChild(br); 
      }
    })

    const CancelBtn = document.createElement("BUTTON");   
    CancelBtn.style.width = '150px';
    CancelBtn.innerHTML = 'Cancel';  
    CancelBtn.addEventListener('click', () => this.removeSingleMenu(divID))
    menuDiv.appendChild(CancelBtn);     
  }

  removeSingleMenu = (divID: any) => {
    const menuDiv = document.getElementById(divID);
    menuDiv?.remove()
  }

  componentMenuClick = (event: any, divID: any, message: Message): any => {
    console.log('this is the click call back: ', event)
    console.log('this is the message in the callback: ', message.componentInfo)
    event?.stopPropagation()
    this.sendEvent({
      ...message, 
      componentInfo: message.componentInfo?.filter( (val:any) => val.componentName === event.target?.innerHTML)
    })

    this.removeSingleMenu(divID)
    // const menuDiv = document.getElementById(divID);
    // menuDiv?.remove()
    
  }

  getMessage = (reactComponent: any, event: KeyboardEvent | Event ): Message => {
    
    // function to use in array reduce
    const findClickHandler = (accumulator : any , currentValue : any) => {
      if (currentValue.props?.onClick) {
        return { 
          ...currentValue }}};

    const target = event.target || event.srcElement;
    const inputTarget = target as HTMLInputElement;
    const linkTarget = target as HTMLLinkElement;

    const componentInfo = getComponentInfo(reactComponent, 10, [])

    // find the closest click handler that would have been triggered
    const clickHandler = componentInfo?.slice(0)?.reverse()?.reduce(findClickHandler,{}) || null


    // console.log('component info in GET_MESSAGE: ', componentInfo, clickHandler)

    const message: Message =  {
      // componentName, fileName, and lineNumber are already in the object returned
      action : event.type,
      checked : event?.target?.hasOwnProperty("checked")
        ? inputTarget.checked
        : null,
      coordinates : getCoordinates(event),
      href : linkTarget.href ? linkTarget.href : null,
      keyCode : (event as KeyboardEvent).keyCode
        ? (event as KeyboardEvent).keyCode
        : null,
      tagName : inputTarget.tagName,
      tagType : inputTarget.type,
      textContent : inputTarget.textContent || inputTarget.innerText,
      timestamp : new Date().getTime(),
      value : inputTarget.value,
      writeTestLocation : '',
      componentInfo: componentInfo,
      clickHandlerComponent: clickHandler

    };

    return message
  };



  recordEvent = (event: Event) => {
    const nodeTarget = event.target as Node;
    const mouseEvent = event as MouseEvent;

    // if the click is on a menu that pops up, dont go through the record event logic
    if (nodeTarget?.parentElement?.getAttribute("id")?.includes('componentMenu')) {
      return;
    }
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
      const msg: Message = this.getMessage(reactComponent, event);
      console.log('reactComponent and message in RECORD_EVENT: ', reactComponent, msg)

      localStorage.setItem("lastEvent", JSON.stringify(msg));
      this.previousMsg = msg;

      // if (
      //   // if there is no previous component or the previous component is the same as the component you just clicked on
      //   !this.previousComponent ||
      //   (this.previousComponent && this.previousComponent === reactComponent)
      // ) {
      //   this.previousComponent = reactComponent;
      //   if (
      //     this.previousComponent &&
      //     msg.checked !== null &&
      //     msg.action === "click"
      //   ) {
      //     // message is sent when something in the popup menu is selected
      //     this.createPopupMenu(msg);
      //     // this.sendEvent(msg);
      //     return;
      //   }

      //   //pushing a message to the event cache sends it to the api when the reconcile callback is called
      //   this.componentEventCache.push(msg);

      //   return;
      // } else {
      //   this.clearEventCache();
      // }

      this.previousComponent = reactComponent;

      // message is sent when something in the popup menu is selected
      if (mouseEvent?.metaKey) this.createPopupMenu(msg);
      // this.sendEvent(msg);
    } catch (e) {
      console.error("Error recording event", e);
    }
  };

  sendEvent = async (message: Message) => {
    // const accountId = window["dataLayer"][0]["apiKey"];
    const accountId = (window as { [key: string]: any })["dataLayer"][0]["apiKey"]
    const writeLocation = (window as { [key: string]: any })["dataLayer"][0]["testLocation"]
    const url = `//localhost:3002/api/accounts/${accountId}/events/`;
    // console.log('this is the message: ', message);
    // console.log('this is the write location: ', writeLocation, accountId);
    console.log('this is the message in SEND_EVENT: ', message)
    
    message?.componentInfo?.map( (val:any) => {
      val.writeTestLocation = writeLocation
      return val
    });

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
        event: message,
        // TODO: test set id should be set when creating/loading testset in the runner
        placeholder: null,
      }),
    });
  };
}

(<any>window).eventRecorder = new AssertlyClient();
(<any>window).eventRecorder.start();

