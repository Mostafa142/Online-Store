import React from "react";
import { useQuery, gql } from "@apollo/client";
import classes from "../../components/Card/Card.module.css";
import Cart from "../../assets/cartWhite.svg";
import { NavLink } from "react-router-dom";

const TECH_QUERY = gql`
  query GetProducts {
    categories {
      name
      products {
        id
        name
        inStock
        description
        brand
        gallery
        prices {
          amount
          currency {
            label
            symbol
          }
        }
      }
    }
  }
`;

const TechTypes = (props) => {
  const { loading, error, data } = useQuery(TECH_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return `Error! ${error.message} ${error.extraInfo} `;
  return data.categories[2].products.map(
    ({ id, inStock, name, gallery, prices }) => {
      return (
        <NavLink key={id} to={inStock && `./products/${id}`}>
          <section className={inStock ? classes.card : classes["card-disable"]}>
            <div className={classes["card-image"]}>
              <div className={classes["product-image"]}>
                <img className={classes.product} src={gallery[5] ? gallery[5] : gallery[0]} alt={id} />
                <button className={classes["cart-icon"]}>
                  <img src={Cart} alt=" cart" />
                </button>
              </div>
            </div>
            <section className={classes["card-description"]}>
              <h4 className={classes["card-heading"]}>{name}</h4>
              <p className={classes.cost}>
                <strong>
                  {prices[0].currency.symbol}
                  {prices[0].amount}
                </strong>
              </p>
            </section>
          </section>
        </NavLink>
      );
    }
  );
};
export default TechTypes;
