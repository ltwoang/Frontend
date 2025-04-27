import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../Context/CartContext";
import { useWishlist } from "../../Context/WishlistContext";
import { toast } from "react-hot-toast";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  // State quản lý trạng thái yêu thích
  const [isWishlist, setIsWishlist] = useState(false);
  
  // Lấy các hàm từ context
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, wishlistItems } = useWishlist();

  // Kiểm tra xem sản phẩm có trong wishlist không
  React.useEffect(() => {
    setIsWishlist(wishlistItems.some((item) => item.id === product.id));
  }, [wishlistItems, product.id]);

  // Hàm xử lý khi click vào nút yêu thích
  const handleWishlistClick = () => {
    if (isWishlist) {
      removeFromWishlist(product.id);
      toast.success("Đã xóa khỏi danh sách yêu thích");
    } else {
      addToWishlist(product);
      toast.success("Đã thêm vào danh sách yêu thích");
    }
    setIsWishlist(!isWishlist);
  };

  // Hàm xử lý khi click vào nút thêm vào giỏ hàng
  const handleAddToCart = () => {
    addToCart(product);
    toast.success("Đã thêm vào giỏ hàng");
  };

  return (
    <div className="productCard">
      {/* Phần hình ảnh sản phẩm */}
      <div className="productImage">
        <Link to={`/product/${product.id}`}>
          <img src={product.productImages[0]} alt={product.name} />
        </Link>
        
        {/* Nút yêu thích */}
        <button className="wishlistButton" onClick={handleWishlistClick}>
          {isWishlist ? (
            <FaHeart className="wishlistIcon" color="red" />
          ) : (
            <FaRegHeart className="wishlistIcon" />
          )}
        </button>
      </div>

      {/* Thông tin sản phẩm */}
      <div className="productInfo">
        <Link to={`/product/${product.id}`}>
          <h3 className="productName">{product.name}</h3>
        </Link>
        <p className="productPrice">${product.price}</p>
        
        {/* Nút thêm vào giỏ hàng */}
        <button className="addToCartButton" onClick={handleAddToCart}>
          <FaShoppingCart className="cartIcon" />
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
};

export default ProductCard; 