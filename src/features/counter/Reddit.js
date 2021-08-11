import React, { useState, useEffect } from 'react';
import Parser from 'html-react-parser';
import { useSelector, useDispatch } from 'react-redux';
import { updateResultNo, 
    fetchResults, 
    getRedditByLink, 
    selectResult, 
    selectLink, 
    isLoadingResults } from './redditSlice';

export const Reddit = (props) => {
    const dispatch = useDispatch();
    const result = useSelector(selectResult);
    const link = useSelector(selectLink);
    const isLoading = useSelector(isLoadingResults);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    function htmlDecode(input) {
        var doc = new DOMParser().parseFromString(input, "text/html");
        return doc.documentElement.textContent;
    }

    dispatch(updateResultNo(props.resultNo));

    useEffect(() => {
        dispatch(fetchResults(''));
    }, [dispatch]);

    useEffect(() => {
        dispatch(getRedditByLink(link));
    }, [dispatch, link]);

    useEffect(() => {
        setTitle(result.title);
        console.log(result);
        if(result.selftext === "") {
            // image
            const bodyHtml = `<img src='${result.url}'></img>`
            setBody(bodyHtml);
        }
        else {
            setBody(htmlDecode(result.selftext_html));
        }
    }, [result]);

    

    

    if (isLoading) return <div>Loading results...</div>

    return (
        <div className='top-container'>
            <div className="reddit-unit">
                <h1>{title}</h1>
                {Parser(body)}
            </div>
        </div>
    );
};