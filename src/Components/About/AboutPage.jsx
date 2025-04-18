import React from "react";
import "./AboutPage.css";

import about1 from "../../Assets/About/about-1.jpg";
import about2 from "../../Assets/About/about-2.jpg";

import Services from "../../Components/Home/Services/Services";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

import brand1 from "../../Assets/Brands/brand1.png";
import brand2 from "../../Assets/Brands/brand2.png";
import brand3 from "../../Assets/Brands/brand3.png";
import brand4 from "../../Assets/Brands/brand4.png";
import brand5 from "../../Assets/Brands/brand5.png";
import brand6 from "../../Assets/Brands/brand6.png";
import brand7 from "../../Assets/Brands/brand7.png";

const AboutPage = () => {
  return (
    <>
      <div className="aboutSection">
        <h2>About Luxury Jewelers</h2>
        <img src={about1} alt="" />
        <div className="aboutContent">
          <h3>Our Story</h3>
          <h4>
            Founded in 1995, our jewelry house has been crafting exquisite pieces that tell stories of love, commitment, and timeless beauty. Each piece we create is a testament to our passion for fine craftsmanship and attention to detail.
          </h4>
          <p>
            Our journey began in a small workshop where our founder, a master jeweler, created custom pieces for discerning clients. Today, we continue that tradition of excellence, combining traditional techniques with modern innovation. Our team of skilled artisans works with the finest materials, from ethically sourced diamonds to premium gold and platinum, ensuring that every piece meets our exacting standards.
          </p>
          <div className="content1">
            <div className="contentBox">
              <h5>Our Mission</h5>
              <p>
                To create exceptional jewelry that celebrates life's most precious moments while maintaining the highest standards of craftsmanship, quality, and ethical sourcing.
              </p>
            </div>
            <div className="contentBox">
              <h5>Our Vision</h5>
              <p>
                To be recognized as a premier destination for fine jewelry, known for our commitment to excellence, innovation, and customer satisfaction.
              </p>
            </div>
          </div>
          <div className="content2">
            <div className="imgContent">
              <img src={about2} alt="" />
            </div>
            <div className="textContent">
              <h5>The Company</h5>
              <p>
                At Luxury Jewelers, we believe that jewelry is more than just an accessory - it's a reflection of personal style and a celebration of life's special moments. Our collections feature a diverse range of designs, from classic solitaire rings to contemporary statement pieces, all crafted with the same dedication to quality and detail. We work closely with our clients to create custom pieces that perfectly capture their vision, ensuring that each creation is as unique as the person who wears it.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Services />
      <div className="companyPartners">
        <h5>Company Partners</h5>
        <Swiper
          slidesPerView={1}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 5,
            },

            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },

            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          spaceBetween={10}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        >
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand1} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand2} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand3} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand4} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand5} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand6} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand7} alt="" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default AboutPage;
