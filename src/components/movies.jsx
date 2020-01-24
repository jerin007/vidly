import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Like from './like';
import ListGroup from './listGroup';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';

class Movies extends Component {
    state = {
        movies: [],
        genres : [],
        pageSize : 4,
        currentPage : 1

    }
    componentDidMount(){
        this.setState({genres: getGenres(),movies:getMovies()})
    }
    renderMovies() {
        if (this.state.movies.length === 0) return <h2>There is no movie in the database!</h2>;
        return <h2>Showing {this.state.movies.length} movies in the database</h2>
    }
    handleDelete = movie => {
        let updatedMovie = this.state.movies.filter(item => item._id !== movie._id);
        this.setState({ movies: updatedMovie });
    }
    handleLike = movie =>{
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movies[index]};
        movies[index].liked = !movies[index].liked;
        this.setState({movies}); 
    }
    handlePageChange = page => {
        this.setState({ currentPage : page });
    }
    handleGenresSelect = genre => {

    }
    render() {
        const {length :count } = this.state.movies;
        const {pageSize, currentPage,movies: allMovies,genres} = this.state;
        const movies = paginate(allMovies,currentPage,pageSize);

        if(count === 0)
        return <h2>There is no movie in the database!</h2>;
        
        return (
            <div className='row'>
                <div className='col-3'>
                    <ListGroup 
                        items={genres} 
                        textProperty="name"
                        valueProperty="_id"
                        onItemSelect={() =>this.handleGenresSelect}
                    />
                </div>
                <div className='col'>
                    {this.renderMovies()}
                    <table className='table table-condensed'>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Genre</th>
                                <th>Stock</th>
                                <th>Rate</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {movies.map(movie => (
                                <tr key={movie._id}>
                                    <td>{movie.title}</td>
                                    <td>{movie.genre.name}</td>
                                    <td>{movie.numberInStock}</td>
                                    <td>{movie.dailyRentalRate}</td>
                                    <td>
                                        <Like liked={movie.liked} onClick={() => this.handleLike(movie)}/>
                                    </td>
                                    <td>
                                        <button className='btn btn-danger btn-sm' onClick={() => this.handleDelete(movie)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination 
                        itemsCount = {count}
                        pageSize = {pageSize}
                        currentPage = {currentPage}
                        onPageChange = {this.handlePageChange}
                    />
                </div>
            </div>
        )
    }
}

export default Movies;