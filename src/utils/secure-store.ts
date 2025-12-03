import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'access_token';
const USER_KEY = 'user_data';
const RESOURCE_KEY = 'resource_data';

export const SecureStoreService = {
  async saveToken(token: string): Promise<void> {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  },

  async getToken(): Promise<string | null> {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  },

  async removeToken(): Promise<void> {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  },

  async saveUser(user: string): Promise<void> {
    await SecureStore.setItemAsync(USER_KEY, user);
  },

  async getUser(): Promise<string | null> {
    return await SecureStore.getItemAsync(USER_KEY);
  },

  async removeUser(): Promise<void> {
    await SecureStore.deleteItemAsync(USER_KEY);
  },

  async saveResource(resource: string): Promise<void> {
    await SecureStore.setItemAsync(RESOURCE_KEY, resource);
  },

  async getResource(): Promise<string | null> {
    return await SecureStore.getItemAsync(RESOURCE_KEY);
  },

  async removeResource(): Promise<void> {
    await SecureStore.deleteItemAsync(RESOURCE_KEY);
  },

  async clearAll(): Promise<void> {
    await Promise.all([
      this.removeToken(),
      this.removeUser(),
      this.removeResource(),
    ]);
  },
};

