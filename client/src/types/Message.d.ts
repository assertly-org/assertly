import Coordinates from "./Coordinates";

export default interface Message {
  action: string;
  checked: boolean | null;
  componentName: string;
  coordinates: Coordinates | null;
  filename: string | undefined;
  linenumber: number | undefined;
  href: string | null;
  keyCode: number | null;
  props: object;
  tagName: string;
  tagType: string;
  textContent: string;
  timestamp: number;
  value: string;
}
