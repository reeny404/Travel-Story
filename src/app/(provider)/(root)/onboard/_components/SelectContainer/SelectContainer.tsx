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
      <p>{title}</p>
      {children}
    </div>
  );
}

export default SelectContainer;
