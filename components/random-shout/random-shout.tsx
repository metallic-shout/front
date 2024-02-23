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
  console.log(error);

  return (
    <div className="px-10 h-1/3">
      <div
        className={`
          rounded-xl
          border-primary
          border
          overflow-hidden
          items-stretch
          `}
      >
        <button
          className="border-r border-primary px-3 bg-panel w-max"
          onClick={() => fetchMore({ query: GET_RANDOM_METAL })}
        >
          →
        </button>
        <div className="pl-5 justify-start">
          {data == null ? null : <TextView text={data.metals.random.styled} />}
        </div>
      </div>
      <div data-visible={error == null ? undefined : ""}>{children}</div>
    </div>
  );
};
