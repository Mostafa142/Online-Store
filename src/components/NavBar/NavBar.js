import React, { Component } from "react";
import classes from "./NavBar.module.css";
import greenCart from "../../assets/greenCart.svg";
import Cart from "../../assets/cart.svg";
import { NavLink } from "react-router-dom";
import { showMenu, showCart } from "../../actions/Actions";
import { connect } from "react-redux";
import MiniCart from "./MiniCart/MiniCart";
import DisplayCurrency from "../../Data/Currency/Currency";
import { withHooksHOC } from "../HOC";
import { selectCartItemsCount } from "../../actions/Cart.selectors";


class NavBar extends Component {
  constructor(props) {
    super(props);
    this.toggleCurrencyDropdown = this.toggleCurrencyDropdown.bind(this);
    this.toggleMiniCart = this.toggleMiniCart.bind(this);
  }
  toggleCurrencyDropdown() {
    this.props.showMenu();
  }
  toggleMiniCart() {
    this.props.showCart();
  }

  render() {
    const path = this.props.location.pathname;
    return (
      <>
        <nav className={classes["nav-bar"]}>
          <ul className={classes["nav-container"]}>
            <li className={classes["nav-links"]}>
              <NavLink
                to="./pages/all"
                className={path === "/pages/all" ? classes["active"] : ""}
              >
                All
              </NavLink>
            </li>
            <li className={classes["nav-links"]}>
              <NavLink
                to="./pages/clothes"
                className={path === "/pages/clothes" ? classes["active"] : ""}
              >
                Clothes
              </NavLink>
            </li>
            <li className={classes["nav-links"]}>
              <NavLink
                to="./pages/tech"
                className={path === "/pages/tech" ? classes["active"] : ""}
              >
                Tech
              </NavLink>
            </li>
          </ul>
          <NavLink to="./" className={classes.logo}>
            <img src={greenCart} alt="green cart" />
          </NavLink>
          <section className={classes["nav-categories"]}>
            <a
              href="\\"
              onClick={this.toggleCurrencyDropdown}
              className={classes["btn-currency"]}
            >
              <strong>$</strong>
            </a>
            <ul
              className={
                this.props.setOpen ? classes.dropdown : classes["dropdown-show"]
              }
            >
              <DisplayCurrency/>
            </ul>
            <div className={classes["cart-icon"]}>
              <button
                onClick={this.toggleMiniCart}
                className={classes["btn-cart"]}
              >
                <span className={classes["counter"]}>
                  {this.props.totalNumberCartItems}
                </span>
                <img src={Cart} alt=" cart" />
              </button>
              {this.props.show && <MiniCart  totalItems={this.props.totalNumberCartItems}/>}
            </div>
          </section>
        </nav>
        <div className={this.props.show ? classes["backdrop"] : null}></div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    setOpen: state.setOpen,
    show: state.show,
    items: state.items,
    totalNumberCartItems: selectCartItemsCount(state),
  };
};

export default connect(mapStateToProps, { showMenu, showCart })(
  withHooksHOC(NavBar)
);
