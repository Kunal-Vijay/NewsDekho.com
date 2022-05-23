import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Loader from "./Loader";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

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

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      article: [],
      loading: false,
      page: 1,
      totalArticles: 0,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - NewsDekho`;
  }

  async updateNews() {
    this.props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=21b5ccf3f5ec447f8e35639fc8c2c27e&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(50);
    // console.log(parsedData);
    this.setState({
      article: parsedData.articles,
      totalArticles: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=21b5ccf3f5ec447f8e35639fc8c2c27e&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({
      article: this.state.article.concat(parsedData.articles),
      totalArticles: parsedData.totalResults,
      loading: false,
    });
  };

  render() {
    return (
      <>
        <h1 style={{ textAlign: "center" }}>
          NewsDekho - Top {this.capitalizeFirstLetter(this.props.category)}{" "}
          Headlines
        </h1>
        {this.state.loading && <Loader />}
        <InfiniteScroll
          dataLength={this.state.article.length}
          next={this.fetchMoreData}
          hasMore={this.state.article.length !== this.state.totalArticles}
          loader={this.state.loading && <Loader />}
        >
          <div className="container">
            <div className="row">
              {this.state.article.map((item) => {
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
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
