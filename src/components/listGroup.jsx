import React from 'react';

const ListGroup = (props) => {
	const {items,textProperty,valueProperty} = props;
	console.log(items);
	return (
		<ul className ="list-group">
			<li key='all' className="list-group-item">All Genres</li>
			{items.map(item => (
                <li key={item[textProperty]} className="list-group-item">{item[textProperty]}</li>
            ))}
		</ul>
	);
}

export default ListGroup;
