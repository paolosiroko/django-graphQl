import React from 'react';
import { useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';
const QUERY_CATEGORIES = gql`
  query {
    allCategories {
      id
      name
    }
}
`;
export default function CategoryInfo() {
  // Polling: provides near-real-time synchronization with
  // your server by causing a query to execute periodically
  // at a specified interval
  const { data, loading } = useQuery(
    QUERY_CATEGORIES,
     {
      pollInterval: 200 // refetch the result every 0.1 second
    }
  );

  

  // should handle loading status
  if (loading) return <p>Loading...</p>;

  return data.allCategories.map(({ id, name }) => (
    <div key={id}>
      <p>
        Category - {id}: {name}
      </p>
    </div>
  ));
}