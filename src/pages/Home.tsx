import React from 'react';
import { IonImg } from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { IonicSlides } from '@ionic/react';

const slides = [
  { img: '/assets/slides/1.jpg', text: 'Protege nuestros bosques' },
  { img: '/assets/slides/2.jpg', text: 'Cuida el agua' },
  { img: '/assets/slides/3.jpg', text: 'Reduce, Reutiliza, Recicla' }
];

export default function Home() {
  return (
    <div>
      <Swiper
        modules={[IonicSlides, Autoplay, Pagination]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        style={{ width: '100%' }}
      >
        {slides.map((s, i) => (
          <SwiperSlide key={i}>
            <IonImg src={s.img} alt={s.text} />
            <h3 className="ion-text-center ion-padding">{s.text}</h3>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
