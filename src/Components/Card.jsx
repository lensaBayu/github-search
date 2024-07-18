import React from 'react';

const Card = ({ result, category }) => {
    return (
        <li>
            {category === 'user' ? result.login : result.full_name}
        </li>
    );
}

export default Card;
