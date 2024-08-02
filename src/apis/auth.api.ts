import { AxiosInstance } from "axios";

class AuthAPI {
  private axios: AxiosInstance;
  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async login(email: string, password: string) {
    try {
      const response = await this.axios.post("/api/auth/login", {
        email: email,
        password: password,
      });
      return response;
    } catch (error) {
      return false;
    }
  }

  async signUp(email: string, password: string, nickname: string) {
    try {
      const response = await this.axios.post("/api/auth/signup", {
        email: email,
        password: password,
        nickname: nickname,
      });
      if (response.status === 200) {
        console.error("회원가입 완료: ", response.data);
      } else {
        console.error("회원가입 실패:", response.data);
      }
    } catch (e) {
      console.error("회원가입 중 오류 발생:", e);
    }
  }

  async emailUser(email: string): Promise<string> {
    try {
      const response = await this.axios.get("/api/auth/user", {
        params: {
          email: email,
        },
      });
      if (response.status === 200) {
        return "password";
      } else if (response.status === 201) {
        return "add-user";
      } else {
        return "로그인 도중 오류 발생";
      }
    } catch (error) {
      return "서버 오류 발생";
    }
  }

  async logout() {
    try {
      const response = await this.axios.post("/api/auth/logout");
      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      console.error("logout 중 오류 발생: ", error);
    }
  }
}

export default AuthAPI;
