const BASE_URL = 'https://dummyjson.com/users';

export const UserService = {
  async getAllUsers() {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    return data.users;
  },

  async getUserById(id: number) {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) throw new Error('Користувача не знайдено');
    return await response.json();
  },

  async createUser(userData: { firstName: string; lastName: string; email: string }) {
    const response = await fetch(`${BASE_URL}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return await response.json();
  },

  async updateUser(id: number, userData: Partial<{ firstName: string; lastName: string; email: string }>) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return await response.json();
  },

  async deleteUser(id: number) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    return await response.json();
  },
};