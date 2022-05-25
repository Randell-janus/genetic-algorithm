export interface InputBoxProps {
  type: string;
  maxLength: number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SelectBoxProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface FormLayoutProps {
  children: React.ReactNode;
  inputLabel: string;
  condition?: string;
}

export interface RadioButtonProps {
  value: string;
  label: string;
  chartType: string;
}

export interface SliderInputProps {
  min: number;
  max: number;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  step: number;
}
