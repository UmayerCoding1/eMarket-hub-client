import React  from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useQuery } from "react-query";
// import { borderBottom } from "@mui/system";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
const BottomBanner = () => {
  const axiosPublic = useAxiosPublic();
  const { data: BottomBanner = [] } = useQuery({
    queryKey: ["BottomBanner"],
    queryFn: async () => {
      const res = await axiosPublic.get("/bottom-banner");
      return res.data;
    },
  });

 

  return (
    <div className="mt-10">

      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {BottomBanner.map((item) => (
          <SwiperSlide key={item._id}>
            <div className="h-40 ">
            <img src={item.image} alt="" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default React.memo(BottomBanner);
