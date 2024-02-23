import { shoutAtom } from "@/components/atom";
import { useUpdateEffect } from "react-use";
import { useSetAtom } from "jotai";
import { TextView } from "./text-view";
import { gql } from "@/gql/client";
// import { useQuery, gql } from "@apollo/client";
import { useQuery } from "@apollo/client";

const GET_RANDOM_METAL = gql(`
  query Getter {
    metals {
      random {
        styled
      }
    }
  }
`);

export const RandomShout: React.FC = () => {
  "use client";
  const setAtom = useSetAtom(shoutAtom);
  const { loading, data, fetchMore } = useQuery(GET_RANDOM_METAL, {});
  // const setRandomShout = useCallback(() => {
  // applyShout(shoutRandom());
  // }, [applyShout]);
  useUpdateEffect(() => {
    if (loading) return;
    setAtom(data?.metals.random.styled);
  }, [loading]);
  // const shout = useShoutContent();

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
    </div>
  );
};
