import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

/*
? Move retreived horoscope to it's own component?
*TODO: Create API test
*TODO: Error handling for submitted text that is not a sign
*TODO: Error handling on user's end for a server error
*TODO: CSS
*/

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInputValue: '',
      userHoroscope: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    }

  handleChange(e) {
    this.setState({signInputValue: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    axios.get(`http://horoscope-api.herokuapp.com/horoscope/today/${this.state.signInputValue}`)
      .then(response => {
        this.setState({userHoroscope: response.data.horoscope})
      })
      .catch((error) => {
        if (error.request) {
          console.log('Problem retrieving horoscope')
        }
      })
  }

  render() {
    const {userHoroscope} = this.state;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          Please enter your sunsign below to your daily reading!
          <input
            className="sign-input" 
            placeholder="E.g. Leo, Gemini, etc." 
            onChange={this.handleChange}
            value={this.state.signInputValue}
            />
          <input className="submit" type="submit" value="Submit" />
        </form>
        {userHoroscope !== '' ? 
        <div className="horoscope-output">
          Your horoscope: {userHoroscope} 
        </div>
        : null}
      </div>
    );
  }
}

export default App;
