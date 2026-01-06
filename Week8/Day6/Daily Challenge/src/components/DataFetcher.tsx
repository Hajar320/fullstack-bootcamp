import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadData } from "../features/dataSlice";
import type { RootState, AppDispatch } from "../store";
import type { ReactNode } from "react";

interface DataFetcherProps<T> {
  url: string;
  render: (data: T) => ReactNode;
}

function DataFetcher<T>({ url, render }: DataFetcherProps<T>) {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.data
  );

  useEffect(() => {
    dispatch(loadData(url));
  }, [dispatch, url]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return null;

  return render(data as T);
}

export default DataFetcher;
