import { React, Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CardsContainer from "./components/CardsContainer/CardsContainer";
import NavBar from "./components/NavBar/NavBar";
import Clothes from "./components/Pages/Clothes/Clothes";
import Tech from "./components/Pages/Tech/Tech.js";
import Cart from "./components/Cart/Cart";
import Product from "./components/Pages/Product/Product";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import All from "./components/Pages/All/All";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <Router>
            <NavBar />
            <Routes>
              <Route path="/" element={<CardsContainer title="Home" />} />
              <Route path="/pages/all" element={<All />} />
              <Route path="/pages/clothes" element={<Clothes />} />
              <Route path="/pages/tech" element={<Tech />} />
              <Route path="/products/:id" element={<Product />} />
              <Route path="/pages/all/products/:id" element={<Product />} />
              <Route path="/pages/clothes/products/:id" element={<Product />} />
              <Route path="/pages/tech/products/:id" element={<Product />} />
              <Route path="/pages/Cart" element={<Cart />} />
            </Routes>
          </Router>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
