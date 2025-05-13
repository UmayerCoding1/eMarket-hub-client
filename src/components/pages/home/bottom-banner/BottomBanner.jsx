import React, { useState, useRef, useEffect } from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
// import { borderBottom } from "@mui/system";

const BottomBanner = () => {
  const axiosPublic = useAxiosPublic();
  const { data: BottomBanner = [] } = useQuery({
    queryKey: ["BottomBanner"],
    queryFn: async () => {
      const res = await axiosPublic.get("/bottom-banner");
      return res.data;
    },
  });

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const sliderRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="mt-10 bg-red-50 py-8">
      <div className="container mx-auto px-4">
        <div
          ref={sliderRef}
          className="flex overflow-x-auto cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            scrollBehavior: isDragging ? 'auto' : 'smooth',
            WebkitOverflowScrolling: 'touch',
            msOverflowStyle: 'none',  /* IE and Edge */
            scrollbarWidth: 'none',  /* Firefox */
            '&::-webkit-scrollbar': {  /* Chrome, Safari and Opera */
              display: 'none'
            }
          }}
        >
          {BottomBanner.map((banner, index) => (
            <div
              key={index}
              className="flex-none w-[300px] h-[200px] mx-2 rounded-lg overflow-hidden"
            >
              <img
                src={banner.image}
                alt={banner.title || `Banner ${index + 1}`}
                className="w-full h-full object-cover"
                draggable="false"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(BottomBanner);
