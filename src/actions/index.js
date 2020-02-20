import _ from 'lodash';
import jsonPlaceholder from "../apis/jsonPlaceholder";

// I action creators kan getState användas för att få tillgång till store:en
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
        // När du kallar på en action creator från en annan action creator så krävs dispatch för den inre action creatorn.
        await dispatch(fetchPosts());

        /*const userIds = _.uniq(_.map(getState().posts, 'userId'));
        userIds.forEach(id => dispatch(fetchUser(id)));*/

        // Refaktorisering av koden ovanför med lodash chain, value krävs för att exekvera chain
        _.chain(getState().posts)
            .map('userId')
            .uniq()
            .forEach(id => dispatch(fetchUser(id)))
            .value();
};

export const fetchPosts = () => async dispatch => {
        const response = await jsonPlaceholder.get('/posts');
        // Här dispatchar vi actionen manuellt efter att redux thunk använts för det asynchrona anropet
        // Så vi börjar med att returnera en funtion istället för action objekt vilket gör att vi kan invänta
        // det asynchrona anropet genom thunk.
        dispatch({ type: 'FETCH_POSTS', payload: response.data })
};

export const fetchUser = (id) => async dispatch => {
        const response = await jsonPlaceholder.get(`/users/${id}`);
        dispatch({ type: 'FETCH_USER', payload: response.data });
};

/*export const fetchUser = (id) => dispatch => _fetchUser(id, dispatch);
const _fetchUser = _.memoize(async (id, dispatch) => {
        const response = await jsonPlaceholder.get(`/users/${id}`);
        dispatch({ type: 'FETCH_USER', payload: response.data });
});*/