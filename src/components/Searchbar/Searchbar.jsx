import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Form } from 'components';

export const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleQueryChange = e => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      toast.warn('Please, enter your search term into the search field!');
      return;
    }

    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <input
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search movies"
        value={searchQuery}
        onChange={handleQueryChange}
      />
      <button type="submit">Search</button>
    </Form>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
