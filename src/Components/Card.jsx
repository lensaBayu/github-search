import React from 'react';
import moment from 'moment';
import '../Styling/Card.css';

const Card = ({ result, category }) => {
    return (
        <div className="card-container">
            {category === 'user' ? (
                <a href={result.html_url}>
                    <div className="card-img-container">
                        <img className="card-img" src={result.avatar_url} alt={result.login} />
                    </div>
                    <div className="card-title-container">
                        <div className="card-title">
                            {result.login}
                        </div>
                    </div>
                </a>
            ) : (
                <div>
                    <div href={result.html_url}>
                        <div className="card-content-container">
                            <div className="card-title-lg">
                                {result.name}
                            </div>
                            <div className="card-subtitle">
                                Created by {result.owner?.login}
                            </div>
                            <div className="card-language">
                                Using {result.language}
                            </div>
                            <div className="card-created-at">
                                On {moment(result.created_at).format('Do MMMM YYYY')}
                            </div>
                        </div>
                        {/* <div className="card-avatar-container">
                            <img className="card-avatar" src={result.owner?.avatar_url} alt="" />
                        </div> */}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Card;
