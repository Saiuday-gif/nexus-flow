import { useCallback, useEffect, useState } from 'react';

export type User = {
  id: string;
  email: string;
  name?: string;
};

export type AuthState = {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
};

const AUTH_STORAGE_KEY = 'nexusflow_auth';

function getStoredAuth(): AuthState {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!stored) {
      return { user: null, token: null, loading: false, error: null };
    }
    return JSON.parse(stored) as AuthState;
  } catch {
    return { user: null, token: null, loading: false, error: null };
  }
}

function setStoredAuth(state: AuthState) {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(state));
}

export function useAuth() {
  const [state, setState] = useState<AuthState>(() => getStoredAuth());

  useEffect(() => {
    if (state.user || state.token) {
      setStoredAuth(state);
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [state]);

  const login = useCallback(async (email: string, password: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      // Replace this with your real API call.
      const fakeToken = btoa(`${email}:${password}`);
      const user: User = {
        id: 'user-1',
        email,
        name: email.split('@')[0],
      };

      const nextState: AuthState = {
        user,
        token: fakeToken,
        loading: false,
        error: null,
      };
      setState(nextState);
      return nextState;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      const nextState: AuthState = {
        user: null,
        token: null,
        loading: false,
        error: errorMessage,
      };
      setState(nextState);
      throw new Error(errorMessage);
    }
  }, []);

  const logout = useCallback(() => {
    const nextState: AuthState = { user: null, token: null, loading: false, error: null };
    setState(nextState);
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    user: state.user,
    token: state.token,
    loading: state.loading,
    error: state.error,
    login,
    logout,
    clearError,
  };
}
