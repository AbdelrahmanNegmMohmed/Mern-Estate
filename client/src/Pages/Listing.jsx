import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
 import { Swiper, SwiperSlide } from 'swiper/react';
 import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';






export const Listing = () => {
    SwiperCore.use([Navigation])
    const [listing,setlisting]= useState(null);
    const [loading,seetloading]=useState(false);
    const [error,seterror] =useState(false);
    const params = useParams();
    useEffect(()=>{
        const fetchListing = async ( )=>{
            try {
                seetloading(true)
                const res =await fetch(`/api/listing/get/${params.listingId}`);
                const data = await res.json();
                if(data.success === false){
                    seterror(true);
                    seetloading(false)
                    return;
            }
            setlisting(data);
            seetloading(false);
            seterror(false)
                
            } catch (error) {
                seterror(true);
                seetloading(false);
            }
    };
        fetchListing()

    },[params.listingId]);
  return(
  <main>
    {
        loading && <p className="text-center my-7 text-2xl">loading...</p>
    }
    {
        error &&  <p className="text-center my-7 text-2xl">Somthing Went Wrong!</p>
    }
     {listing && !loading && !error && (

        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[550px] '
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

  </main>

  )
   
  
}
