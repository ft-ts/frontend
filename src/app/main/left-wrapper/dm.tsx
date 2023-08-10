import React from "react";
import styles from "./channel.module.scss";
import { DmItem } from "./channelItem";
import { UserStatus } from "./enum/temp.enum";

export default function Dms() {
  const handleDmClick = (targetUid: number) => {
    console.log(`Clicked on DM with targetUid: ${targetUid}`);
    // 여기에서 클릭한 DM 아이템의 targetUid를 처리하는 로직을 추가할 수 있습니다.
  };

  return (
    <div>
      <DmPanels />
      <DmItem
        friend="Friend 1"
        profile="/asset/profile_dumy.png" state={UserStatus.ONLINE}
        targetUid={1}
        onClick={handleDmClick}
      />
    </div>
  );
}

const DmPanels = (props: {}) => {
  return (
    <div>
      <div className={styles.dmPanelBox}>
        <h2 className={styles.channelPanelFont}>Direct Messages</h2>
      </div>
    </div>
  );
};
