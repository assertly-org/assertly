import { EventType, ReconcileType } from "./EventType";

export interface RecorderConfig {
  eventCallback(event: Event): void;
  reconcileCallback(event: Event): void;
  recordEvents: EventType[];
  reconcileEvents?: ReconcileType[];
}
