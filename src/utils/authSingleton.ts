<<<<<<< HEAD
let accessToken: string | null = null;
let role: string | null = null;
let userName: string | null = null;
let email: string | null = null;
=======

let accessToken: string | null = null;
let role: string | null = null;
let userName: string | null = null;
>>>>>>> d720bde (Pushing the project to the repo)

export const authStore = {
  getAccessToken: (): string | null => accessToken,
  setAccessToken: (token: string | null): void => {
    accessToken = token;
  },
  getRole: () => role,
  setRole: (r: string | null) => { role = r; },
  getUserName: () => userName,
<<<<<<< HEAD
  setUserName: (name: string | null) => { userName = name; },
  getEmail: () => email,
  setEmail: (e: string | null) => { email = e; }
=======
  setUserName: (name: string | null) => { userName = name; }
>>>>>>> d720bde (Pushing the project to the repo)
};
