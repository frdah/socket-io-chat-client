import React from "react";

type Props = {
  label: string;
  value: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
};
export const ToggleSwitch: React.FC<Props> = ({ label, value, setValue }) => {
  const handleToggle = () => {
    setValue(!value);
  };

  return (
    <>
      <label className="text-white font-bold" htmlFor="toggle">
        {label}
      </label>
      <div
        id="toggle"
        onClick={handleToggle}
        className={`border-2 relative inline-block border-white-400 rounded-full  h-[30px] w-[50px] flex items-center ${
          value && "bg-blue-400"
        }`}
      >
        <div
          className={`h-[30px] w-[30px] absolute rounded-full bg-white transition-all duration-300 ${
            value ? "right-0" : "right-[20px]"
          }`}
        />
      </div>
    </>
  );
};
