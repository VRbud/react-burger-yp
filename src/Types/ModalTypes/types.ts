export interface IModal {
  onClose?: () => void;
  children?: JSX.Element;
  extraClass?: string;
}
