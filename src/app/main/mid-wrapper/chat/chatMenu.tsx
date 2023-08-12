import styles from "./chat-wrapper.module.scss";
import React from "react";
import Image from "next/image";

export default function ChatMenu() {
	return (
	  <span className={styles.chatMenuBox}>
		<UserlistButton />
		<ChatSettingButton />
	  </span>
	);
  };
  
  const ChatSettingButton = (props: {}) => {
	return (
	  <button className={styles.settingButton}>
		<Image
		  src="/asset/setting.svg"
		  alt="settingButton"
		  width={55}
		  height={55}
		/>
	  </button>
	);
  };
  
  const UserlistButton = (props: {}) => {
	return (
	  <button className={styles.userlistButton}>
		<Image
		  src="/asset/user_list_button.svg"
		  alt="userlist button"
		  width={55}
		  height={55}
		></Image>
	  </button>
	);
  };