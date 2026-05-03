import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);
const USER_KEY = 'capstone-user';
const USERS_KEY = 'capstone-users';

function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readJson(USER_KEY, null));

  const register = useCallback(({ name, email, password }) => {
    const users = readJson(USERS_KEY, []);
    const normalizedEmail = email.trim().toLowerCase();

    if (users.some((existingUser) => existingUser.email === normalizedEmail)) {
      return { ok: false, message: 'An account already exists for this email.' };
    }

    const newUser = { name: name.trim(), email: normalizedEmail, password };
    const sessionUser = { name: newUser.name, email: newUser.email };
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
    localStorage.setItem(USER_KEY, JSON.stringify(sessionUser));
    
    setUser(sessionUser);

    return { ok: true };
  }, []);

  const login = useCallback(({ email, password }) => {
    const users = readJson(USERS_KEY, []);
    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = users.find(
      (storedUser) => storedUser.email === normalizedEmail && storedUser.password === password
    );

    if (!existingUser) {
      return { ok: false, message: 'Check your email and password, then try again.' };
    }

    const sessionUser = { name: existingUser.name, email: existingUser.email };
    localStorage.setItem(USER_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);

    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(USER_KEY);
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, register, login, logout }), [login, logout, register, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
