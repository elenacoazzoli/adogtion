import { createContext, useContext } from 'react';

export type UsernameContextType = {
  username: string | undefined;
  role: number | undefined;
  refreshUsername: () => Promise<void>;
};

const usernameContext = createContext<UsernameContextType>({
  username: '',
  role: 1,
  refreshUsername: async () => {},
});
export const useUserName = () => useContext(usernameContext);

export default usernameContext;
