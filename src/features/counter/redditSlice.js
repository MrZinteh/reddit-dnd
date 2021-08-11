import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    link: "",
    result: {},
    resultNo: 0,
    searchTerm: "",
    searchIsLoading: false,
    searchHasFailed: false,
    isLoading: true,
    hasFailed: false,
    amountOfLinks: 0
  };

export const fetchResults = createAsyncThunk(
    'reddit/fetchResults',
    async (searchTerm) => {
        const tempSearch = 'dnd%20character%20ideas';
        const response = await fetch(`https://www.reddit.com/search.json?q=${tempSearch}`);
        const jsonResult = await response.json();
        // The value we return becomes the `fulfilled` action payload
        return jsonResult;
    }
);

export const getRedditByLink = createAsyncThunk(
    'reddit/getRedditByLink',
    async (link) => {
        const response = await fetch(`https://${link}`);
        const jsonResponse = await response.json();
        // The value we return becomes the `fulfilled` action payload
        return jsonResponse;
    }
);

export const redditSlice = createSlice({
    name: 'reddit',
    initialState,
    reducers: {
        updateResultNo: (state, action) => {
            state.resultNo = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchResults.pending, (state, action) => {
                state.searchIsLoading = true;
                state.searchHasFailed = false;
            })
            .addCase(fetchResults.rejected, (state, action) => {
                state.searchIsLoading = false;
                state.searchHasFailed = true;
            })
            .addCase(fetchResults.fulfilled, (state, action) => {
                state.searchIsLoading = false;
                state.searchHasFailed = false;
                const child = action.payload.data.children[state.resultNo]
                // Get reddit link and replace final slash with .json for processing
                const redditLink = child.data.permalink.slice(0, -1);
                state.link = `www.reddit.com${redditLink}.json`;
            })
            .addCase(getRedditByLink.pending, (state, action) => {
                state.isLoading = true;
                state.hasFailed = false;
            })
            .addCase(getRedditByLink.rejected, (state, action) => {
                state.isLoading = false;
                state.hasFailed = true;
            })
            .addCase(getRedditByLink.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasFailed = false;
                for(const thing_id in action.payload) {
                    // t3 = link, t1 = comment, t4 = message
                    if(action.payload[thing_id].data.children[0] !== undefined) {
                        if(action.payload[thing_id].data.children[0].kind === "t3") {
                            const child = action.payload[thing_id].data.children[0]
                            state.result = child.data;
                            console.log(child.data);
                        }
                    }
                }
            });
    }
});

export const { updateResultNo } = redditSlice.actions;
export const selectResult = (state) => state.reddit.result;
export const selectLink = (state) => state.reddit.link;
export const isLoadingResults = (state) => state.reddit.isLoading;
export default redditSlice.reducer;