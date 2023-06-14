import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs, { Dayjs } from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";

import "./Carousel.scss";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";

const Carousel = ({data, loading, endPoint, title}) => {
    const carouselContainer = useRef();
    const navigate  = useNavigate();
    const {url} = useSelector(state => state.home);

    const navigation = dir => {
        const container = carouselContainer.current;

        const scrollAmount = (dir === "left") ? container.scrollLeft - (container.offsetWidth + 20) : container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth"
        })
    }

    const skItem = (i) => {
        return (
            <div className="skeletonItem" key={i}>
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <span className="title skeleton"></span>
                    <span className="date skeleton"></span>
                </div>
            </div>
        )
    }

    return (
        <div className="carousel">
            <ContentWrapper>
                {title && <div className="carouselTitle">{title}</div>}

                <BsFillArrowLeftCircleFill className="carouselLeftNav arrow" onClick={() => navigation("left")} />
                <BsFillArrowRightCircleFill className="carouselRighttNav arrow" onClick={() => navigation("right")} />

                {!loading ? (
                    <div className="carouselItems" ref={carouselContainer}>
                        {
                            data?.map((item) => {
                                const imagePath = item?.poster_path ? url.poster + item?.poster_path : PosterFallback;
                                return (
                                    <div key={item.id} onClick={() => navigate(`/${item.media_type || endPoint}/${item.id}`)} className="carouselItem">
                                        <div className="posterBlock">
                                            <Img src={imagePath} />
                                            <CircleRating rating={item.vote_average.toFixed(1)} />
                                            <Genres data={item.genre_ids.slice(0,2)} />
                                        </div>
                                        <div className="textBlock">
                                            <span className="title" title={item.name || item.title}>{item.name || item.title}</span>
                                            <span className="date">{dayjs(item.release_date).format("MMM DD, YYYY")}</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                ) : 
                (
                    <div className="loadingSkeleton">
                        {[...Array(5).keys()].map(i => skItem(i))}
                    </div>
                )}
            </ContentWrapper>
        </div>
    )
}

export default Carousel