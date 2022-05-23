import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Loader from "./Loader";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 15,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      article: [],
      loading: false,
      page: 1,
    };
  }

  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=21b5ccf3f5ec447f8e35639fc8c2c27e&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({
      article: parsedData.articles,
      totalArticles: parsedData.totalResults,
      loading: false,
    });
  }

  async componentDidMount() {
    this.updateNews();
  }

  handlePreviousClick = async () => {
    this.setState({
      page: this.state.page - 1,
    });
    this.updateNews();
  };
  handleNextClick = async () => {
    this.setState({
      page: this.state.page + 1,
    });
    this.updateNews();
  };

  render() {
    return (
      <div className="container my-3">
        <h1 style={{ textAlign: "center" }}>NewsDekho - Top Headlines</h1>
        {this.state.loading && <Loader />}
        <div className="row">
          {!this.state.loading &&
            this.state.article.map((item) => {
              return (
                <div className="col-md-4" key={item.url}>
                  <NewsItem
                    title={item.title ? item.title : ""}
                    description={item.description ? item.description : ""}
                    img={
                      item.urlToImage
                        ? item.urlToImage
                        : "https://media-exp1.licdn.com/dms/image/C4E0BAQFXYSTFbEdpuQ/company-logo_200_200/0/1621810326169?e=2147483647&v=beta&t=KcxTXpGnfQoy9L3RoPTabwQYNINHZjJq0oWMgYHSY6Q"
                    }
                    author={item.author}
                    date={item.publishedAt}
                    source={item.source.name}
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
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalArticles / this.props.pageSize)
              }
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
