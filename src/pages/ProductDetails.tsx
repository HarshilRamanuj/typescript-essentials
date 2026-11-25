import ProductCard from "../components/ProductCard";

const ProductDetails = () => {
  const productList = [
    {
      id: 1,
      title: "MRF BAT",
      desc: "Kashmir Willow Bats",
      price: 9999,
      discount: 7999,
    },
    {
      id: 2,
      title: "SG BAT",
      desc: "English Willow Bats",
      price: 19999,
      discount: 17999,
    },
    {
      id: 3,
      title: "SS BAT",
      desc: "Kashmir Willow Bats, Player Edition",
      price: 21000,
      discount: 19999,
    },
  ];

  return (
    <div className="batCategory">
      {productList.map((item) => {
        return (
          <ProductCard
            key={item.id}
            title={item.title}
            desc={item.desc}
            price={item.price}
            discount={item.discount}
          />
        );
      })}
    </div>
  );
};

export default ProductDetails;
