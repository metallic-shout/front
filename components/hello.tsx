import { useQuery } from "@apollo/client";
import { gql } from "@/gql/client";

const GETTER = gql(`
  query Getter{
    metals{
      random {
        name
      }
    }
    # select(index: $choice){
    #   name
    # }
  }
`);

export const Hello: React.FC = () => {
  const { data, loading, error } = useQuery(GETTER);
  if (error != null) {
    return <div>{JSON.stringify(error)}</div>;
  }
  if (loading) {
    return <div>loading</div>;
  }
  return <div>{JSON.stringify(data)}</div>;
};
