import Message from "./Message";

export default interface ClientInterface {
  recordEvent(event: Event): void;
  createNewTest(message: Message): void; // TODO: Needs a type
  start(): void;
  stop(): void;
}
