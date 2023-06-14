import React, { useState } from 'react';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../components/carousel/Carousel';

const TopRated = () => {
    const [endPoint, setEndPoint] = useState("movie");

    const {data, loading} = useFetch(`/${endPoint}/top_rated`);

    const onTabChange = (data) => {
        setEndPoint(data === "Movies" ? "movie" : "tv");
        // console.log('endPoint', endPoint)
    };

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <h2 className='carouselTitle'>Top Rated</h2>
                <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel endPoint={endPoint} data={data?.results} loading={loading} />
        </div>
    )
}

export default TopRated