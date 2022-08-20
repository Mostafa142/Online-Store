import React, { Component } from "react";
import ClothesTypes from "../../../Data/Pages/Clothes";
import classes from "../../CardsContainer/CardsContainer.module.css";
class Clothes extends Component {
  render() {
    return (
      <section className={classes.container}>
        <h2 className={classes["category-heading"]}>Clothes</h2>
        <section className={classes["cards-container"]}>
          <ClothesTypes />
        </section>
      </section>
    );
  }
}

export default Clothes;
