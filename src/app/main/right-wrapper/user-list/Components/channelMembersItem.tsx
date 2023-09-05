"use client";

import React, { useEffect, useState } from "react";
import { ChannelUser } from "../../../mid-wrapper/chat/interfaces/channelUser.interface"
import styles from "./channelMembersItem.module.scss";
import Image from "next/image";

export const ChannelMembersItem = (props: ChannelUser) => {

  const handleGetProfile = () => {
	console.log("Clicked on DM with targetUid: ");
	};
	
  return <div className={styles.channelMembersItemContainer} onClick={handleGetProfile}>
	<Image className={styles.profilePic} src={props.user.avatar} alt="profile" width={30} height={30}></Image>
	<div className={styles.nameContainer}>
	<h3 className={styles.name}>{props.user.name}</h3>
	<p className={styles.status}>{props.user.status}</p>
	</div>
	<p className={styles.role}>{props.role}</p>
  </div>;
}