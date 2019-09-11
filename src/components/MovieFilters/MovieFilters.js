import React from 'react';
import _ from '../../utils/_';
import Slider from '@material-ui/core/Slider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';

const MovieFilters = ({rating, genres, selectedGenres, onRatingChange, onGenreChange}) => {
  const handleRatingChange = (e, value) => {
    if (rating !== value) {
      onRatingChange(value);
    }
  };

  const handleGenreChange = (i) => (e) => {
    const id = genres[i].id;
    const update = e.target.checked ? _.append(id) : _.remove(id);
    onGenreChange(update(selectedGenres));
  };

  return (
    <div className="MovieFilters">
      <div className="MovieFilters-section">
        <h3>Filter by rating</h3>
        <Slider
          defaultValue={rating}
          valueLabelDisplay="auto"
          step={0.5}
          marks
          min={0}
          max={10}
          onChange={handleRatingChange}
        />
      </div>
      <div className="MovieFilters-section">
        <h3>Filter by genre</h3>
        {genres.map((x, i) => (
          <FormControlLabel
            key={x.id}
            control={
              <Checkbox
                checked={selectedGenres.includes(x.id)}
                onChange={handleGenreChange(i)}
                color="primary"
              />
            }
            label={x.name}
          />
        ))}
      </div>
    </div>
  );
};

MovieFilters.propTypes = {
  rating: PropTypes.number,
  genres: PropTypes.arrayOf(PropTypes.object),
  selectedGenres: PropTypes.arrayOf(PropTypes.number),
  onRatingChange: PropTypes.func,
  onGenreChange: PropTypes.func,
};

export default MovieFilters;
