import { createContext, useContext } from 'react';

export type UsernameContextType = {
  username: string | undefined;
  refreshUsername: () => Promise<void>;
};

const usernameContext = createContext<UsernameContextType>({
  username: '',
  refreshUsername: async () => {},
});
export const useUserName = () => useContext(usernameContext);

export default usernameContext;
