import { useEffect } from 'react'
import './App.scss'
import { FetchDataFromApi } from './utlis/api';
import { useDispatch, useSelector } from 'react-redux';
import { getApiConfig, getGenres } from './store/homeSlice';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from '../src/pages/Home/Home';
import DetailsPage from './pages/Details/Details';
import ExplorePage from './pages/Explore/Explore';
import SearchResult from './pages/SearchResult/SearchResult';
import PageNotFound from './pages/404/404';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

const App = () => {
  const dispatch = useDispatch();
  const {url} = useSelector(state => state.home);
  // console.log('url', url)

  useEffect(() => {
    FetchDataFromApi('/configuration').then(res => {
      // console.log(res);
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      }

      dispatch(getApiConfig(url))
    });
    genersCall();
  }, []);

  const genersCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGeneres = {};

    endPoints.map(url => {
      promises.push(FetchDataFromApi(`/genre/${url}/list`));
    })

    const data = await Promise.all(promises);
    // console.log('data111', data)

    data.map(({genres}) => {
      return genres.map(item => allGeneres[item.id] = item);
    })

    // console.log('allGeneres', allGeneres)
    dispatch(getGenres(allGeneres))
  }

  return (<BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:mediaType/:id" element={<DetailsPage />} />
      <Route path="/explore/:mediaType" element={<ExplorePage />} />
      <Route path="/search/:query" element={<SearchResult />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
    <Footer />
  </BrowserRouter>)
}

export default App
