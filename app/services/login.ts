interface loginForm {
  name: string | null;
  password: string | null;
}
export const login = async (params: loginForm) => {
  console.log("config.public.login");
  const { $api } = useNuxtApp();
  return await $api.post("/auth/login", params);
};
