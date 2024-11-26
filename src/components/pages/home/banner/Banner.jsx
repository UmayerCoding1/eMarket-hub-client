import React, { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Daley from "./daley/Daley";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useQuery } from "react-query";
import Loading from "../../../../shared/loading/Loading";
const Banner = () => {
  const axiosPublic = useAxiosPublic();
  const { data: banners = [], isLoading: loading } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const res = await axiosPublic.get("/banners");
      return res.data;
    },
  });

  const memoizedBanner = useMemo(() => banners,[banners]);
  
  if(loading){
    return <Loading />
  }
  return (
    <div className="w-full lg:h-96">
      
        <div className="lg:grid relative grid-cols-4 gap-2 z-0 w-full lg:h-96 ">
          <div className="col-span-3 border-r  ">
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper"
            >
              {memoizedBanner.map((item, i) => (
                <SwiperSlide key={i}>
                  <img className="lg:" src={item.img} alt="" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <Daley />
        </div>
   
    </div>
  );
};

export default Banner;
