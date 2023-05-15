import PropTypes from 'prop-types';
import React from 'react';
import EvaluationForm from '../components/EvaluationForm';
import ShoppingCartButton from '../components/ShoppingCartButton';
import * as api from '../services/api';
import '../style/ProductDetails.css';

class ProductDetails extends React.Component {
  constructor() {
    super();

    this.state = ({
      thumbnail: '',
      title: '',
      price: 0,
      attributes: [],
      id: '',
      availableQuantity: 0,
      quantity: 1,
      freeShipping: false,
    });
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const results = await api.getItemDetails(id);
    const {
      thumbnail,
      title,
      price,
      attributes,
      available_quantity: availableQuantity,
      shipping: { free_shipping: freeShipping },
    } = results;
    this.setState({
      thumbnail,
      title,
      price,
      attributes,
      id,
      availableQuantity,
      freeShipping,
    });
  }

  removeFunction = () => {
    this.setState((prevState) => ({
      quantity: prevState.quantity - 1,
    }));
  }

  addFunction = () => {
    this.setState((prevState) => ({
      quantity: prevState.quantity + 1,
    }));
  }

  render() {
    const {
      thumbnail, title, price, attributes, id, availableQuantity, quantity, freeShipping,
    } = this.state;
    const { addEvaluation, evaluations, addToCart, cart } = this.props;
    const addEnabled = quantity < availableQuantity;
    const removeEnabled = quantity > 1;
    return (
      <div className="detailsPage">
        <ShoppingCartButton cart={ cart } />
        { freeShipping && <p data-testid="free-shipping">Frete grátis</p>}
        <div className="divProductSec">
          <div className="divNameImage">
            <p data-testid="product-detail-name">{title}</p>
            <p>{`R$ ${price}`}</p>
            <img src={ thumbnail } alt={ title } />
          </div>
          Quantidade:
          <button
            data-testid="product-increase-quantity"
            type="button"
            onClick={ this.addFunction }
            disabled={ !addEnabled }
          >
            +
          </button>
          <h5 data-testid="shopping-cart-product-quantity">{ quantity }</h5>
          <button
            data-testid="product-decrease-quantity"
            type="button"
            onClick={ this.removeFunction }
            disabled={ !removeEnabled }
          >
            -
          </button>
          <div className="divProductDetails">
            <div className="divProductDetailsOverflow">
              {attributes.map((attribute) => (
                <p key={ attribute.id }>
                  {attribute.name}
                  {' '}
                  :
                  {' '}
                  {attribute.value_name}
                </p>
              ))}
            </div>
            <div className="divButtonToCart">
              <button
                type="button"
                onClick={ () => addToCart(price, title, quantity, availableQuantity) }
                data-testid="product-detail-add-to-cart"
              >
                Adicionar ao carrinho
              </button>
            </div>
          </div>
        </div>
        <EvaluationForm addEvaluation={ addEvaluation } id={ id } />
        { evaluations.filter((e) => e.id === id)
          .map((e, index) => (
            <div className="divAvaliateCards" key={ index }>
              <p>{e.email}</p>
              <p>{e.rate}</p>
              <p>{e.comment}</p>
            </div>
          ))}
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  addEvaluation: PropTypes.func.isRequired,
  evaluations: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  addToCart: PropTypes.func.isRequired,
  cart: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default ProductDetails;
