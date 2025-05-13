import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useProducts = (searchQuery, priceSort, selectCategory) => {
  const axiosPublic = useAxiosPublic();
  const { data: products = [], isLoading: loading } = useQuery({
    queryKey: ["products",searchQuery , priceSort,selectCategory],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/products?productName=${searchQuery || ""}&sort=${
          priceSort ? "ase" : "des"
        }&category=${selectCategory}`
      );
      if (res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.data;
    },
  });

  // const memoizedProduct = useMemo(() => products,[products]);
  // console.log(products);
  
  return [products, loading];
};

export default useProducts;
