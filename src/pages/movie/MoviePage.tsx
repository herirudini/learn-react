import style from './MoviePage.module.scss'
import { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react';
import CardComponent from '../../shared/components/CardComponent';
import PhotoCard from '../../shared/components/PhotoCardComponent';
import { Movie } from '../../shared/interfaces/MovieModel';
import { useMovies } from '../../shared/services/SharedService';
import { Button, Form } from 'react-bootstrap';
import { YEARS } from '../../shared/constants/OtherConstans'
import { useNavigate } from 'react-router-dom';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CartContext } from '../../shared/states/CartContext';
import { extractNumbers } from '../../shared/utils/helper';
const yearList = [{ label: 'All', value: '' }, ...YEARS]
import { debounce } from 'lodash';
import { useForm } from 'react-hook-form';

type MoviesPageForm = {
  keyword: string
  year: string
}

function MoviePage() {
  const [movieParams, setMovieParams] = useState({
    year: '',
    keyword: 'All'
  })
  
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<MoviesPageForm>({ mode: 'all' })

  console.log("keyword", watch("keyword"))
  console.log("year", watch("year"))

  const navigate = useNavigate();

  const moviesQuery = useMovies(movieParams.keyword, movieParams.year);
  const { data, isLoading, isError, error } = moviesQuery;

  const handleKeywordChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleSearch(event.target.value);
  };

  const handleSearch = useCallback( // useCallback is Persistence, we need this because the debounce will always be re-created everytime handleSearch re-triggered
    debounce((keyword: string) => {
      setMovieParams((prevVal) => ({
        ...prevVal,
        keyword,
      }));
    }, 500),
    []
  );
  
  useEffect(() => {
    return () => {
      handleSearch.cancel(); // Cancel the debounce on unmount
    };
  }, [handleSearch]);

  const handleMovieBtnClick = (imdbID: string) => {
    console.log('handleMovieBtnClick', imdbID);
    navigate(`/movie/${imdbID}`);
  };

  function handleYearChange(event: ChangeEvent<HTMLSelectElement>) {
    const year = event.target.value;
    setMovieParams((prevVal) => {
      return {
        ...prevVal,
        year: year
      }
    });
  }

  const { addItemToCart } = useContext(CartContext);

  if (isError) return <div>{error?.message}</div>;

  const movieList = () => {
    if (isLoading) return <div>Loading...</div>;
    if (!data?.data?.Search || data.data.Search.length < 1) return <div>No Results Found</div>;

    return data.data.Search.map((item: Movie) => (
      <PhotoCard
        key={item.imdbID}
        title={item.Title}
        desc={`${(item.Type + '').toUpperCase()} - ${item.Year} - $${extractNumbers(item.imdbID)}`}
        src={item.Poster}
      >
        <div className='d-flex gap-2'>
          <Button variant="primary" onClick={() => (handleMovieBtnClick(item.imdbID))}><FontAwesomeIcon icon={faEye} />&nbsp;See Detail</Button>
          <Button variant="success" onClick={() => (addItemToCart(item.imdbID, item.Title, extractNumbers(item.imdbID)))}><FontAwesomeIcon icon={faCartPlus} />&nbsp;Add To Cart</Button>
        </div>
      </PhotoCard>
    ))
  }

  return (
    <>
      <div className={style.jumbotron}>
      </div>
      <div className='mt-5 d-flex justify-content-center'>
        <CardComponent title='Movie List' customClass='w-100 text-center' >
          <div className='mb-3'>
            <Form className="d-flex gap-3 align-items-start w-100">
              <div className='d-flex gap-3 align-items-start w-100'>
                <Form.Label>
                  Keyword:
                </Form.Label>
                <div className='w-100'>
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    defaultValue="All" {...register("keyword", { required: { value: true, message: "This field is required" }, onChange: handleKeywordChange })}
                    className={`me-2 ${errors.keyword ? 'is-invalid' : ''}`}
                  />
                  <p className='invalid-feedback d-block w-max-content'>{errors.keyword?.message}</p>
                </div>
              </div>
              <div className='d-flex gap-3 align-items-start w-100'>
                <Form.Label>
                  Year:
                </Form.Label>
                <Form.Select aria-label="Default select example" defaultValue="" {...register("year", { onChange: handleYearChange })}>
                  {yearList.map((year) => (
                    <option key={year.label} value={year.value + ''}>{year.label}</option>
                  ))}
                </Form.Select>
              </div>
            </Form>
          </div>
          <div className='d-flex gap-3 flex-wrap justify-content-between align-items-start'>
            {movieList()}
          </div>
        </CardComponent>
      </div>
    </>
  );
}

export default MoviePage;