import { defineStore } from 'pinia';
import { ref } from 'vue';
import { userService } from '@/services'; // Usando o serviço refatorado
import type { User } from '@/type';

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([]);
  const myUser = ref<User | null>(null);

  async function fetchAllUsers(force: boolean = false) {
    if (users.value.length > 0 && !force) return;
    try {
      const response = await userService.fetchAll();
      users.value = response.data;
    } catch (error) {
      console.error("Erro ao buscar todos os usuários:", error);
    }
  }
  
  async function fetchMyUser(force: boolean = false) {
    if (myUser.value && !force) return;
    try {
      const initialUser = await userService.fetchMe();
      const id = initialUser.data.id
      const response = await userService.fetch(id);
      myUser.value = response.data;
    } catch (error) {
      console.error("Erro ao buscar dados do usuário logado:", error);
    }
  }

  function addUser(newUser: User) {
    users.value.push(newUser);
  }

  function resetState() {
    users.value = [];
    myUser.value = null;
  }

  return { 
    users, 
    myUser, 
    fetchAllUsers,
    fetchMyUser, 
    addUser,
    resetState
  };
});