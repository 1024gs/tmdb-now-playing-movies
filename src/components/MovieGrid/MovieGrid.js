import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  card: {
    maxWidth: 'auto',
    height: 300,
  },
  media: {
    height: 140,
  },
}));

const MovieGrid = ({movies, getImageUrl, getGenreName}) => {
  const classes = useStyles();

  return (
    <div className={'MovieGrid ' + classes.root}>
      <Grid container spacing={3}>
        {movies.map((x) => (
          <Grid key={x.id} item xs={12} sm={6} md={4} lg={3}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image={getImageUrl(x.poster_path)}
                title={x.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {x.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {x.genre_ids.map(getGenreName).join(', ')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

MovieGrid.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
  getImageUrl: PropTypes.func,
  getGenreName: PropTypes.func,
};

export default MovieGrid;
