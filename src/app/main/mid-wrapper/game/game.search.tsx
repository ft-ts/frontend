"use-client";

import React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import styles from "./gameItem.module.scss";
import { HookFormTypes, historyInterface } from "./game.interface";
import { getGameHistory } from "../../../../app/axios/client";

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
  const { register, handleSubmit } = useForm<HookFormTypes>();

  const onVaild = async ( name : HookFormTypes) => {
    setGameHistory({history : []});
    const res = await getGameHistory(name.name);
    const json = res.data;
    if (json.history === null || json.history.length === 0 || json.history === undefined) {
      return;
    } else {
      setSearchFlag(true);
      setGameHistory(json);
    }
  }

  const onInvalid = (error : any) => {
    setSearchFlag(false);
  }

  return (
    <form className={styles.searchContainer} onSubmit={handleSubmit(onVaild, onInvalid)}>
      <input 
        className={styles.searchBox}
        {...register("name", { required: true })}
        type="text"
        placeholder="Search username"
      />
      <button className={styles.searchIconContainer}>
        <Image
          className={styles.searchIcon}
          src="asset/RecordSearch.svg"
          alt="RecordSearch icon"
          width={40}
          height={40}
        />
      </button>
    </form>
  )
}