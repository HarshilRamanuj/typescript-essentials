import "../styles/productCard.css";

interface ProductInterface {
  title: string;
  desc: string;
  price: number;
  discount?: number;
}

const ProductCard = ({ title, desc, price, discount }: ProductInterface) => {
  return (
    <div className="productCardWrapper">
      <div className="cardHead">
        <h2>{title}</h2>
      </div>
      <div className="cardBody">
        <p>{desc}</p>
        <h4>MRP : {price}</h4>
      </div>
      <div className="cardFooter">
        <h3>Final Price : {discount}</h3>
      </div>
    </div>
  );
};

export default ProductCard;
