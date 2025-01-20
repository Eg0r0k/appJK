import { defineStore } from "pinia";
import { ref } from "vue";

enum Post {
  Administrator = "admin",
  Operator = "operator",
}

interface UserI {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  imgURL: string;
  email: string;
  post: Post;
  signupDate: Date;
  birthday: Date | null;
}

export const useAuthStore = defineStore("auth", () => {
  const authData = ref<UserI | null>(null);
  const isAuth = ref(true);

  const username = ref("");
  const email = ref("");

  const login = () => {};
  const logout = () => {};
  const signup = () => {};
  const getUser = () => {};

  return {
    isAuth,
    username,
    email,
    login,
    logout,
    signup,
    getUser,
    authData,
  };
});
