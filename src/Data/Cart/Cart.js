import React, { useState } from "react";
import { useDispatch } from "react-redux/es/exports";
import classes from "../../components/Cart/Cart.module.css";
import {
  removeItemFromCartHandler,
  reduceCartItem,
  addProduct,
} from "../../actions/Actions";

const DisplayCartItems = (props) => {
  const dispatch = useDispatch();
  const [selectedAttributeOne, setSelectedAttributeOne] = useState(false);
  const [selectedAttributeTwo, setSelectedAttributeTwo] = useState(false);
  const [selectedAttributeThree, setSelectedAttributeThree] = useState(false);
  const [selectedAttributeFour, setSelectedAttributeFour] = useState(false);

  return props.items.map((item) => {
    const handleAddProduct = (item) => {
      dispatch(addProduct(item));
    };

    const handleRemoveCartItem = (id) => {
      dispatch(
        removeItemFromCartHandler({
          id,
        })
      );
    };

    const handleReduceItem = (item) => {
      dispatch(reduceCartItem(item));
    };
    console.log(props);
    return (
      <section key={item.id} className={classes["item-container"]}>
        <div className={classes["item-description"]}>
          <section className={classes["item-title"]}>
            <h3 className={classes["brand"]}>{item.brand}</h3>
            <h3 className={classes["type"]}>{item.name}</h3>
            <h3 className={classes["price"]}>
              {item.prices[0].currency.symbol}
              {(item.prices[0].amount * item.quantity).toFixed(2)}
            </h3>
          </section>
          {/* ATTRIBUTES */}
          {item.attributes &&
            item.attributes.map(({ name, items, type, id }) => {
              return (
                <div key={id}>
                  {type === "text" ? (
                    <section key={id} className={classes["size"]}>
                      <h3 className={classes["item-heading"]}>{name}:</h3>
                      <div className={classes["size-container"]}>
                        {items.map(({ value, id }) => {
                          return (
                            <button
                              onClick={() => {
                                name === "Capacity"
                                  ? setSelectedAttributeOne(`${value}-${name}`)
                                  : name === "With USB 3 ports"
                                  ? setSelectedAttributeTwo(`${value}-${name}`)
                                  : setSelectedAttributeThree(
                                      `${value}-${name}`
                                    );
                              }}
                              key={id}
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
        </div>
        <div className={classes["counter-container"]}>
          <div className={classes["item-counter"]}>
            <button
              onClick={() => {
                handleAddProduct(item);
              }}
              className={classes["btn-default"]}
            >
              +
            </button>
            <p className={classes["num-items"]}>{item.quantity}</p>
            <button
              onClick={() => {
                handleReduceItem(item);
              }}
              className={classes["btn-default"]}
            >
              -
            </button>
          </div>
          <div className={classes["cart-image"]}>
            <img src={item.gallery[0]} alt="" />
            <button className={classes["arrow"]}> &lt;</button>
            <button className={classes["arrow"]}> &gt; </button>
            <button
              onClick={() => {
                handleRemoveCartItem(item.id);
              }}
              className={classes["arrow"]}
            >
              {" "}
              x{" "}
            </button>
          </div>
        </div>
      </section>
    );
  });
};

export default DisplayCartItems;
