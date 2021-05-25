export interface FieldsType {
  name: string;
  id?: string;
  label?: string;
  autoComplete?: string;
  multiple?: boolean;
  type?: "textfield" | "selector" | "datepicker" | "autocomplete";
  data?: {
    label: string;
    value: any;
  }[];
}
