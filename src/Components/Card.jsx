import React from 'react';
import moment from 'moment';


const Card = ({ result, category }) => {
    return (
        <div className='card'>
            {category === 'user' ?
                <div>
                    {result.login}
                </div>
                :
                <div>
                    <div>
                        {result.name}
                    </div>
                    <div>
                        {result.owner?.login}
                    </div>
                    <div>
                        {result.language}
                    </div>
                    <div>
                        {moment(result.pushed_at).format('Do MMMM YYYY')}
                    </div>
                    <div>
                        {result.private == false ? "Public" : "Private"}
                    </div>
                </div>
            }

        </div>
    );
}

export default Card;
