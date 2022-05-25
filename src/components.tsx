import { useAppContext } from "./context";
import { GithubLink, Settings } from "./icons";
import {
  InputBoxProps,
  SelectBoxProps,
  FormLayoutProps,
  RadioButtonProps,
  SliderInputProps,
} from "./interfaces";

export const Overlay = () => {
  const { navIsOpen, setNavIsOpen } = useAppContext();
  return (
    <>
      {navIsOpen && (
        <div
          onClick={() => setNavIsOpen(false)}
          className="fixed z-10 inset-0 w-full h-full bg-slate-900 dark:bg-slate-600 opacity-30 lg:hidden"
        ></div>
      )}
    </>
  );
};

export const MobileNavbar = () => {
  const { setNavIsOpen } = useAppContext();

  return (
    <div className="fixed bg-white dark:bg-slate-800 lg:bg-transparent p-2 w-full flex items-center justify-between lg:hidden">
      <button onClick={() => setNavIsOpen(true)} className="sidebar-open-btn">
        <Settings className="h-5 w-5 sm:h-7 sm:w-7 hidden sm:block" />
      </button>
      <GithubLink className="dark:border-slate-800 dark:active:text-slate-800" />
    </div>
  );
};

export const MobileNavbarToggler = () => {
  const { setNavIsOpen } = useAppContext();

  return (
    <button
      onClick={() => setNavIsOpen(true)}
      className="fixed bg-rose-400 sm:hidden bottom-16 right-10 rounded-full p-4 hover:scale-105 active:scale-110 transition-all shadow-xl active:bg-rose-300"
    >
      <Settings className="h-10 w-10 text-slate-100 dark:text-slate-700" />
    </button>
  );
};

export const FormLayout = ({
  children,
  inputLabel,
  condition,
}: FormLayoutProps) => {
  return (
    <div className="space-y-4">
      <p className="font-semibold">
        {inputLabel} <span className="font-normal">{condition}</span>
      </p>
      <div className="realtive">{children}</div>
    </div>
  );
};

export const RadioButton = ({ value, label, chartType }: RadioButtonProps) => {
  const { loading } = useAppContext();

  return (
    <label className="cursor-pointer">
      <input
        type="radio"
        className="mr-2 cursor-pointer text-rose-400 dark:bg-slate-600 focus:ring-0"
        value={value}
        name="chart"
        defaultChecked={chartType === value}
        disabled={loading}
      />
      {label}
    </label>
  );
};

export const SliderInput = ({
  min,
  max,
  value,
  onChange,
  step,
}: SliderInputProps) => {
  const { loading } = useAppContext();

  return (
    <>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        step={step}
        className="slider-thumb slider-track"
        onChange={onChange}
        disabled={loading}
      />
      <div className="flex justify-between text-xs md:text-sm italic">
        <p>{min}</p>
        <p>{max}</p>
      </div>
    </>
  );
};

export const InputBox = ({
  type,
  maxLength,
  value,
  onChange,
}: InputBoxProps) => {
  const { loading } = useAppContext();

  return (
    <input
      className="input-outline"
      required
      type={type}
      maxLength={maxLength}
      value={value}
      onChange={onChange}
      disabled={loading}
    />
  );
};

export const SelectBox = ({ value, onChange }: SelectBoxProps) => {
  const { loading } = useAppContext();

  return (
    <select
      className="select-box"
      required
      value={value}
      onChange={onChange}
      disabled={loading}
    >
      <option value={0}>0</option>
      <option value={0.01}>0.01</option>
      <option value={0.02}>0.02</option>
      <option value={0.03}>0.03</option>
      <option value={0.04}>0.04</option>
      <option value={0.05}>0.05</option>
    </select>
  );
};
