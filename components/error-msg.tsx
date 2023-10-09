"use client";

import { useMemo } from "react";

interface Props {
  isSuccess?: boolean;
  children: [React.ReactNode, React.ReactNode];
}

export const ErrorMsg: React.FC<Props> = ({ children, isSuccess }) => {
  const op = useMemo(
    () => (isSuccess == null ? {} : { "data-result": isSuccess }),
    [isSuccess]
  );
  return (
    <div
      className={`
          mt-10
          relative
          flex-col
          justify-start
          [&>*]:absolute
          [&>*]:inset-x-0
          [&>*]:mx-auto
          [&>*]:h-max
          [&>*]:invisible
          [&[data-result=true]>*[data-ok-label]]:visible
          [&[data-result=false]>*[data-error-label]]:visible
        `}
      {...op}
    >
      <div data-ok-label>{children[0]}</div>
      <div data-error-label>{children[1]}</div>
    </div>
  );
};
