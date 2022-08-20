import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../../actions/Actions";
import classes from "../../components/Pages/Product/Product.module.css";

const DisplaySingleProduct = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedAttributeOne, setSelectedAttributeOne] = useState(false);
  const [selectedAttributeTwo, setSelectedAttributeTwo] = useState(false);
  const [selectedAttributeThree, setSelectedAttributeThree] = useState(false);
  const [selectedAttributeFour, setSelectedAttributeFour] = useState(false);
  const SINGLE_PRODUCT_QUERY = gql`
  query GetSingleProduct {
    product(id: "${id}") {
      id
      name
      inStock
      gallery
      description
      category
      brand
      attributes{
        id
        name
        type
        items{
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          symbol
        }
        amount
      }
    }
  }
`;

  const { loading, error, data } = useQuery(SINGLE_PRODUCT_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return `Error! ${error.message} ${error.extraInfo} `;

  const Src_One = data.product.gallery[0];
  const name = data.product.name;
  const brand = data.product.brand;
  const attributes = data.product.attributes;
  const price = data.product.prices[0].amount;
  const currency = data.product.prices[0].currency.symbol;
  const description = data.product.description.replace(/(<([^>]+)>)/gi, "");
  const imageSrc = data.product.gallery;

  const handleAddToCart = (item) => {
    if (!item) return;
    dispatch(addProduct(item));
  };

  return (
    <div className={classes["container"]}>
      <div className={classes["mini-photos"]}>
        {/* IMAGES */}
        {imageSrc.map((src, id) => {
          return (
            <img
              key={id}
              className={classes["mini-photo"]}
              src={src}
              alt={`img ${id}`}
              onClick={() => setSelectedImage(src)}
            />
          );
        })}
      </div>
      <div className={classes["large-photo"]}>
        <img src={selectedImage === null ? Src_One : selectedImage} alt={id} />
      </div>
      <div className={classes["item-description"]}>
        <section className={classes["item-title"]}>
          <h3 className={classes["brand"]}>{brand}</h3>
          <h3 className={classes["type"]}>{name}</h3>
        </section>
        {/* ATTRIBUTES */}
        {attributes &&
          attributes.map(({ name, items, type, id }) => {
            return (
              <div key={id}>
                {type === "text" ? (
                  <section key={id} className={classes["size"]}>
                    <h3 className={classes["item-heading"]}>{name}:</h3>
                    <div className={classes["size-container"]}>
                      {items.map(({ value, id }) => {
                        return (
                          <button
                            key={id}
                            onClick={() => {
                              name === "Capacity"
                                ? setSelectedAttributeOne(`${value}-${name}`)
                                : name === "With USB 3 ports"
                                ? setSelectedAttributeTwo(`${value}-${name}`)
                                : setSelectedAttributeThree(`${value}-${name}`);
                            }}
                            className={
                              selectedAttributeOne === `${value}-${name}` ||
                              selectedAttributeTwo === `${value}-${name}` ||
                              selectedAttributeThree === `${value}-${name}`
                                ? classes["btn-default-active"]
                                : classes["btn-default"]
                            }
                          >
                            {value}
                          </button>
                        );
                      })}
                    </div>
                  </section>
                ) : (
                  <section key={id} className={classes["color"]}>
                    <h3 className={classes["item-heading"]}>{name}:</h3>
                    <div className={classes["colors-container"]}>
                      {items.map(({ value, id }) => {
                        return (
                          <button
                            onClick={() => {
                              setSelectedAttributeFour(`${value}-${name}`);
                            }}
                            key={id}
                            style={{ backgroundColor: value }}
                            className={
                              selectedAttributeFour === `${value}-${name}`
                                ? classes["btn-color-active"]
                                : classes["btn-color"]
                            }
                          ></button>
                        );
                      })}
                    </div>
                  </section>
                )}
              </div>
            );
          })}
        <section className={classes["price-container"]}>
          <h3 className={classes["item-heading"]}>Price:</h3>
          <h3 className={classes["price"]}>
            {currency}
            {price}
          </h3>
        </section>
        <div className={classes["btn-cart-container"]}>
          <button
            onClick={() => {
              // addItemToCartHandler({
              //   ...data.product,
              //   selectedAttributeOne,
              //   selectedAttributeTwo,
              //   selectedAttributeThree,
              //   selectedAttributeFour,
              //   amount: 1,
              // });
              handleAddToCart(data.product);
            }}
            className={classes["btn-add-to-cart"]}
          >
            ADD TO CART
          </button>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};
export default DisplaySingleProduct;
