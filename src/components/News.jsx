import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  constructor() {
    super();
    this.state = {
      article: [],
      loading: false,
      page: 1,
    };
  }
  async componentDidMount() {
    let url =
      "https://newsapi.org/v2/top-headlines?country=in&apiKey=21b5ccf3f5ec447f8e35639fc8c2c27e&page=1&pageSize=15";
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      article: parsedData.articles,
      totalArticles: parsedData.totalResults,
    });
  }

  handlePreviousClick = async () => {
    console.log("prev");
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=21b5ccf3f5ec447f8e35639fc8c2c27e&page=${
      this.state.page - 1
    }&pageSize=15`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      article: parsedData.articles,
    });
  };
  handleNextClick = async () => {
    if (this.state.page + 1 <= Math.ceil(this.state.totalArticles / 15)) {
      console.log("next");
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=21b5ccf3f5ec447f8e35639fc8c2c27e&page=${
        this.state.page + 1
      }&pageSize=15`;
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({
        page: this.state.page + 1,
        article: parsedData.articles,
      });
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h1>NewsDekho - Top Headlines</h1>
        <div className="row">
          {this.state.article.map((item) => {
            return (
              <div className="col-md-4" key={item.url}>
                <NewsItem
                  title={item.title ? item.title.slice(0, 45) : ""}
                  description={
                    item.description ? item.description.slice(0, 100) : ""
                  }
                  img={
                    item.urlToImage
                      ? item.urlToImage
                      : "https://media-exp1.licdn.com/dms/image/C4E0BAQFXYSTFbEdpuQ/company-logo_200_200/0/1621810326169?e=2147483647&v=beta&t=KcxTXpGnfQoy9L3RoPTabwQYNINHZjJq0oWMgYHSY6Q"
                  }
                  newsUrl={item.url}
                />
              </div>
            );
          })}
          <div className="container d-flex justify-content-between">
            <button
              type="button"
              disabled={this.state.page <= 1}
              className="btn btn-dark"
              onClick={this.handlePreviousClick}
            >
              &larr;Previous
            </button>
            <button
              type="button"
              disabled={this.state.page > (this.state.totalArticles/15)}
              className="btn btn-dark"
              onClick={this.handleNextClick}
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default News;
