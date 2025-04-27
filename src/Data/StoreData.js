import Product_1 from "../Assets/Products/product_1.jpg";
import Product_1_1 from "../Assets/Products/product_1-1.jpg";
import Product_2 from "../Assets/Products/product_2.jpg";
import Product_2_1 from "../Assets/Products/product_2-1.jpg";
import Product_3 from "../Assets/Products/product_3.jpg";
import Product_3_1 from "../Assets/Products/product_3-1.jpg";
import Product_4 from "../Assets/Products/product_4.jpg";
import Product_4_1 from "../Assets/Products/product_4-1.jpg";
import Product_5 from "../Assets/Products/product_5.jpg";
import Product_5_1 from "../Assets/Products/product_5-1.jpg";
import Product_6 from "../Assets/Products/product_6.jpg";
import Product_6_1 from "../Assets/Products/product_6-1.jpg";
import Product_7 from "../Assets/Products/product_7.jpg";
import Product_7_1 from "../Assets/Products/product_7-1.jpg";
import Product_8 from "../Assets/Products/product_8.jpg";
import Product_8_1 from "../Assets/Products/product_8-1.jpg";

import limited1 from "../Assets/LimitedEdition/limited-1.jpg";
import limited2 from "../Assets/LimitedEdition/limited-2.jpg";
import limited3 from "../Assets/LimitedEdition/limited-3.jpg";
import limited4 from "../Assets/LimitedEdition/limited-4.jpg";
import limited5 from "../Assets/LimitedEdition/limited-5.jpg";

// Define the store data array containing all products
export const storeData = [
  // Necklace product
  {
    id: 1,
    productName: "18K Gold Diamond Pendant Necklace",
    productPrice: 1299,
    productReviews: 1200,
    productImages: {
      front: Product_1,    // Front view of the necklace
      back: Product_1_1,   // Back view of the necklace
    },
  },

  // Wedding Band product
  {
    id: 2,
    productName: "Platinum Wedding Band",
    productPrice: 899,
    productReviews: 856,
    productImages: {
      front: Product_2,    // Front view of the wedding band
      back: Product_2_1,   // Back view of the wedding band
    },
  },

  // Earrings product
  {
    id: 3,
    productName: "Rose Gold Pearl Earrings",
    productPrice: 499,
    productReviews: 723,
    productImages: {
      front: Product_3,    // Front view of the earrings
      back: Product_3_1,   // Back view of the earrings
    },
  },

  // Bracelet product
  {
    id: 4,
    productName: "Silver Charm Bracelet",
    productPrice: 299,
    productReviews: 1500,
    productImages: {
      front: Product_4,    // Front view of the bracelet
      back: Product_4_1,   // Back view of the bracelet
    },
  },

  // Diamond Ring product
  {
    id: 5,
    productName: "White Gold Diamond Ring",
    productPrice: 1999,
    productReviews: 945,
    productImages: {
      front: Product_5,    // Front view of the diamond ring
      back: Product_5_1,   // Back view of the diamond ring
    },
  },

  // Cufflinks product
  {
    id: 6,
    productName: "Black Onyx Men's Cufflinks",
    productPrice: 199,
    productReviews: 432,
    productImages: {
      front: Product_6,    // Front view of the cufflinks
      back: Product_6_1,   // Back view of the cufflinks
    },
  },

  {
    productID: 7,
    frontImg: Product_7,
    backImg: Product_7_1,
    productName: "Zessi Dresses",
    productPrice: 99,
    productReviews: "3k+ reviews",
  },
  {
    productID: 8,
    frontImg: Product_8,
    backImg: Product_8_1,
    productName: "Kirby T-Shirt",
    productPrice: 37,
    productReviews: "4k+ reviews",
  },
  {
    productID: 9,
    productName: "Diamond Solitaire Ring",
    productPrice: 2999.99,
    productReviews: 128,
    frontImg: "/Images/Products/ring_1.jpg",
    backImg: "/Images/Products/ring_2.jpg",
    productDescription: "Classic solitaire ring with a brilliant cut diamond",
    productCategory: "Rings",
    productSubCategory: "Engagement",
    productMaterial: "18K White Gold",
    productStone: "Diamond",
    productWeight: "1.5 carats",
    productSize: "6-10",
    productColor: "White",
    productStyle: "Classic",
    productOccasion: "Engagement",
    productGender: "Women",
    productBrand: "Luxury Jewelers",
    productCollection: "Signature",
    productLimited: true,
    productNew: true,
    productSale: false,
    productDiscount: 0,
    productStock: 5,
    productTags: ["diamond", "ring", "engagement", "luxury"],
  },
  {
    productID: 10,
    productName: "Pearl Drop Earrings",
    productPrice: 899.99,
    productReviews: 95,
    frontImg: "/Images/Products/earrings_1.jpg",
    backImg: "/Images/Products/earrings_2.jpg",
    productDescription: "Elegant pearl drop earrings with diamond accents",
    productCategory: "Earrings",
    productSubCategory: "Pearl",
    productMaterial: "14K Yellow Gold",
    productStone: "Pearl & Diamond",
    productWeight: "0.5 carats",
    productSize: "1.5 inches",
    productColor: "White & Yellow",
    productStyle: "Elegant",
    productOccasion: "Formal",
    productGender: "Women",
    productBrand: "Luxury Jewelers",
    productCollection: "Classic",
    productLimited: true,
    productNew: true,
    productSale: false,
    productDiscount: 0,
    productStock: 8,
    productTags: ["pearl", "earrings", "diamond", "formal"],
  },
  {
    productID: 11,
    productName: "Tennis Bracelet",
    productPrice: 2499.99,
    productReviews: 76,
    frontImg: "/Images/Products/bracelet_1.jpg",
    backImg: "/Images/Products/bracelet_2.jpg",
    productDescription: "Classic tennis bracelet with round brilliant diamonds",
    productCategory: "Bracelets",
    productSubCategory: "Diamond",
    productMaterial: "18K White Gold",
    productStone: "Diamond",
    productWeight: "3.0 carats",
    productSize: "7 inches",
    productColor: "White",
    productStyle: "Classic",
    productOccasion: "Formal",
    productGender: "Women",
    productBrand: "Luxury Jewelers",
    productCollection: "Signature",
    productLimited: true,
    productNew: true,
    productSale: false,
    productDiscount: 0,
    productStock: 3,
    productTags: ["diamond", "bracelet", "tennis", "luxury"],
  },
  {
    productID: 12,
    productName: "Emerald Pendant Necklace",
    productPrice: 1999.99,
    productReviews: 64,
    frontImg: "/Images/Products/necklace_1.jpg",
    backImg: "/Images/Products/necklace_2.jpg",
    productDescription: "Stunning emerald pendant with diamond halo",
    productCategory: "Necklaces",
    productSubCategory: "Pendant",
    productMaterial: "18K Yellow Gold",
    productStone: "Emerald & Diamond",
    productWeight: "2.0 carats",
    productSize: "18 inches",
    productColor: "Green & White",
    productStyle: "Elegant",
    productOccasion: "Formal",
    productGender: "Women",
    productBrand: "Luxury Jewelers",
    productCollection: "Signature",
    productLimited: true,
    productNew: true,
    productSale: false,
    productDiscount: 0,
    productStock: 4,
    productTags: ["emerald", "necklace", "diamond", "pendant"],
  },
  {
    productID: 13,
    productName: "Men's Diamond Cufflinks",
    productPrice: 1499.99,
    productReviews: 42,
    frontImg: "/Images/Products/cufflinks_1.jpg",
    backImg: "/Images/Products/cufflinks_2.jpg",
    productDescription: "Luxury diamond cufflinks for the distinguished gentleman",
    productCategory: "Men's Jewelry",
    productSubCategory: "Cufflinks",
    productMaterial: "18K White Gold",
    productStone: "Diamond",
    productWeight: "0.75 carats",
    productSize: "Standard",
    productColor: "White",
    productStyle: "Classic",
    productOccasion: "Formal",
    productGender: "Men",
    productBrand: "Luxury Jewelers",
    productCollection: "Signature",
    productLimited: true,
    productNew: true,
    productSale: false,
    productDiscount: 0,
    productStock: 6,
    productTags: ["diamond", "cufflinks", "men", "luxury"],
  },
];

// Export the store data as default
export default storeData;
