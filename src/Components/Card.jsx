import React from 'react';

const Card = ({ result, category }) => {
    return (
        <div>
            {category === 'user' ? result.login : null}
        </div>
    );
}

export default Card;
