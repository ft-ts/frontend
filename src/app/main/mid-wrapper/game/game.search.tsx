'use-client';

import React, {useState} from 'react';
import styles from './gameItem.module.scss';
import { historyInterface } from './game.interface';
import { getGameHistory } from '../../../../app/axios/client';

export default function SearchBox(
  {
    setSearchFlag,
    setGameHistory,
  } :
  {
    setSearchFlag:React.Dispatch<React.SetStateAction<boolean>>
    setGameHistory:React.Dispatch<React.SetStateAction<historyInterface>>
  }
){
  const [ searchName, setSearchName] = useState<string>('');

  const handleSubmit = async () => {
    const res = await getGameHistory(searchName);
    const json = res.data;
    if (json.history === null || json.history.length === 0 || json.history === undefined) {
      setGameHistory({history : []});
      return;
    } else {
      setSearchFlag(true);
      setGameHistory(json);
    }
  }

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z]/g, '');
    if (e.target.value.length > 10)
      return;
    setSearchName(e.target.value);
  }
  return (
    <div className={styles.searchContainer}>
      <input 
        className={styles.searchBox}
        type='text'
        placeholder='Search username'
        onChange={handleName}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit();
          }
        }}
        maxLength={10}
      />
      <button className={styles.searchIconContainer} onClick={handleSubmit}>
        <img
          className={styles.searchIcon}
          src='asset/RecordSearch.svg'
          alt='RecordSearch icon'
          width={40}
          height={40}
        />
      </button>
    </div>
  )
}