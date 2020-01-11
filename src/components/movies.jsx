import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';

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
    render() {
        const {length :count } = this.state.movies;
        if(count === 0)
        return <h2>There is no movie in the database!</h2>;
        
        return (
            <div className=''>
                {this.renderMovies()}
                <table className='table table-bordered table-condensed'>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Stock</th>
                            <th>Rate</th>
                            <th>Action</th>
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
                                    <button className='btn btn-danger btn-sm' onClick={() => this.handleDelete(movie)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Movies;