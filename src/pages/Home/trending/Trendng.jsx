import React, { useState } from 'react';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../components/carousel/Carousel';

const Trendng = () => {
    const [endPoint, setEndPoint] = useState("day");

    const {data, loading} = useFetch(`/trending/all/${endPoint}`);

    const onTabChange = (data) => {
        setEndPoint(data === "Day" ? "day" : "week");
        console.log('endPoint', endPoint)
    };

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <h2 className='carouselTitle'>Trending</h2>
                <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} />
        </div>
    )
}

export default Trendng