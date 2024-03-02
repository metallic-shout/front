"use client";
import { FaLocationArrow } from "react-icons/fa";
import { useRef, useCallback } from "react";
import Link from "next/link";
import { useWithDialog } from "@/components/dialog";
import { ShoutSVG } from "@/components/shout-svg";

const toggleBoolString = (value: string) => {
  if (value === "true") {
    return "false";
  } else {
    return "true";
  }
};

const buttonStyle = `
bg-cyan-950
w-16
h-16
rounded-xl
border-sky-800
border-4
border-solid
p-4
transition-transform
scale-100
duration-100
hover:scale-90
z-10
focus:outline
focus:outline-sky-700
focus:outline-4 
`;

const modalStyle = `
mx-auto
mt-[50vh]
bg-panel
rounded-xl
`;

const navStyle = `
`;

export const WithToolBox = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const onClose = useCallback(() => {
    if (buttonRef.current == null) return;
    buttonRef.current.dataset.forwardToUnder = toggleBoolString(
      buttonRef.current.dataset.forwardToUnder as string
    );
  }, []);
  const { dialogElement, open } = useWithDialog({
    onClose,
    className: modalStyle,
    children: (
      <nav className="w-full h-full px-[5vw] py-[5vh]">
        <ul className="flex gap-[5vw] text-gray-300 ml-5">
          <li className="w-32">
            <Link href="/shout">
              <ShoutSVG />
            </Link>
          </li>
          <li>
            <Link href="/about">
              <p className="font-bold text-2xl">WHAT</p>
            </Link>
          </li>
        </ul>
      </nav>
    ),
  });
  const onClick = useCallback(() => {
    open();
    if (buttonRef.current == null) return;
    onClose();
  }, [onClose, open]);
  return (
    <>
      {dialogElement}
      <div className="fixed bottom-20 right-20 w-fit h-fit">
        <button
          className={`${buttonStyle}`}
          onClick={onClick}
          ref={buttonRef}
          data-foward-to-under="false"
        >
          <FaLocationArrow
            className={`
            w-full
            h-full
            text-sky-600
            transition-transform
            duration-500
            rotate-[-90deg]
            [*[data-forward-to-under='true']>&]:rotate-[-180deg]
          `}
          />
        </button>
      </div>
    </>
  );
};
