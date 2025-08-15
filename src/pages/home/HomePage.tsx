import { useContext, useEffect, useState } from 'react';
import CardComponent from '../../shared/components/CardComponent';
import PhotoCard from '../../shared/components/PhotoCardComponent';
import { ImagePath } from '../../shared/constants/AssetsPath';
import { Movie } from '../../shared/interfaces/MovieModel';
import { fetchMovies } from '../../shared/services/SharedService';
import { DEFAULT_SEARCH_KEYWORD } from '../../shared/constants/OtherConstans';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { extractNumbers } from '../../shared/utils/helper';
import { CartContext } from '../../shared/states/CartContext';

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [keyword, _setKeyword] = useState<string>(DEFAULT_SEARCH_KEYWORD);
  const navigate = useNavigate();

  const fetchMoviesData = async (keyword: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchMovies(keyword);
      setMovies(result.Search || []);
      setLoading(false);
      console.log(result);
    } catch (err) {
      setLoading(false);
      setError('Failed to load movies');
    }
  };

  useEffect(() => {
    fetchMoviesData(keyword); // Fetch movies On Init
  }, [keyword]); // Re-fetch when keyword changes

  const handleMovieBtnClick = (imdbID: string) => {
    console.log('handleMovieBtnClick', imdbID);
    navigate(`/movie/${imdbID}`);
  };

  const {addItemToCart} = useContext(CartContext);

  if (error) return <div>{error}</div>;

  const movieList = () => {
    if (loading) return <div>Loading...</div>;
    if (!movies || movies.length < 1) return <div>No Result</div>;
    return movies.map((item) => (
      <PhotoCard
        key={item.imdbID}
        title={item.Title}
        desc={`${(item.Type+'').toUpperCase()} - ${item.Year} - $${extractNumbers(item.imdbID)}`}
        src={item.Poster}
      >
        <div className='d-flex gap-2'>
          <Button variant="primary" onClick={() => (handleMovieBtnClick(item.imdbID))}><FontAwesomeIcon icon={faEye} />&nbsp;See Detail</Button>
          <Button variant="success" onClick={() => (addItemToCart(item.imdbID,item.Title,extractNumbers(item.imdbID)))}><FontAwesomeIcon icon={faCartPlus} />&nbsp;Add To Cart</Button>
        </div>
      </PhotoCard>
    ))
  }

  return (
    <>
      <div className='jumbotron'>
        <img src={ImagePath.JUMBOTRON} alt='Jumbotron' />
      </div>
      <div className='mt-5 d-flex justify-content-center'>
        <CardComponent title='Top Box Office' customClass='w-70rem text-center' >
          <div className='d-flex gap-3 flex-wrap justify-content-between align-items-start'>
            {movieList()}
          </div>
        </CardComponent>
      </div>
    </>
  );
}
