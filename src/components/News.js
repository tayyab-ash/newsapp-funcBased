import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: this.country,
    pageSize: this.pageSize,
    category: 'general',
    // apiKey: this.apiKey
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }


  constructor(props) {
    super(props);
    console.log("hello i am a Constructor.")
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.capitalizeTitle(this.props.category)} - NewsAPP`

  }

  capitalizeTitle = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.country !== this.props.country) {
      this.setState({
        page: 1
      })
      this.componentDidMount();
    }
  }
  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    this.props.setProgress(40);
    let parseData = await data.json();
    this.props.setProgress(70);
    console.log(parseData);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false
    })
    this.props.setProgress(100);
  }
  async componentDidMount() {
    this.updateNews();
  }

  async updateNewsScroll(){
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
      this.setState({ loading: true })
      let data = await fetch(url);
      let parseData = await data.json();
      console.log(parseData);
      this.setState({
        articles: this.state.articles.concat(parseData.articles),
        totalResults: parseData.totalResults,
        loading: false
      })
  }


  fetchMoreData = async () => {
    if (this.state.page < Math.ceil(this.state.totalResults / this.props.pageSize)) {
      this.setState(
        (prevState) => ({
          page: prevState.page + 1,
        }),
        () => {
          this.updateNewsScroll();
        }
      );
    }
  }


  // handlePrevClick = async () => {
  //   if (this.state.page > 1) {
  // this.setState(
  //   (prevState) => ({
  //     page: prevState.page - 1,
  //   }),
  //       () => {
  //         this.updateNews();
  //       }
  //     );
  //   }
  // }

  // handleNextClick = async () => {
  //   if (this.state.page < (Math.ceil(this.state.totalResults / this.props.pageSize))) {
  //     this.setState(
  //       (prevState) => ({
  //         page: prevState.page + 1,
  //       }),
  //       () => {
  //         this.updateNews();
  //       }
  //     );
  //   }
  // }


  


  render() {
    return (
      <div className='container my-3'>
        <h1 className={`text-center heading text-${this.props.modeType.cardTitle}`}>Top Headlines - {this.capitalizeTitle(this.props.category)}</h1>
        <hr className={`text-${this.props.modeType.cardTitle}`} />
        {this.state.loading && <Spinner />}
        {/* {!this.state.loading && <div className='d-flex justify-content-between margin'>
          <button disabled={this.state.page <= 1} className='btn btn-dark ' onClick={this.handlePrevClick}>&#8592; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className='btn btn-dark' onClick={this.handleNextClick}>Next &#8594;</button>
        </div>} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={ this.state.articles.length !== this.state.totalResults }
          // loader={<Spinner/>}
          loader={this.state.loading && <Spinner />}
        >
          <div className='d-flex justify-content-start flex-wrap'>
            {this.state.articles.map((element) => {
              return <NewsItem key={element.url==='https://removed.com'? Math.random():element.url} title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={!element.author ? 'Unknown' : element.author} date={element.publishedAt} source={element.source.name} modeType={this.props.modeType} />
            })}
          </div>
        </InfiniteScroll>
        {/* {!this.state.loading && <div className='d-flex justify-content-between margin'>
          <button disabled={this.state.page <= 1} className='btn btn-dark' onClick={this.handlePrevClick}>&#8592; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className='btn btn-dark' onClick={this.handleNextClick}>Next &#8594;</button>
        </div>} */}
      </div>
    )
  }
}

export default News