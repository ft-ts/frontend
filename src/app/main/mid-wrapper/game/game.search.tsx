"use-client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import styles from "./gameItem.module.scss";
import { HookFormTypes, historyDto, historyInterface } from "./game.interface";
import { getGameHistory } from "../../../../app/api/client";

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
    console.log("onVaild", name.name);
    setSearchFlag(true);
    setGameHistory({history : []});
    const res = await getGameHistory(name.name);

    const json = res.data;
    if (json.history === null || json.history.length === 0 || json.history === undefined) {
      return;
    } else {
      setGameHistory(json);
    }
  }

  const onInvalid = (error : any) => {
    console.log("onInvalid", error);
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