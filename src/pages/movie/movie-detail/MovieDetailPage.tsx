import { useContext, useEffect, useState } from 'react';
import CardComponent from '../../../shared/components/CardComponent';
import PhotoCard from '../../../shared/components/PhotoCardComponent';
import { MovieDetail } from '../../../shared/interfaces/MovieModel';
import { fetchMovieDetail } from '../../../shared/services/SharedService';
import { useParams, Params } from 'react-router-dom';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Form } from 'react-bootstrap';
import { extractNumbers } from '../../../shared/utils/helper';
import { CartContext } from '../../../shared/states/CartContext';

export default function MovieDetailPage() {
  const [movie, setMovie] = useState<MovieDetail>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { imdbID } = useParams<Params>(); // Retrieve 'id' param from the URL

  const fetchMoviesDetail = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchMovieDetail(imdbID);
      setMovie(result);
      setLoading(false);
      console.log(result);
    } catch (err) {
      setLoading(false);
      setError('Failed to load movie');
    }
  };

  useEffect(() => {
    fetchMoviesDetail(); // Fetch movie On Init
  }, [imdbID]); // Re-fetch when keyword changes

  const { addItemToCart } = useContext(CartContext);

  if (error) return <div>{error}</div>;
  const movieDetail = () => {
    if (loading) return <div>Loading...</div>;
    if (!movie) return <div>No Result</div>;
    return (
      <div className='d-flex gap-3 flex-nowrap justify-content-start align-items-start'>
        <div className="flex-1">
          <PhotoCard
            key={movie?.imdbID}
            title={movie?.Title}
            desc={movie?.Type + '-' + movie?.Year}
            src={movie?.Poster}
          />
        </div>
        <div className='text-left flex-auto'>
          <Button variant="success" onClick={() => (addItemToCart(movie?.imdbID, movie?.Title, extractNumbers(movie?.imdbID)))}><FontAwesomeIcon icon={faCartPlus} />&nbsp;Add To Cart</Button>
          <span className='fw-bold ms-3'>${extractNumbers(movie?.imdbID)}</span>
          <div className='mt-3'>
            <p>{movie?.Plot}</p>
            <br />
            <Form.Label className='fw-bold'>Title:&nbsp;</Form.Label>{movie?.Title}
            <br />
            <Form.Label className='fw-bold'>Year:&nbsp;</Form.Label>{movie?.Year}
            <br />
            <Form.Label className='fw-bold'>Rated:&nbsp;</Form.Label>{movie?.Rated}
            <br />
            <Form.Label className='fw-bold'>Released:&nbsp;</Form.Label>{movie?.Released}
            <br />
            <Form.Label className='fw-bold'>Runtime:&nbsp;</Form.Label>{movie?.Runtime}
            <br />
            <Form.Label className='fw-bold'>Genre:&nbsp;</Form.Label>{movie?.Genre}
            <br />
            <Form.Label className='fw-bold'>Director:&nbsp;</Form.Label>{movie?.Director}
            <br />
            <Form.Label className='fw-bold'>Writer:&nbsp;</Form.Label>{movie?.Writer}
            <br />
            <Form.Label className='fw-bold'>Actors:&nbsp;</Form.Label>{movie?.Actors}
            <br />
            <Form.Label className='fw-bold'>Language:&nbsp;</Form.Label>{movie?.Language}
            <br />
            <Form.Label className='fw-bold'>Country:&nbsp;</Form.Label>{movie?.Country}
            <br />
            <Form.Label className='fw-bold'>Awards:&nbsp;</Form.Label>{movie?.Awards}
            <br />
            <Form.Label className='fw-bold'>Ratings:&nbsp;</Form.Label>{movie?.Ratings?.map((item) => {
              return <ul>
                <li><span>{item.Source}</span>:<span>&nbsp;{item.Value}</span></li>
              </ul>
            })}
            <br />
            <Form.Label className='fw-bold'>Metascore:&nbsp;</Form.Label>{movie?.Metascore}
            <br />
            <Form.Label className='fw-bold'>imdbRating:&nbsp;</Form.Label>{movie?.imdbRating}
            <br />
            <Form.Label className='fw-bold'>imdbVotes:&nbsp;</Form.Label>{movie?.imdbVotes}
            <br />
            <Form.Label className='fw-bold'>imdbID:&nbsp;</Form.Label>{movie?.imdbID}
            <br />
            <Form.Label className='fw-bold'>Type:&nbsp;</Form.Label>{movie?.Type}
            <br />
            <Form.Label className='fw-bold'>DVD:&nbsp;</Form.Label>{movie?.DVD}
            <br />
            <Form.Label className='fw-bold'>BoxOffice:&nbsp;</Form.Label>{movie?.BoxOffice}
            <br />
            <Form.Label className='fw-bold'>Production:&nbsp;</Form.Label>{movie?.Production}
            <br />
            <Form.Label className='fw-bold'>Website:&nbsp;</Form.Label>{movie?.Website}
            <br />
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className='mt-5'>
      </div>
      <div className='mt-5 d-flex justify-content-center'>
        <CardComponent title="Movie Detail" customClass='w-100' >
          {movieDetail()}
        </CardComponent>
      </div>
    </>
  );
}
