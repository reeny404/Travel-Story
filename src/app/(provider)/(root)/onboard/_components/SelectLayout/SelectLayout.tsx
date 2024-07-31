import { PropsWithChildren } from "react";

type SelectFormProps = {
  title: string;
};

function SelectLayout({ title, children }: PropsWithChildren<SelectFormProps>) {
  return (
    <div className="w-full [&+&]:my-6">
      <p className="text-[16px]">{title}</p>
      {children}
    </div>
  );
}

export default SelectLayout;
