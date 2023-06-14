import React, { useEffect, useState } from 'react';
import '../herobanner/HeroBanner.scss';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { useSelector } from 'react-redux';
import Img from '../lazyloadimage/Img';
import ContentWrapper from '../contentWrapper/ContentWrapper';

const HeroBanner = () => {
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const selector = useSelector(state => state.home.url);

    const { data, loading } = useFetch('/movie/upcoming');
    useEffect(() => {
        setBackground(selector.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path);
    }, [data])
    
    console.log('data', data, 'bg', background)

    const SearchEventHandler = event => {
        event.preventDefault();
        if(query.length > 0) {
            console.log(query)
            navigate(`/search/${query}`)
        }
    };

    return (
        <div className='heroBanner'>
            {!loading && <div className="backdrope-img">
                <Img src={background} />
            </div>}
            <div className="opacity-layer"></div>
            <ContentWrapper>
                <div className='heroBannerContent'>
                    <span className="title">Welcome.</span>
                    <span className="subTitle">Millions of movies, TV shows and people to discover. Explore Now</span>
                    <div className="searchInput">
                        <form onSubmit={SearchEventHandler}>
                            <input type="text" placeholder='Search for a Movie or TV shows...' onChange={(e) => setQuery(e.target.value)} />
                            <button>Search</button>
                        </form>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    )
}

export default HeroBanner