import React from 'react';

const MovieCard = ({item}) => {
    const {id, name, poster, genre, trailer, duration, release_date} = item;
    return (
        <div className='w-[240px] h-[350px]'>
            <img src=`${poster}` alt="" className="" />
        </div>
    );
};

export default MovieCard;