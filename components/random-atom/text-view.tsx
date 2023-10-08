interface Props {
  text: string;
}

export const TextView: React.FC<Props> = ({ text }) => {
  return (
    <textarea
      className={`
        gb-inherit
        resize-none
        focus:outline-none
        p-1/3
      `}
    >
      {text}
    </textarea>
  );
};
