import { useMemo } from "react";

interface Props {
  isSuccess: boolean | null;
}

export const ErrorMsg: React.FC<Props> = ({ isSuccess }) => {
  const op = useMemo(
    () => (isSuccess == null ? {} : { "data-copy-result": isSuccess }),
    [isSuccess]
  );
  return (
    <div
      className={`
          [&>*]:hidden
          [&>*]:invisible
          [&[data-copy-result=true]>*[data-ok-label]]:block
          [&[data-copy-result=true]>*[data-ok-label]]:visible
          [&[data-copy-result=false]>*[data-error-label]]:block
          [&[data-copy-result=false]>*[data-error-label]]:visible
          mt-10
        `}
      {...op}
    >
      <p data-ok-label>コピーしました！</p>
      <p data-error-label>コピーできませんでした。</p>
    </div>
  );
};
