import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import CartProductCard from '../components/CartProductCard';
import '../style/ShoppingCart.css';

class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.state = {
      add: 0,
    };
  }

  addProd = (num) => {
    this.setState((prevstate) => ({
      add: prevstate.add + num,
    }));
  }

  dltProd = (num) => {
    this.setState((prevstate) => ({
      add: prevstate.add - num,
    }));
  }

  render() {
    const { cart } = this.props;
    const { add } = this.state;
    const emptyCartElement = (
      <h1 data-testid="shopping-cart-empty-message">
        Seu carrinho está vazio
      </h1>
    );
    return (
      <div className="divMaiorShopping">
        { cart.length > 0
          ? (
            <div className="divCartProductsFinish">
              <div className="divCartProducts">
                {cart.map((e) => (
                  <CartProductCard
                    name={ e.name }
                    price={ e.price }
                    key={ e.name[0] + e.price }
                    qtd={ e.qtd }
                    addFunc={ this.addProd }
                    dltFunc={ this.dltProd }
                    availableQuantity={ e.availableQuantity }
                  />
                ))}
              </div>
              <div className="divFinish">
                <p>{ `Total de Produtos: ${cart.length + add}` }</p>
                <Link
                  to="/checkout"
                  data-testid="checkout-products"
                >
                  <button className="btnFinish" type="button">Finalizar compra</button>
                </Link>
              </div>
            </div>
          )
          : emptyCartElement }
      </div>
    );
  }
}
ShoppingCart.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
export default ShoppingCart;
