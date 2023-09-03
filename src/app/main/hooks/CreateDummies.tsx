import { apiClient } from "@/app/api/client"
import { UserStatus } from "../enum/UserStatus.enum"

export const CreateDummies = () => {
  apiClient.post('/login/addDemoUser', {
    email: "CCCC@gmail.com",
    avatar: "/asset/profile_dummy.png",
    name: "CCCC",
    uid: 3333,
    status: UserStatus.IN_GAME,
  });

  apiClient.post('/login/addDemoUser', {
    email: "DDDD@gmail.com",
    avatar: "/asset/profile_dummy.png",
    name: "DDDD",
    uid: 4444,
    status: UserStatus.OFFLINE,
  });

  apiClient.post('/login/addDemoUser', {
    email: "EEEE@gmail.com",
    avatar: "/asset/profile_dummy.png",
    name: "EEEE",
    uid: 5555,
    status: UserStatus.ONLINE,
  });

}