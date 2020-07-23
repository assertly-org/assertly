import Coordinates from "./Coordinates";

export default interface Message {
  action: string;
  checked: boolean | null;

  coordinates: Coordinates | null;

  href: string | null;
  keyCode: number | null;

  tagName: string;
  tagType: string;
  textContent: string;
  timestamp: number;
  value: string;
  writeTestLocation: string;
  componentInfo: any;
  clickHandlerComponent: any;
}
