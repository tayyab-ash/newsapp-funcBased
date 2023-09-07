import React, { Component } from "react";
import './NewsItem.css';

export class NewsItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSrc: props.imageUrl || 'https://i.ibb.co/JvHLYH0/News-APP-1.png',
    };
  }

  handleImageError = () => {
    // This function is called when the image fails to load.
    this.setState({
      imageSrc: 'https://i.ibb.co/zXk0dXC/News-APP-2.png', // Replace with your alternative image URL
    });
  };


  


  render() {
    let { title, description, newsUrl, author, date, source } = this.props;
    const { cardBG, cardBorder, cardTitle } = this.props.modeType;
    // console.log(this.props.modeType)
    return (
      <div>
        <div className={`card margin my-2 text-bg-${cardBG} border-${cardBorder}`} > {/*Use border secondary  */}
          <a href={newsUrl} target="_blank" rel="noopener noreferrer"><img src={this.state.imageSrc} onError={this.handleImageError} className="card-img-top" alt="Unable to load thumbnail."   /></a>
          <div className="card-body">
            <p className="card-text mb-2"><small className="text-danger">{source === '[Removed]'? 'Source not available': source}</small></p>
            <h5 className="card-title"><a className={`link-${cardTitle} text-decoration-none`} target="_blank" rel="noopener noreferrer" href={newsUrl}>{title ==='[Removed]'? 'Sorry! This news is not avaiable right now. Please refresh to update news catalog!' : title}</a></h5>
            <p className="card-text">
              {description === '[Removed]'? 'Description not available. Click read more for details.' : description}
            </p>
            <p className="card-text"><small className="text-secondary">{!(author && title) ? 'Not Available' : `By ${author} Updated on ${new Date(date).toGMTString()}`}</small></p>
            {/* <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
              Read More
            </a> */}
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
