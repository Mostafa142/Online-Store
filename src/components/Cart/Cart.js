import React, { Component } from "react";
import classes from "./Cart.module.css";
import DisplayCartItems from "../../Data/Cart/Cart";
import { connect } from "react-redux";
import {
  addItemToCartHandler,
  removeItemFromCartHandler,
} from "../../actions/Actions";
import {
  selectCartItemsCount,
  selectCartTotal,
} from "../../actions/Cart.selectors";

class Cart extends Component {
  render() {
    return (
      <div className={classes["container"]}>
        <h1 className={classes["main-heading"]}>Cart</h1>
        {this.props.items.length > 0 ? (
          <>
            <DisplayCartItems
              items={this.props.items}
              handleCartClick={this.props.addItemToCartHandler}
              handleRemoveCartClick={this.props.removeItemFromCartHandler}
            />
            <section className={classes["order-container"]}>
              <p>
                tax 21%:
                <strong>${(this.props.totalPrice * 0.21).toFixed(2)}</strong>
              </p>
              <p>
                Quantity: <strong>{this.props.totalNumberCartItems}</strong>
              </p>
              <p className={classes["total"]}>
                total: <strong>${this.props.totalPrice.toFixed(2)}</strong>
              </p>

              <button className={classes["btn-order"]}>Order</button>
            </section>
          </>
        ) : (
          <p className={classes.empty}>You Have No Items In Your Cart !</p>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    items: state.items,
    totalNumberCartItems: selectCartItemsCount(state),
    totalPrice: selectCartTotal(state),
  };
};
export default connect(mapStateToProps, {
  addItemToCartHandler,
  removeItemFromCartHandler,
})(Cart);
