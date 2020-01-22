import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './like';
import Pagination from './common/pagination';

class Movies extends Component {
    state = {
        movies: getMovies()
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
    handlePageChange = () => {
    
    }
    render() {
        const {length :count } = this.state.movies;
        if(count === 0)
        return <h2>There is no movie in the database!</h2>;
        
        return (
            <div className=''>
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
                        {this.state.movies.map(movie => (
                            <tr>
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
                    pageSize = {4}
                    onPageChange = {this.handlePageChange}
                />
            </div>
        )
    }
}

export default Movies;