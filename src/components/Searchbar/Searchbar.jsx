import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import {
  Head,
  SearchForm,
  Btn,
  Label,
  MyStyledInput,
} from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: (values, { resetForm }) => {
      onSubmit(values.name);
      resetForm();
    },
  });

  return (
    <>
      <Head>
        <SearchForm htmlFor="name" onSubmit={formik.handleSubmit}>
          <Btn type="submit">
            <Label>Search</Label>
          </Btn>
          <MyStyledInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </SearchForm>
      </Head>
    </>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
