import React, { useEffect, useMemo, useState } from "react";
import Loading from "../../../../../shared/loading/Loading";
import useAxiosPublic from "../../../../../hooks/useAxiosPublic";
import { useQuery } from "react-query";

const Ads = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: ads = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["ads"],
    queryFn: async () => {
      const res = await axiosPublic.get("/ads");
      return res.data;
    },
  });

  if (isLoading) {
    refetch();
    return <Loading />;
  }
  return (
    <div>
      {ads.map((add) => (
        <img key={add._id} className="mb-5 shadow" src={add.add} />
      ))}
    </div>
  );
};

export default React.memo(Ads);
