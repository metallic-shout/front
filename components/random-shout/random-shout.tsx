"use client";
import { useUpdateEffect } from "react-use";
import { TextView } from "./text-view";
import { gql } from "@/gql/client";
import { useQuery } from "@apollo/client";
import { atom, useSetAtom } from "jotai";

export const shoutAtom = atom(undefined as string | undefined);

const GET_RANDOM_METAL = gql(`
  query Getter {
    metals {
      random {
        styled
      }
    }
  }
`);

interface Props {
  children: React.ReactNode;
}
export const RandomShout: React.FC<Props> = ({ children }) => {
  const { loading, data, error, fetchMore } = useQuery(GET_RANDOM_METAL, {});
  const setAtom = useSetAtom(shoutAtom);
  useUpdateEffect(() => {
    if (loading || error) return;
    setAtom(data?.metals.random.styled);
  }, [loading, error]);

  return (
    <>
      <div
        className={`
          rounded-xl
          border-fg-1
          border
          overflow-hidden
          items-stretch
          `}
      >
        <button
          className="border-r border-fg-1 px-3 bg-panel w-max"
          onClick={() => fetchMore({ query: GET_RANDOM_METAL })}
        >
          →
        </button>
        <div className="pl-5 justify-start">
          {data == null ? null : <TextView text={data.metals.random.styled} />}
        </div>
      </div>
      <div className="w-0 h-0" data-visible={error == null ? undefined : ""}>
        {children}
      </div>
    </>
  );
};
