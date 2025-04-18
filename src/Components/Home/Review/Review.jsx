import React from "react";
import "./Review.css";
import { FaStar } from "react-icons/fa";
import customer1 from "../../../Assets/images/customer1.jpg";
import customer2 from "../../../Assets/images/customer2.jpg";
import customer3 from "../../../Assets/images/customer3.jpg";

const Review = () => {
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      image: customer1,
      rating: 5,
      comment: "The diamond necklace I purchased is absolutely stunning! The quality and craftsmanship are exceptional. I've received so many compliments.",
      date: "March 15, 2024"
    },
    {
      id: 2,
      name: "Michael Chen",
      image: customer2,
      rating: 5,
      comment: "I bought a pair of gold cufflinks for my wedding. They were perfect - elegant and well-made. The customer service was outstanding too.",
      date: "March 10, 2024"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      image: customer3,
      rating: 5,
      comment: "My engagement ring is everything I dreamed of. The attention to detail and the sparkle is incredible. Highly recommend their collection!",
      date: "March 5, 2024"
    }
  ];

  return (
    <div className="reviewSection">
      <h2>Customer Reviews</h2>
      <p className="reviewSubtitle">What Our Customers Say About Our Jewelry</p>
      <div className="reviewContainer">
        {reviews.map((review) => (
          <div className="reviewCard" key={review.id}>
            <div className="reviewHeader">
              <img src={review.image} alt={review.name} className="reviewImage" />
              <div className="reviewInfo">
                <h3>{review.name}</h3>
                <div className="reviewRating">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} color="#d4af37" />
                  ))}
                </div>
              </div>
            </div>
            <p className="reviewComment">{review.comment}</p>
            <p className="reviewDate">{review.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review; 