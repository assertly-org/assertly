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

interface Component {
}

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
        console.log('in the reconcile');
        // this.sendEvent(msg);
      });
      this.clearEventCache();
    }
  };

  // remove all divs with a certain classname
  removeMenusByClassname = (classname: string) => {
    const previousMenus = Array.from(document.getElementsByClassName(classname));
    previousMenus?.map((val: any) => val.remove());
  }

  removeSingleMenu = async (elID: string) => {
    const menuDiv = document.getElementById(elID);
    menuDiv?.remove();
  };

  setupMenuDiv = (mouseEvent: MouseEvent) => {
    const eventTime = new Date().getTime();
    const divID = "componentMenu" + eventTime;
    const menuDiv = document.createElement("DIV");

    menuDiv.setAttribute("id", divID);
    menuDiv.setAttribute("class", 'componentMenu');
    document.body.appendChild(menuDiv);
    menuDiv.style.position = "absolute";
    menuDiv.style.left = mouseEvent.x + 'px';
    menuDiv.style.top = mouseEvent.y + 'px';
    menuDiv.style.zIndex = '9999999999999';
    return divID
  }

  appendButton = (elID:string , label: string) => {
    const btn = document.createElement("BUTTON");
    btn.style.width = '150px';
    btn.innerHTML = label;
    document.getElementById(elID)?.appendChild(btn);
    const br = document.createElement("br");
    document.getElementById(elID)?.appendChild(br);
    return btn
  }

  createPopupMenu = (message: Message, mouseEvent: MouseEvent) => {

    // remove all existing menus
    this.removeMenusByClassname('componentMenu')
    // create the dom element and store the element ID
    const divID = this.setupMenuDiv(mouseEvent)    

    message?.componentInfo?.map((val: any) => {
      console.log("button val: ", val);
      const btn = document.createElement("BUTTON");
      btn.style.width = '150px';
      btn.innerHTML = val?.componentName;
      if (btn.innerHTML) {
        btn.addEventListener('click', async (event) => await this.componentMenuClick(event, divID, message));
        document.getElementById(divID)?.appendChild(btn);
        const br = document.createElement("br");
        document.getElementById(divID)?.appendChild(br);
      }
    });
    const CancelBtn = this.appendButton(divID, 'Cancel')
    CancelBtn.addEventListener('click', async () => await this.removeSingleMenu(divID));

  };

  createExistingTestMenu = async (event: any, existingTestResponse: any) => {
   
    const existingTestDivID = this.setupMenuDiv(event)  
    const test = ["a","b"]

    test.map( val => {
      const btn = document.createElement("BUTTON");
      btn.style.width = '150px';
      btn.innerHTML = val;
      document.getElementById(existingTestDivID)?.appendChild(btn);
      const br = document.createElement("br");
      document.getElementById(existingTestDivID)?.appendChild(br);
    })
    const newTestBtn = this.appendButton(existingTestDivID, 'Create New Test')

    const cancelBtn = this.appendButton(existingTestDivID, 'Cancel')
    cancelBtn.addEventListener('click', async () => await this.removeSingleMenu(existingTestDivID));

    return {newTestBtn: newTestBtn, existingTestMenuID: existingTestDivID}
  }

  componentMenuClick = async (event: any, divID: any, message: Message): Promise<any> => {

    await this.removeSingleMenu(divID);

    const selectedComponent = message.componentInfo?.reduce(
      (acc: any, curr: any) => {
        if (curr.componentName === event.target?.innerHTML) {
          return {...curr};
        } else {
          return acc;
        }
      }, null);

    event?.stopPropagation();
    
    // check for existing tests
    const existingTestResponse = await this.checkForExistingTest(selectedComponent?.filename);
    
    // the response will contain the dom elements of the buttons for either the existing tests or
    // to create a new test
    const existingTestMenuResponse = await this.createExistingTestMenu(event, existingTestResponse)

    // add listener for creating a brand new test
    existingTestMenuResponse.newTestBtn.addEventListener('click', async () => {
      await this.createNewTest({
        ...message,
        componentInfo: selectedComponent,
        checkedEvent: existingTestResponse.checkedEvent
      })
      await this.removeSingleMenu(existingTestMenuResponse.existingTestMenuID);
    });

    // this.sendEvent({
    //   ...message,
    //   // there should only be one match here on the filter
    //   // componentInfo: message.componentInfo?.filter( (val:any) => val.componentName === event.target?.innerHTML)
    //   componentInfo: selectedComponent
    // }).then(res => {console.log('dot then', res)});


  };



  getMessage = (reactComponent: any, event: KeyboardEvent | Event): Message => {

    // function to use in array reduce
    const findClickHandler = (accumulator: any, currentValue: any) => {
      if (currentValue.props?.onClick) {
        return {...currentValue};
      } else {
        return accumulator;
      }
    };

    const target = event.target || event.srcElement;
    const inputTarget = target as HTMLInputElement;
    const linkTarget = target as HTMLLinkElement;

    const componentInfo = getComponentInfo(reactComponent, 10, []);

    // find the closest click handler that would have been triggered
    // note, slice(0) copies the array
    const clickHandler = componentInfo?.slice(0)?.reverse()?.reduce(findClickHandler, null);


    // console.log('component info in GET_MESSAGE: ', componentInfo, clickHandler)

    const message: Message = {
      // componentName, fileName, and lineNumber are already in the object returned
      action: event.type,
      checked: event?.target?.hasOwnProperty("checked")
        ? inputTarget.checked
        : null,
      coordinates: getCoordinates(event),
      href: linkTarget.href ? linkTarget.href : null,
      keyCode: (event as KeyboardEvent).keyCode
        ? (event as KeyboardEvent).keyCode
        : null,
      tagName: inputTarget.tagName,
      tagType: inputTarget.type,
      textContent: inputTarget.textContent || inputTarget.innerText,
      timestamp: new Date().getTime(),
      value: inputTarget.value,
      writeTestLocation: '',
      componentInfo: componentInfo,
      clickHandlerComponent: clickHandler,
      checkedEvent: undefined

    };

    return message;
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
      console.log('reactComponent and message in RECORD_EVENT: ', reactComponent, msg);

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
      if (mouseEvent?.metaKey) this.createPopupMenu(msg, mouseEvent);
      // this.sendEvent(msg);
    } catch (e) {
      console.error("Error recording event", e);
    }
  };

  createNewTest = async (message: Message) => {
    let accountId = (window as { [key: string]: any })["dataLayer"][0]["apiKey"];

    console.log('message: ', message );

    // rather get a 403 than a bad route
    if (!accountId) {
      accountId = 1;
    }

    const url = `//localhost:3020/api/accounts/${accountId}/events/`;

    const response = await fetch(url, {
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

    return response.json()
  };

  checkForExistingTest = async (filepath: string) => {
    let accountId = (window as { [key: string]: any })["dataLayer"][0]["apiKey"];

    // rather get a 403 than a bad route
    if (!accountId) {
      accountId = 1;
    }

    const uriFilepath = encodeURI(filepath)
    const url = `//localhost:3020/api/accounts/${accountId}/events/?filepath=${uriFilepath}`;

    console.log('url hit: ', url, uriFilepath)
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      }
    });

    return response.json()
  };
}

(<any>window).eventRecorder = new AssertlyClient();
(<any>window).eventRecorder.start();

