import Message from "./Message";

export default interface ClientInterface {
  recordEvent(event: Event): void;
  sendEvent(message: Message): void; // TODO: Needs a type
  start(): void;
  stop(): void;
}
