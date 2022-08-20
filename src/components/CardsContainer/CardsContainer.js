import React, { Component } from 'react';
import Card from '../Card/Card';
import classes from './CardsContainer.module.css';

class Category extends Component {
    render() {
        return (
            <section className={classes.container}>
                <h2 className={classes['category-heading']}>{this.props.title}</h2>
                <section className={classes['cards-container']}>
                    <Card  />
                </section>
            </section>
        );
    }
}

export default Category;