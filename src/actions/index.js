import { FETCH_NEWS, NEWS_DETAIL } from './actionTypes';

export const fetchNews = () => {
    return {
        type: FETCH_NEWS
    }
}

export const newsDetail = (newsId) => {
    return {
        type: NEWS_DETAIL,
        newsId: newsId
    }
}