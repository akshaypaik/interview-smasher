import React from 'react';

const TrendingNewsCard = ({ info }) => {
    return (
        <div className='p-4 bg-gray-50 m-4 rounded-xl 
        shadow-xl flex items-center gap-8 hover:translate-y-[-0.5rem] transition-all
        dark:bg-gray-800'>
            <img src={info.image_url} alt='news-thumbnail' className='h-34 w-48 lg:w-90 lg:h-64 md:w-90 md:h-64' />
            <div className='max-w-180'>
                <a href={info.link} target='_blank'>
                    <span className='cursor-pointer hover:text-blue-400 text-2xl font-bold'>
                        {info.title}
                    </span>
                </a>
                <div className='flex items-center gap-2'>
                    <img src={info.source_icon} alt='author' className='h-12' />
                    <span className='text-gray-500'>{info.creator}</span>
                </div>
                <div className='max-h-24 max-w-240 overflow-hidden whitespace-wrap text-ellipsis'>{info.description}</div>
                <div>
                    {info.pubDate}
                </div>
            </div>
        </div>
    )
}

export default TrendingNewsCard