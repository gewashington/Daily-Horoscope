import React, { Component } from 'react';
import axios from 'axios';
import { capitalize } from 'lodash';

import './App.css';

/*
? Move retreived horoscope to it's own component?
*TODO: Make more tests
*TODO: Refactor CSS
*/

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInputValue: '',
      userHoroscope: '',
      error: null,
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    }

  handleChange(e) {
    this.setState({signInputValue: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    const astrologySigns = [
      'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 
      'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius' , 'Pisces'
    ]
    const { signInputValue } = this.state;
    const correctInput = astrologySigns.includes(capitalize(signInputValue));
    if ( !correctInput ) {
      this.setState({ error: `Please use one of the twelve signs of the zodiac. ${signInputValue} is not a sign!`})
    }
    
    else {
      axios.get(`http://horoscope-api.herokuapp.com/horoscope/today/${signInputValue}`)
        .then(response => {
          this.setState({
            userHoroscope: response.data.horoscope,
            error: null,
          })
        })
        .catch((error) => {
          if (error.request) {
            this.setState({ error: 'Problem with retrieving horoscope. Please try again later!'})
          }
        });
      }
  }
  render() {
    const {userHoroscope, error} = this.state;
    const containerStyle = {
      padding: '30px',
    }

    const textStyle = {
      fontFamily: 'Muli, sans-serif',
      marginBottom: '4px',
    }

    return (
      <div style={containerStyle}>
        <form className="ui form" onSubmit={this.onSubmit}>
          <div style={textStyle}>
            Please enter your sunsign below to your daily reading!
          </div>
          <div className="fields">
            <div className="six wide field">
              <input
                className="ui input" 
                placeholder="E.g. Leo, Gemini, etc." 
                onChange={this.handleChange}
                />
            </div>
          </div>
          <input className="ui button" type="submit" value="Submit" />
        </form>
        {error ? 
          <div className='ui negative message'>
            <div className='header'>Error</div>
            <p>{error}</p>
          </div> 
          : null}
        {userHoroscope !== '' && !error ? 
          <div className='ui text container' name="horoscope-output">
            <h2 className='ui header'>{capitalize(this.state.signInputValue)}</h2>
            <p> {userHoroscope} </p>
          </div>
        : null}
      </div>
    );
  }
}

export default App;
