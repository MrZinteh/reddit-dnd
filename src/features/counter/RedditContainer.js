import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Reddit } from '../features/counter/Reddit';
import styles from './Reddit.module.css';

export function RedditContainer() {
    const dispatch = useDispatch();

    return (
        <div className="reddit-container" style={styles.redditContainer}>
            <Reddit resultNo={0}/>
            <Reddit resultNo={1}/>
            <Reddit resultNo={2}/>
            <Reddit resultNo={3}/>
            <Reddit resultNo={4}/>
            <Reddit resultNo={5}/>
        </div>
    )
}