import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let {title,description,img,newsUrl}=this.props;
        return (
            <div className='my-3'>
                <div className="card">
                    <img src={img} className="card-img-top" alt="..." style={{height:"14rem",objectFit:"cover"}}/>
                        <div className="card-body" >
                            <h5 className="card-title">{title}...</h5>
                            <p className="card-text">{description}...</p>
                            <a href={newsUrl} className="btn btn-dark">Read More</a>
                        </div>
                </div>
            </div>
        )
    }
}

export default NewsItem