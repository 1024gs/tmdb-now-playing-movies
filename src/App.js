import React, {Component} from 'react';
import _ from './utils/_';
import Loading from './components/Loading/Loading';
import MovieFilters from './components/MovieFilters/MovieFilters';
import MovieGrid from './components/MovieGrid/MovieGrid';
import {get as tmdbGet} from './services/tmdb-service';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 3,
      selectedGenres: [],
      isLoading: true,
    };

    this.imgSize = 4; // It is a index within TMDb configuration.images.poster_sizes
  }

  getImageUrl(poster_path) {
    return this.config.secure_base_url + this.config.poster_sizes[this.imgSize] + poster_path;
  }

  getGenreName(id) {
    return this.genres.find((x) => x.id === id).name;
  }

  handleChangeRating(rating) {
    this.setState({rating: rating});
  }

  handleChangeGenre(genres) {
    this.setState({selectedGenres: genres});
  }

  /*
   * All the functions from _ are basically Ramda functions
   * https://ramdajs.com/docs/

   * _.pipe(_.prop('vote_average'), _.gte(rating)) == (x) => x.vote_average >= rating
   */
  getMovies() {
    const filtred = this.movies
      .filter(_.pipe(_.prop('vote_average'), _.gte(this.state.rating)))
      .filter(_.pipe(_.prop('genre_ids'), _.includesAll(this.state.selectedGenres)));

    return _.sortBy(_.descend(_.prop('popularity')), filtred);
  }

  componentDidMount() {
    Promise.all([
      tmdbGet('/configuration'),
      tmdbGet('/genre/movie/list'),
      tmdbGet('/movie/now_playing'),
    ])
      .then(([config, genres, movies]) => {
        this.config = config.images;
        this.genres = genres.genres;
        this.movies = movies.results;
        this.setState({isLoading: false});
      })
      .catch((err) => {
        console.log(err);
        alert('There was an error. Check console log.');
      });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>TMDb now-playing movies</h1>
        </div>

        <div className="App-aside">
          {this.state.isLoading 
            ? <Loading isLoading={true} />
            : <MovieFilters 
                rating={this.state.rating}
                genres={this.genres}
                selectedGenres={this.state.selectedGenres}
                onRatingChange={this.handleChangeRating.bind(this)}
                onGenreChange={this.handleChangeGenre.bind(this)}
          />}
        </div>

        <div className="App-main">
          {this.state.isLoading
            ? <Loading isLoading={true} />
            : <MovieGrid
                movies={this.getMovies()}
                getImageUrl={this.getImageUrl.bind(this)}
                getGenreName={this.getGenreName.bind(this)}
          />}
        </div>
      </div>
    );
  }
}

export default App;
