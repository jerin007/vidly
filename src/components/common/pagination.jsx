import React from 'react';
import _ from 'lodash';

const Pagination = (props) =>{
    const { itemsCount, pageSize, currentPage} = props;
    const pageCount = Math.ceil(itemsCount/pageSize);

    if(pageCount === 1) return null;
    const pages = _.range(1, pageCount+1);
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className="page-item"><a className="page-link">Previous</a></li>
                {pages.map(page =>(
                    <li key={page} className={ page === currentPage ? 'page-item active': 'page-item'}>
                        <a className="page-link" onClick={() => props.onPageChange(page)}>{page}</a>
                    </li>
                ))}
                <li className="page-item"><a className="page-link">Next</a></li>
            </ul>
        </nav>
    );
}
export default Pagination;