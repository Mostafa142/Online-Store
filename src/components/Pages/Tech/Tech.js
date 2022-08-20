import React, { Component } from "react";
import TechTypes from "../../../Data/Pages/Tech";
import classes from "../../CardsContainer/CardsContainer.module.css";

class Kids extends Component {
  render() {
    return (
      <section className={classes.container}>
        <h2 className={classes["category-heading"]}>Tech</h2>
        <section className={classes["cards-container"]}>
          <TechTypes />
        </section>
      </section>
    );
  }
}

export default Kids;
