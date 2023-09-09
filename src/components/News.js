import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

function News (props) {

  const [articles, setarticles] = useState([])
  const [loading, setloading] = useState(false)
  const [page, setpage] = useState(1)
  const [totalResults, settotalResults] = useState(0)
  // document.title = `${capitalizeTitle(props.category)} - NewsAPP`

  const capitalizeTitle = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const  updateNews = async()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page}`;
    setloading(true);
    let data = await fetch(url);
    props.setProgress(40);
    let parseData = await data.json();
    props.setProgress(70);
    setarticles(parseData.articles)
    settotalResults(parseData.totalResults)
    setloading(false)
    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `${capitalizeTitle(props.category)} - NewsAPP`
    updateNews(); // eslint-disable-next-line
  },[])

  const updateNewsScroll=async()=>{
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page}`;
      setloading(true)
      let data = await fetch(url);
      let parseData = await data.json();
      console.log(parseData);
      setarticles(articles.concat(parseData.articles))
      settotalResults(parseData.totalResults)
      setloading(false)
      // setpage(page+1)
  }

  const fetchMoreData = async () => {
    if (page < Math.ceil(totalResults / props.pageSize)) {
      setpage(page+1)
      updateNewsScroll();
    }
  }

    return (
      <div className='container my-3'>
        <h1 className="text-center heading">Top Headlines - {capitalizeTitle(props.category)}</h1>
        <hr />
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults }
          loader={loading && <Spinner />}
        >
          <div className='d-flex justify-content-start flex-wrap'>
            {articles.map((element) => {
              return <NewsItem key={element.url==='https://removed.com'? Math.random():element.url} title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={!element.author ? 'Unknown' : element.author} date={element.publishedAt} source={element.source.name} />
            })}
          </div>
        </InfiniteScroll>
      </div>
    )
}


News.defaultProps = {
  country: 'in',
  pageSize: 80,
  category: 'general',
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News