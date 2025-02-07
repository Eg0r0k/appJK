import router from "@/router";
import { LoginDTO, Post, SignupDTO, UserI } from "@/types/auth";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { v4 as uuidv4 } from "uuid";
export const useAuthStore = defineStore("auth", () => {
  const authData = ref<UserI | null>({
    id: uuidv4(),
    username: "asdasd",
    firstName: "Анатолий",
    lastName: "Анатоливич",
    phone: null,
    imgURL: "/sdsd/",
    email: "asdasd@sds.sd",
    post: Post.Operator,
    birthday: null,
  });

  const isAuth = computed(() => Boolean(!!authData.value));
  const username = computed(() => authData.value?.username);
  const email = computed(() => authData.value?.email);
  const fullName = computed(() => {
    if (!authData.value) return "Пользователь";
    const { firstName, lastName } = authData.value;
    return [firstName, lastName].filter(Boolean).join(" ") || "Пользователь";
  });
  const initials = computed(() => {
    if (!authData.value) return "П";
    const { firstName, lastName } = authData.value;
    const first = firstName?.[0]?.toUpperCase() || "";
    const last = lastName?.[0]?.toUpperCase() || "";
    return `${first}${last}` || "П";
  });

  const login = async (args: LoginDTO) => {
    console.log(args);
  };
  const signup = async (args: SignupDTO) => {
    console.log(args);
  };

  const logout = () => {
    authData.value = null;
    router.push("/login");
  };
  const getUser = async () => {};

  return {
    isAuth,
    username,
    fullName,
    email,
    login,
    logout,
    signup,
    getUser,
    initials,
    authData,
  };
});
