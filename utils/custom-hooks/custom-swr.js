import useSWR from "swr";
import axios from "axios";
import { useState } from "react";

const URL = process.env.BE;

const fetcher = (url) => axios.get(url).then((res) => res.data);

export function useProducts(params) {
  const [fetched, fetching] = useState(params);
  const { data, error } = useSWR(
    `${URL}/products?page=${fetched?.page ?? 1}&limit=${fetched?.limit ??
      9}&keywords=${fetched?.keywords ?? ""}&category=${fetched?.category ??
      ""}&province=${fetched?.province ?? ""}&sellerId=${fetched?.sellerId ??
      ""}`,
    fetcher
  );
  return [
    {
      data,
      isLoading: !error && !data,
      isError: error,
    },
    fetching,
  ];
}

export function useProductDetail(params) {
  const [fetched, fetching] = useState(params);
  const { data, error } = useSWR(
    `${URL}/detail-product/${fetched?.id}`,
    fetcher
  );
  return [
    {
      data,
      isLoading: !error && !data,
      isError: error,
    },
    fetching,
  ];
}

export function useCity(params) {
  const [fetched, fetching] = useState(params);
  const { data, error } = useSWR(
    `${URL}/get-city/${fetched?.province_id}`,
    fetcher
  );
  return [
    {
      data,
      isLoading: !error && !data,
      isError: error,
    },
    fetching,
  ];
}

export function useProvince() {
  const { data, error } = useSWR(`${URL}/get-province`, fetcher);
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}
