import { PropsWithChildren } from "react";

type SelectFormProps = {
  title: string;
};

function SelectContainer({
  title,
  children,
}: PropsWithChildren<SelectFormProps>) {
  return (
    <div className="w-full mb-10">
      <h3 className="font-semibold">{title}</h3>
      {children}
    </div>
  );
}

export default SelectContainer;
