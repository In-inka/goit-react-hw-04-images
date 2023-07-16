import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button';

import Notiflix from 'notiflix';

import { Apps } from './App.styled';
import { useState, useEffect } from 'react';
import * as api from '../service/api.js';

export const App = () => {
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalHits, setTotalHitls] = useState(0);

  const onClickLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const onSearchNamePicture = name => {
    setName(name);
    setPage(1);
    setPictures([]);
    setTotalHitls(0);
    setError('');
  };

  useEffect(() => {
    const namePicture = name.trim();

    if (!namePicture) {
      return Notiflix.Notify.info('Enter a name to search for!');
    }

    setIsLoading(true);

    api
      .getPicture(namePicture, page)
      .then(({ totalHits, hits }) => {
        if (!totalHits) {
          return Notiflix.Notify.failure(
            'Oops... :( nothing was found for your query, please try again!'
          );
        }

        setPictures(prev => [...prev, ...hits]);
        setTotalHitls(totalHits);
      })
      .catch(err => {
        setError(err.response.data);
        Notiflix.Notify.failure(`Something went wrong ${error}`);
      })
      .finally(() => {
        setIsLoading(false);
        if (page === 1) {
          return Notiflix.Notify.success(
            `Hooray! We found ${totalHits} images.`
          );
        }
      });
  }, [name, page, error, totalHits]);

  const pageNull = Math.ceil(totalHits / api.PER_PAGE);
  return (
    <Apps>
      <Searchbar onSubmit={onSearchNamePicture} />
      <ImageGallery pictures={pictures} />
      {isLoading && <Loader />}
      {page < pageNull && <Button onClickLoadMore={onClickLoadMore} />}
    </Apps>
  );
};
