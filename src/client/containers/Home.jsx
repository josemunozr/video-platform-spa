import React from 'react';
import { connect } from 'react-redux';
import Search from '../components/Search';
import Categories from '../components/Categories';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';
import '../assets/styles/App.scss';
import Header from '../components/Header';

const Home = ({ myList, trends, originals, searchResult }) => {
  return (
    <>
      <Header />
      <Search />
      {searchResult.length !== 0 && (
        <Categories title='Resultado búsqueda'>
          <Carousel>
            {searchResult.map((item) => (
              <CarouselItem key={item.id} {...item} />
            ))}
          </Carousel>
        </Categories>
      )}
      {myList.length !== 0 && (
        <Categories title='Mi Lista'>
          <Carousel>
            {myList.map((item) => (
              <CarouselItem key={item.id} {...item} isMyList />
            ))}
          </Carousel>
        </Categories>
      )}
      {trends.length !== 0 && (
        <Categories title='Tendencias'>
          <Carousel>
            {trends.map((item) => (
              <CarouselItem key={item.id} {...item} />
            ))}
          </Carousel>
        </Categories>
      )}
      {originals.length !== 0 && (
        <Categories title='Otros'>
          <Carousel>
            {originals.map((item) => (
              <CarouselItem key={item.id} {...item} />
            ))}
          </Carousel>
        </Categories>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  myList: state.myList,
  trends: state.trends,
  originals: state.originals,
  searchResult: state.searchResult
});
export default connect(mapStateToProps, null)(Home);
