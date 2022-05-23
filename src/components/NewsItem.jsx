import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, img, author, date, newsUrl, source } = this.props;
    return (
      <div className="my-3">
        <div className="card">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              position: "absolute",
              right: "0",
              margin: "5px 5px",
            }}
          >
            <span className="badge rounded-pill bg-danger "> {source}</span>
          </div>
          <img
            src={img}
            className="card-img-top"
            alt="..."
            style={{ height: "14rem", objectFit: "cover" }}
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                By {author ? author : "unknown"} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a href={newsUrl} className="btn btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
