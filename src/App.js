import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Checkout from './pages/Checkout';
import ProductDetails from './pages/ProductDetails';
import ProductsList from './pages/ProductsList';
import ShoppingCart from './pages/ShoppingCart';
import * as api from './services/api';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      products: undefined,
      cart: [],
      evaluations: [],
    };
  }

  componentDidMount() {
    const response = JSON.parse(localStorage.getItem('evaluations'));
    if (response) {
      this.setState({
        evaluations: response,
      });
    }

    const response2 = JSON.parse(localStorage.getItem('cart'));
    if (response2) {
      this.setState({
        cart: response2,
      });
    }
  }

  fetchProductsFromQuery = async (query) => {
    const queryResults = await api.getProductsFromQuery(query);
    this.setState({
      products: [...queryResults.results],
    });
  }

  fetchProductsFromCategory = async (categoryId) => {
    const categoryResults = await api.getProductsFromCategory(categoryId);
    this.setState({
      products: [...categoryResults.results],
    });
  }

  saveCartToStorage = () => {
    const { cart } = this.state;
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  addToCart = (price, name, qtd, availableQuantity) => {
    this.setState((prevState) => ({
      cart: [...prevState.cart, { name, price, qtd, availableQuantity }],
    }), () => this.saveCartToStorage());
  }

  deleteFromCard = (name, qtd) => {
    if (qtd === 1) {
      qtd = 1;
    } else {
      qtd -= 1;
    }
  }

  saveEvaluationToStorage = () => {
    const { evaluations } = this.state;
    localStorage.setItem('evaluations', JSON.stringify(evaluations));
  }

  addEvaluation = (id, rate, email, comment) => {
    this.setState((prevState) => ({
      evaluations: [...prevState.evaluations, { id, rate, email, comment }],
    }), () => this.saveEvaluationToStorage());
  }

  render() {
    const { products, cart, evaluations } = this.state;
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route
              path="/shopping-cart"
              render={ () => (
                <ShoppingCart
                  cart={ cart }
                  addFunc={ this.addToCart }
                  dltFunc={ this.deleteFromCard }
                  key="ShoppingCart"
                />
              ) }
            />
            <Route
              path="/product-details/:id"
              render={ (props) => (
                <ProductDetails
                  cart={ cart }
                  addToCart={ this.addToCart }
                  addEvaluation={ this.addEvaluation }
                  evaluations={ evaluations }
                  { ...props }
                />
              ) }
            />
            <Route path="/checkout" component={ Checkout } />
            <Route
              path="/"
              render={ () => (
                <ProductsList
                  cart={ cart }
                  products={ products }
                  queryClick={ this.fetchProductsFromQuery }
                  categoryClick={ this.fetchProductsFromCategory }
                  addToCartClick={ this.addToCart }
                />
              ) }
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
