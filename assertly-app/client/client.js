import AssertlyClient from '../../oss-client/client';
import EventRecorder from '../../oss-client/event-recorder';

class AssertlyClientFull extends AssertlyClient {
  constructor(props) {
    super(props);
    this.eventRecorder = new EventRecorder({
      eventsToRecord: this.eventsToRecord,
      eventCallback: this.recordEvent,
      reconcileCallback: this.reconcileEventCache
    });

    this.eventLog = [];

    this.sendMessage({ control: 'event-recorder-started' });
    this.sendMessage({
      control: 'get-current-url',
      href: window.location.href
    });
    this.sendMessage({
      control: 'get-viewport-size',
      coordinates: { width: window.innerWidth, height: window.innerHeight }
    });
    console.log('initialize recorder');
  }

  sendMessage = msg => {
    try {
      window.parent.postMessage(JSON.stringify(msg), '*');
      this.eventLog.push(JSON.stringify(msg));
    } catch (err) {
      console.log('caught error', err);
    }
  };

  sendEvent = async (msg, observations) => {
    const accountId = window['dataLayer'][0]['apiKey'];
    const url = `//localhost:3002/api/accounts/${accountId}/events/`;

    await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: window.location.href,
        payload: msg,
        // TODO: test set id should be set when creating/loading testset in the runner
        testSetId: '60652b19-98f3-40b4-88f7-88c71dbc788a'
      })
    });

    this.sendMessage(msg);
  };
}

window.eventRecorder = new AssertlyClientFull();
window.eventRecorder.start();
