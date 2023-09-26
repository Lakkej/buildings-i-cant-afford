// create hook useProperties that call on backend (localhost:5000/) this returns list of properties.
// the BE returns a paginated list of properties, based on page and size params.
// the hook returns the list of properties and the total number of properties

import { useEffect, useState } from "react";
import { Property } from "../types";

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [total, setTotal] = useState<number>(500);
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<string>("20");
  const [fetching, setFetching] = useState<boolean>(false);

  useEffect(() => {
    setFetching(true);
    fetch(`http://localhost:5000/?page=${page}&size=${size}`)
      .then((res) => res.json())
      .then((data) => {
        setProperties(data.properties);
        setTotal(data.total);
        setFetching(false);
      });
  }, [page, size, setProperties, setTotal, setFetching]);

  return { fetching, properties, total, page, size, setPage, setSize };
};
