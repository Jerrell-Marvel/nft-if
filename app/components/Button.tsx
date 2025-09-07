type ButtonComponentProps = {
  buttonText: string;
  children?: React.ReactNode;
};

export default function ButtonComponent({ buttonText, children }: ButtonComponentProps) {
  return (
    <>
      {children}
      <button>Hello {buttonText}</button>
    </>
  );
}
