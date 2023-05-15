import PropTypes from 'prop-types';
import React from 'react';
import CategoriesMenu from '../components/CategoriesMenu';
import ProductCard from '../components/ProductCard';
import ShoppingCartButton from '../components/ShoppingCartButton';
import { getCategories } from '../services/api';
import '../style/ProcuctList.css';

class ProductsList extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      categories: [],
    };
  }

  async componentDidMount() {
    const categoriesList = await getCategories();
    this.setState({
      categories: categoriesList,
    });
  }

  handleInput = ({ target }) => {
    const { value } = target;
    this.setState({
      search: value,
    });
  }

  render() {
    const { search, categories } = this.state;
    const { products, queryClick, categoryClick, addToCartClick, cart } = this.props;
    let message;
    if (products && products.length > 0) {
      message = (
        products.map(({
          id,
          title,
          price,
          thumbnail,
          available_quantity: availableQuantity,
          shipping: { free_shipping: freeShipping },
        }) => (
          <ProductCard
            name={ title }
            price={ price }
            image={ thumbnail }
            freeShipping={ freeShipping }
            key={ id }
            id={ id }
            buttonClick={ addToCartClick }
            availableQuantity={ availableQuantity }
          />
        )));
    } else {
      message = 'Nenhum produto foi encontrado';
    }
    return (
      <div className="divMaior">
        <div className="divCategories">
          { categories.map((e) => (
            <CategoriesMenu
              onClick={ categoryClick }
              key={ e.name }
              name={ e.name }
              id={ e.id }
            />)) }
        </div>
        <div className="divContent">
          <div className="divInputCart">
            <div className="divInput">
              <input
                type="text"
                value={ search }
                onChange={ this.handleInput }
                data-testid="query-input"
                className="input"
              />
              <button
                type="button"
                onClick={ () => queryClick(search) }
                data-testid="query-button"
                className="searchButton"
              >
                Pesquisar
              </button>
            </div>
            <div className="divCart">
              <ShoppingCartButton cart={ cart } />
            </div>
          </div>
          <div className="divProducts">
            {products
              ? message
              : (
                <p
                  data-testid="home-initial-message"
                >
                  Digite algum termo de pesquisa ou escolha uma categoria.
                </p>
              )}
          </div>
        </div>
      </div>
    );
  }
}

ProductsList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape()),
  queryClick: PropTypes.func.isRequired,
  categoryClick: PropTypes.func.isRequired,
  addToCartClick: PropTypes.func.isRequired,
  cart: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

ProductsList.defaultProps = {
  products: undefined,
};

export default ProductsList;
