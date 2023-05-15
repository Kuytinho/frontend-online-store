import PropTypes from 'prop-types';
import '../style/ShoppingCart.css';
import React from 'react';

class CartProductCard extends React.Component {
  constructor() {
    super();
    this.state = {
      quantity: 0,
    };
  }

  componentDidMount() {
    const { qtd } = this.props;
    this.setState({
      quantity: qtd,
    });
  }

  removeFunction = () => {
    const { dltFunc } = this.props;
    this.setState((prevState) => ({
      quantity: prevState.quantity - 1,
    }), () => dltFunc(1));
  }

  addFunction = () => {
    const { addFunc } = this.props;
    this.setState((prevState) => ({
      quantity: prevState.quantity + 1,
    }), () => addFunc(1));
  }

  render() {
    const { name, price, availableQuantity } = this.props;
    const { quantity } = this.state;
    const addEnabled = quantity < availableQuantity;
    const removeEnabled = quantity > 1;
    return (
      <div className="productInCart">
        <div className="divNamePrice">
          <p data-testid="shopping-cart-product-name">{ name }</p>
          <h3>{ `R$${(price * quantity).toFixed(2)}` }</h3>
        </div>
        <div className="divQtd">
          <p>Quantidade:</p>
          <button
            data-testid="product-decrease-quantity"
            type="button"
            onClick={ this.removeFunction }
            className="btn btn-primary btn-product-add"
            disabled={ !removeEnabled }
          >
            <p className="btnValue">-</p>
          </button>
          <h5 data-testid="shopping-cart-product-quantity">{ quantity }</h5>
          <button
            data-testid="product-increase-quantity"
            type="button"
            onClick={ this.addFunction }
            className="btn btn-primary btn-product-add"
            disabled={ !addEnabled }
          >
            <p className="btnValue">+</p>
          </button>

        </div>
      </div>
    );
  }
}
CartProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  addFunc: PropTypes.func.isRequired,
  dltFunc: PropTypes.func.isRequired,
  availableQuantity: PropTypes.number.isRequired,
  qtd: PropTypes.number.isRequired,
};
export default CartProductCard;
