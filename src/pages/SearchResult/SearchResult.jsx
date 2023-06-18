import React, { useEffect, useState } from 'react';
import './style.scss';
import { useParams } from 'react-router-dom';
import {FetchDataFromApi} from '../../../src/utlis/api';
import Spinner from '../../components/spinner/spinner';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import MovieCard from '../../components/movieCard/MovieCard';
import InfiniteScroll from 'react-infinite-scroll-component';

const SearchResult = () => {
  const query = useParams();
  // console.log(query.query);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  console.log('pageNumber', pageNumber)

  useEffect(() => {
    setPageNumber(1);
    FetchDataFromApi(`/search/multi?query=${query.query}&page=${pageNumber}`).then((res) => {
      setLoading(true);
      setData(res);
      setPageNumber((prev) => prev + 1);
      setLoading(false);
    })
  }, [query]);

  const fetchNextPageData = () => {
    FetchDataFromApi(`/search/multi?query=${query.query}&page=${pageNumber}`).then((res) => {
      if(data?.results) {
        setData({
          ...data, results: [...data?.results, ...res?.results]
        })
      } else {
        setData(res);
      }
      setPageNumber((prev) => prev + 1);
    })
  }

  return (
    <div className='searchResultsPage'>
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {
            data?.results.length > 1 ? (
              <>
                <div className="pageTitle">
                  {`Search of ${data?.total_results > 1 ? "results" : "result"} "${query.query}"`}
                </div>
                <InfiniteScroll 
                  className='content'
                  dataLength={data?.results.length || []}
                  loader={<Spinner />}
                  next={fetchNextPageData}
                  hasMore={pageNumber <= data?.total_pages}
                >
                  {data?.results.map((item, index) => {
                    if(item.media_type === "person") return;
                    return (
                      <MovieCard key={index} data={item} fromSearch={true} />
                    )
                  })}
                </InfiniteScroll>
              </>
            ) : (
              <span className="resultNotFound">Sorry, Results not found!</span>
            )
          }
        </ContentWrapper>)}
    </div>
  )
}

export default SearchResult