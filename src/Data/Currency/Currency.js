import React from 'react';
import { useQuery, gql } from '@apollo/client';
import classes from '../../components/NavBar/NavBar.module.css'
const CURRENCY_QUERY = gql`
query GetCurrencies {
  currencies {
    label
    symbol
  }
}
`;

const DisplayCurrency = (props) => {
  const { loading, error, data } = useQuery(CURRENCY_QUERY);


  if (loading) return <p>Loading...</p>;
  if (error) return `Error! ${error.message} ${error.extraInfo} `;
  const currencies =  data.currencies;
  return currencies.map(({  label, symbol },i) => (
    <li key={i} className={classes.currency}><a href="#!" className={classes['btn-currency']}><strong>{symbol} {label}</strong></a></li>

  ));
}
export default DisplayCurrency