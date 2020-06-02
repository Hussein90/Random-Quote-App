import React, { Component } from "react";
import "./styles.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
class App extends Component {
  state = {
    quote: []
  };

  componentDidMount() {
    this.getQuote();
  }

  async getQuote() {
    try {
      const url =
        "https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand";
      const response = await fetch(url);
      const data = await response.json();
      const quoteNum = Math.floor(Math.random() * data.length); //quote number
      const randomQuote = data[quoteNum]; //actual quote

      if (data) {
        this.setState({
          quote: randomQuote.content.rendered,
          author: randomQuote.title.rendered
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  getNewQuote = () => {
    //will be called on clicking the New Quote button
    this.getQuote();
  };

  render() {
    return (
      <div className="App">
        <h1> Random Quote App</h1>
        <div id="wrapper">
          <div id="quote-box">
            <div
              id="text"
              className="quote-text"
              dangerouslySetInnerHTML={{ __html: this.state.quote }}
            />
            <div id="author" className="quote-author">
              {this.state.author}
            </div>
            <button
              className="button"
              id="new-quote"
              onClick={this.getNewQuote}
            >
              New quote
            </button>
            <a
              title="Tweet this quote!"
              target="_blank"
              href="www.twitter.com/intent/tweet"
              id="tweet-quote"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
