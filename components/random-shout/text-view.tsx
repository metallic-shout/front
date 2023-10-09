interface Props {
  text: string;
}

export const TextView: React.FC<Props> = ({ text }) => {
  return <p className="whitespace-pre">{text}</p>;
};
