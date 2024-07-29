type LabelProps = {
  htmlFor: string;
  children: string;
};

function Label({ htmlFor, children }: LabelProps) {
  return (
    <label className="text-black" htmlFor={htmlFor}>
      {children}
    </label>
  );
}

export default Label;
