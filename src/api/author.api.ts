import http from "@/lib/http";

export const getAccountAUthor = async () => {
  const res = await http.get(`/auth/profile`);
  return res;
};
export class ApiAuthor {
  async createGroup(
    name: string,
    userId: string
  ): Promise<{ statusCode: number; message: string; data?: any }> {
    const res = await http.post(`/room/create-room`, {
      name,
      userId,
    });
    return res.data;
  }

  async joinGroup(userId: string, roomId: string, name: string) {
    const res = await http.post(`/room/join-group`, { userId, roomId, name });

    return res.data;
  }
  async getGroups() {
    const res = await http.get(`/room/all`);
    return res.data;
  }
  async getALlMessage(page?: number, limit?: number) {
    const res = await http.get(
      `/room/all-messages?page=${page || 1}&limit=${limit || 10}`
    );
    return res.data;
  }
  async getBlogByUser(userId: string, page?: number, limit?: number) {
    const payload = { userId: userId } as { userId: string };
    const res = await http.post(
      `/blog/by-user?page=${page}&limit=${limit}`,
      payload
    );
    return res.data;
  }
  async getBlogStatsByUser(userId: string) {
    const res = await http.get(`/blog/stats/${userId}`);
    return res.data;
  }
  async getAuthor(id: string) {
    const res = await http.get(`/auth/profile/${id}`);
    return res.data;
  }
  async registerAccount(data: {
    nameAccount: string;
    name: string;
    email: string;
    password: string;
    SDT: string;
  }) {
    const res = await http.post(`/auth/register`, {
      name: data.name,
      email: data.email,
      password: data.password,
      nameAccount: data.nameAccount,
      SDT: data.SDT,
    });
    return res.data;
  }
}
const api = new ApiAuthor();
export default api;
