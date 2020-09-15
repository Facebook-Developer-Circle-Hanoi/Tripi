import { FETCH_NEWS, NEWS_DETAIL } from './actionTypes';

const newsReducers = (news = [], action) => {
    switch (action.type) {
        case FETCH_NEWS:
            return [
                ...news,
                {
                    data: action.data.articles
                }
            ]
            break;

        case NEWS_DETAIL:
            [
                ...news,
                {
                    title: action.data.title
                }
            ]
            break;
    
        default:
            break;
    }
}

export default newsReducers;