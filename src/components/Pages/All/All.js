import React, { Component } from "react";
import AllTypes from "../../../Data/Pages/All";
import classes from "../../CardsContainer/CardsContainer.module.css";

class All extends Component {
  render() {
    return (
      <>
        <section className={classes.container}>
          <h2 className={classes["category-heading"]}>All</h2>
          <section className={classes["cards-container"]}>
            <AllTypes />
          </section>
        </section>
      </>
    );
  }
}

export default All;
