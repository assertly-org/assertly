export default class EventRecorder {
  constructor({ eventCallback, reconcileCallback, eventsToRecord }) {
    if (!eventCallback || !reconcileCallback || !eventsToRecord) {
      throw Error("EventRecorder constructor is invalid");
    }

    this.eventCallback = eventCallback;
    this.reconcileCallback = reconcileCallback;
    this.eventsToRecord = eventsToRecord;
  }

  addAllListeners = events => {
    events.forEach(type => {
      window.addEventListener(type, this.eventCallback, true);
    });
    window.addEventListener("blur", this.reconcileCallback, true);
    window.addEventListener("focus", this.reconcileCallback, true);
    window.addEventListener("change", this.reconcileCallback, true);
  };

  removeAllListeners = events => {
    events.forEach(type => {
      window.removeEventListener(type, this.eventCallback, true);
    });
  };

  start = () => {
    if (!window.recorderAddedControlListeners) {
      const events = Object.values(this.eventsToRecord);
      this.addAllListeners(events);
      window.recorderAddedControlListeners = true;
    }
  };

  stop = () => {
    if (window.recorderAddedControlListeners) {
      const events = Object.values(this.eventsToRecord);
      this.removeAllListeners(events);
      window.recorderAddedControlListeners = false;
    }
  };
}
