'use client';
// hooks/useAuth.ts
import { useMsal } from '@azure/msal-react';
import { AccountInfo } from '@azure/msal-browser';
import { useState, useEffect } from 'react';

export const useAuth = () => {
  const { instance, accounts } = useMsal();
  const [user, setUser] = useState<AccountInfo | null>(null);

  useEffect(() => {
    if (accounts.length > 0) {
      setUser(accounts[0]);
    } else {
      setUser(null);
    }
  }, [accounts]);

  const signIn = async () => {
    await instance
      .loginPopup({ scopes: ['user.read', 'Files.Read'] })
      .catch(console.error);
  };

  const signOut = () => {
    instance.logoutPopup();
  };

  return { user, signIn, signOut };
};
