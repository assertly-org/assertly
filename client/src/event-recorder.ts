import { EventType, ReconcileType } from "./types/EventType";
import { RecorderConfig } from "./types/RecorderConfig";

declare global {
  interface Window {
    recorderAddedControlListeners: boolean;
    dataLayer: any[];
  }
}

export default class EventRecorder {
  private eventCallback: (event: Event) => any;
  private reconcileCallback: (event: Event) => any;
  private recordEvents: EventType[] = [];
  private reconcileEvents: ReconcileType[] = ["blur", "focus", "change"];

  constructor(config: RecorderConfig) {
    const {
      eventCallback,
      reconcileCallback,
      recordEvents,
      reconcileEvents = null,
    } = config;
    this.eventCallback = eventCallback;
    this.reconcileCallback = reconcileCallback;
    this.recordEvents = recordEvents;
    if (reconcileEvents) {
      this.reconcileEvents = reconcileEvents;
    }
  }

  addAllListeners = () => {
    this.recordEvents.forEach((event) => {
      window.addEventListener(event, this.eventCallback, true);
    });

    this.reconcileEvents.forEach((event) => {
      window.addEventListener(event, this.reconcileCallback, true);
    });
  };

  removeAllListeners = () => {
    this.recordEvents.forEach((event) => {
      window.removeEventListener(event, this.eventCallback, true);
    });
    this.reconcileEvents.forEach((event: ReconcileType) => {
      window.removeEventListener(event, this.reconcileCallback, true);
    });
  };

  start = () => {
    if (!window.recorderAddedControlListeners) {
      this.addAllListeners();
      window.recorderAddedControlListeners = true;
    }
  };

  stop = () => {
    if (window.recorderAddedControlListeners) {
      this.removeAllListeners();
      window.recorderAddedControlListeners = false;
    }
  };
}
