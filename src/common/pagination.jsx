import React from 'react';
import _ from 'lodash';

const Pagination = props => {
    const {itemCount, pageSize, onPageChange, currentPage} = props
    const pageCount = itemCount / pageSize;
    const pages = Math.ceil(pageCount)
    if (pages <= 1) return <p>{''}</p>;
    const pageRange = _.range(1, pageCount + 1);
    return ( <nav>
        <ul className="pagination">
            {pageRange.map(page => (
            <li onClick={() => onPageChange(page)} key={page} className={page === currentPage ? 'page-item active': 'page-item'}>
                <a  className="page-link">{page}</a></li>))}
           
        </ul>
    </nav> );
}
 
export default Pagination;