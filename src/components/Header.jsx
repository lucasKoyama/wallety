import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Squash as Hamburger } from 'hamburger-react';
import './Header.css';

class Header extends React.Component {
  showForm = () => {
    const walletForm = document.querySelector('.expense-form');
    if (walletForm.classList.contains('show-form')) {
      walletForm.classList.remove('show-form');
    } else {
      walletForm.classList.add('show-form');
    }
  };

  render() {
    const { email, expenses, editor } = this.props;
    let total = 0;
    try {
      total = expenses.reduce((spent, expense) => {
        const { currency, exchangeRates, value } = expense;
        return spent + exchangeRates[currency].ask * value;
      }, 0);
    } catch (error) {
      console.log(error);
    }
    const editingBlur = editor ? { filter: 'blur(2px)' } : {};
    return (
      <header className="header" style={ editingBlur }>
        <div className="user-info">
          <div className="wallet-container">
            <i className="fa-solid fa-wallet fa-3x" />
            <h3 className="total">
              <p>Despesas Total: </p>
              <i className="fa-solid fa-coins" />
              <span data-testid="total-field">{`  R$ ${total.toFixed(2)}`}</span>
              <span data-testid="header-currency-field"> BRL</span>
            </h3>
            <div className="show-form-btn">
              <Hamburger rounded onToggle={ () => this.showForm() } />
            </div>
          </div>
          <h3 data-testid="email-field" className="profile">
            {`${email} `}
            <i className="fa-solid fa-user" />
          </h3>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
});

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
