import React, { Component } from "react";
import DisplaySingleProduct from "../../../Data/Products/SingleProduct";
import { connect } from "react-redux";
import { addItemToCartHandler } from "../../../actions/Actions";

class Product extends Component {
  render() {
    return (
      <DisplaySingleProduct
        items={this.props.items}
        handleCartClick={this.props.addItemToCartHandler}
      />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    items: state.items,
  };
};
export default connect(mapStateToProps, { addItemToCartHandler })(Product);
