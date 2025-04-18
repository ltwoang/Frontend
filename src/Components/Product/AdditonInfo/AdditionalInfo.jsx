import React, { useState } from "react";
import "./AdditionalInfo.css";

import user1 from "../../../Assets/Users/user1.jpeg";
import user2 from "../../../Assets/Users/user2.jpeg";

import { FaStar } from "react-icons/fa";
import Rating from "@mui/material/Rating";

const AdditionalInfo = () => {
  const [activeTab, setActiveTab] = useState("aiTab1");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="productAdditionalInfo">
        <div className="productAdditonalInfoContainer">
          <div className="productAdditionalInfoTabs">
            <div className="aiTabs">
              <p
                onClick={() => handleTabClick("aiTab1")}
                className={activeTab === "aiTab1" ? "aiActive" : ""}
              >
                Description
              </p>
              <p
                onClick={() => handleTabClick("aiTab2")}
                className={activeTab === "aiTab2" ? "aiActive" : ""}
              >
                Additional Information
              </p>
              <p
                onClick={() => handleTabClick("aiTab3")}
                className={activeTab === "aiTab3" ? "aiActive" : ""}
              >
                Reviews (2)
              </p>
            </div>
          </div>
          <div className="productAdditionalInfoContent">
            {/* Tab1 */}

            {activeTab === "aiTab1" && (
              <div className="aiTabDescription">
                <div className="descriptionPara">
                  <h3>Exquisite Craftsmanship</h3>
                  <p>
                    Our 18K Gold Diamond Pendant Necklace is meticulously crafted by skilled artisans using traditional jewelry-making techniques. Each piece undergoes rigorous quality control to ensure the highest standards of excellence. The diamonds are carefully selected for their brilliance and clarity, while the 18K gold is expertly shaped to create a stunning piece that will be treasured for generations.
                  </p>
                </div>
                <div className="descriptionParaGrid">
                  <div className="descriptionPara">
                    <h3>Why choose this piece?</h3>
                    <p>
                      <ul>
                        <li>Made with premium 18K gold for lasting beauty</li>
                        <li>Features brilliant-cut diamonds with excellent clarity</li>
                        <li>Comes with a certificate of authenticity</li>
                        <li>Includes a complimentary jewelry box</li>
                      </ul>
                    </p>
                  </div>
                  <div className="descriptionPara">
                    <h3>Care Instructions</h3>
                    <p>
                      <ol>
                        <li>Store in a soft pouch or jewelry box when not in use</li>
                        <li>Clean with a soft jewelry cloth regularly</li>
                        <li>Avoid contact with harsh chemicals and perfumes</li>
                        <li>Remove before swimming or showering</li>
                      </ol>
                    </p>
                  </div>
                </div>
                <div className="descriptionPara">
                  <h3>Materials</h3>
                  <p style={{ marginTop: "-10px" }}>
                    Main: 18K Gold (75% gold, 25% alloy), Diamonds: 0.5 carat total weight, VS clarity, G-H color.
                  </p>
                </div>
              </div>
            )}

            {/* Tab2 */}

            {activeTab === "aiTab2" && (
              <div className="aiTabAdditionalInfo">
                <div className="additionalInfoContainer">
                  <h6>Weight</h6>
                  <p> 2.5 grams</p>
                </div>
                <div className="additionalInfoContainer">
                  <h6>Chain Length</h6>
                  <p> 18 inches (45.7 cm)</p>
                </div>
                <div className="additionalInfoContainer">
                  <h6>Pendant Size</h6>
                  <p> 15mm x 10mm</p>
                </div>
                <div className="additionalInfoContainer">
                  <h6>Metal Color</h6>
                  <p> Yellow Gold, White Gold, Rose Gold</p>
                </div>
                <div className="additionalInfoContainer">
                  <h6>Warranty</h6>
                  <p> 2-year manufacturer warranty against defects</p>
                </div>
              </div>
            )}

            {/* Tab3 */}

            {activeTab === "aiTab3" && (
              <div className="aiTabReview">
                <div className="aiTabReviewContainer">
                  <h3>Reviews</h3>
                  <div className="userReviews">
                    <div
                      className="userReview"
                      style={{ borderBottom: "1px solid #e4e4e4" }}
                    >
                      <div className="userReviewImg">
                        <img src={user1} alt="" />
                      </div>
                      <div className="userReviewContent">
                        <div className="userReviewTopContent">
                          <div className="userNameRating">
                            <h6>Sarah Johnson</h6>
                            <div className="userRating">
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                            </div>
                          </div>
                          <div className="userDate">
                            <p>April 06, 2023</p>
                          </div>
                        </div>
                        <div
                          className="userReviewBottomContent"
                          style={{ marginBottom: "30px" }}
                        >
                          <p>
                            The necklace is absolutely stunning! The diamonds sparkle beautifully and the gold has a perfect luster. The craftsmanship is exceptional and it arrived in a beautiful presentation box. I've received so many compliments while wearing it.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="userReview">
                      <div className="userReviewImg">
                        <img src={user2} alt="" />
                      </div>
                      <div className="userReviewContent">
                        <div className="userReviewTopContent">
                          <div className="userNameRating">
                            <h6>Michael Chen</h6>
                            <div className="userRating">
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                            </div>
                          </div>
                          <div className="userDate">
                            <p>April 12, 2023</p>
                          </div>
                        </div>
                        <div className="userReviewBottomContent">
                          <p>
                            I purchased this necklace as an anniversary gift for my wife. The quality is outstanding and the customer service was excellent. The certificate of authenticity was included, which gave me peace of mind about the diamond quality. Highly recommend!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="userNewReview">
                    <div className="userNewReviewMessage">
                      <h5>
                        Be the first to review "18K Gold Diamond Pendant Necklace"
                      </h5>
                      <p>
                        Your email address will not be published. Required
                        fields are marked *
                      </p>
                    </div>
                    <div className="userNewReviewRating">
                      <label>Your rating *</label>
                      <Rating name="simple-controlled" size="small" />
                    </div>
                    <div className="userNewReviewForm">
                      <form>
                        <textarea
                          cols={30}
                          rows={8}
                          placeholder="Your Review"
                        />
                        <input
                          type="text"
                          placeholder="Name *"
                          required
                          className="userNewReviewFormInput"
                        />
                        <input
                          type="email"
                          placeholder="Email address *"
                          required
                          className="userNewReviewFormInput"
                        />
                        <div className="userNewReviewFormCheck">
                          <label>
                            <input type="checkbox" placeholder="Subject" />
                            Save my name, email, and website in this browser for
                            the next time I comment.
                          </label>
                        </div>

                        <button type="submit">Submit</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdditionalInfo;
