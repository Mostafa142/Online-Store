import React, { Component } from "react";
import classes from "../NavBar.module.css";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import DisplayMiniCartItems from "../../../Data/Cart/MiniCart";
import {
  selectCartTotal,
} from "../../../actions/Cart.selectors";
class MiniCart extends Component {
  render() {
    return (
      <section className={classes["miniCart-container"]}>
        <div className={classes["total"]}>
          <h3 className={classes["items"]}>
            My Bag,{" "}
            <span className={classes["number"]}>
              {this.props.totalItems} Items
            </span>
          </h3>
        </div>
        {this.props.items.length > 0 ? (
          <>
            <DisplayMiniCartItems items={this.props.items} />
            <div className={classes["check-out"]}>
              <h3>Total</h3>
              <h3>${this.props.totalPrice.toFixed(2)}</h3>
            </div>
            <div className={classes["check-btn-container"]}>
              <NavLink to="./pages/cart">
                <button className={classes["btn-default"]}>View Bag </button>
              </NavLink>
              <button className={classes["btn-default"]}>Check Out</button>
            </div>
          </>
        ) : (
          <p className={classes.empty}>You Have No Items In Your Cart !</p>
        )}
      </section>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    items: state.items,
    totalPrice: selectCartTotal(state),
  };
};
export default connect(mapStateToProps, null)(MiniCart);
