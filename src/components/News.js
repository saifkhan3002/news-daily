import React, { useEffect,useState } from 'react'
import NewsType from './NewsType'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News=(props)=>  {
     
        const [articles, setArticles] = useState([])
        const [loading, setLoading] = useState(true)
        const [page, setPage] = useState(1)
        const [totalResults, setTotalResults] = useState(0)
    

     const updateNews= async() => {
        props.setProgress(10);
        let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a18744990a8c45c3b9766e4421e06051&page=${page}&pageSize=${props.pageSize}`;
        
        let data=await fetch(url);
        let parsedData=await data.json()
        // console.log(parsedData);
        setArticles(parsedData.articles)
        setLoading(true)
        setTotalResults(parsedData.totalResults)
      
    props.setProgress(100);
}
       const fetchMoreData=async()=>{
                

                const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a18744990a8c45c3b9766e4421e06051&page=${page+1}&pageSize=${props.pageSize}`;
                setPage(page+1)
                setLoading(true)
                let data=await fetch(url);
                let parsedData=await data.json()
                console.log(parsedData);
                setArticles(articles.concat(parsedData.articles))
                setTotalResults(parsedData.totalResults)
                setLoading(true)
              
        }
        useEffect(() => {
            updateNews();
            
        }, [])
    
        return (
            <>
            
                <h3 className="text-center">News Daily-{props.category} Category</h3>
                <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!== totalResults}
          loader={<Spinner/>}
        >

                
                <div className="row">
                {articles.map((element)=>{
                    return <div className="col-md-4" key={element.url}>
                    <NewsType title={element.title?element.title.slice(0,55):" "} 
                    desc={element.description?element.description.slice(0,65):""} 
                    imageUrl ={element.urlToImage}
                    nUrl={element.url}
                     author={element.author}
                     date={element.publishedAt}
                     source={element.source.name}
                     />
                     </div>
                })}
                </div>
                

                </InfiniteScroll>
                    
            </>


            
        )
    }


News.defaultProps={
    country:'in',
    pageSize: 8,
    category:'general'
}

News.propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
}
export default News