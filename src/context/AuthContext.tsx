import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AuthState, AuthAction, User } from '../types/auth';

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Create context
const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateConnects: (newConnectValue: number) => void;
}>({
  state: initialState,
  dispatch: () => null,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  updateConnects: () => {},
});

// Auth reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
    case 'SIGNUP_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case 'LOGIN_FAILURE':
    case 'SIGNUP_FAILURE':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...initialState,
      };
    case 'UPDATE_CONNECTS':
      return {
        ...state,
        user: state.user ? { ...state.user, connects: action.payload } : null,
      };
    default:
      return state;
  }
};

// Auth Provider
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('upshare_user');
    if (storedUser) {
      const user = JSON.parse(storedUser) as User;
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    }
  }, []);

  // Mock login function (in a real app, this would make an API call)
  const login = async (email: string, password: string) => {
    dispatch({ type: 'LOGIN_REQUEST' });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would validate credentials on the backend
      // This is just for demo purposes
      const storedUsers = localStorage.getItem('upshare_users') || '[]';
      const users = JSON.parse(storedUsers) as { name: string; email: string; password: string; connects: number }[];
      
      const user = users.find(u => u.email === email && u.password === password);
      
      if (!user) {
        throw new Error('Invalid email or password');
      }
      
      const loggedInUser: User = {
        id: email, // Using email as ID for simplicity
        name: user.name,
        email: user.email,
        connects: user.connects,
      };
      
      localStorage.setItem('upshare_user', JSON.stringify(loggedInUser));
      dispatch({ type: 'LOGIN_SUCCESS', payload: loggedInUser });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: (error as Error).message });
    }
  };

  // Mock signup function
  const signup = async (name: string, email: string, password: string) => {
    dispatch({ type: 'SIGNUP_REQUEST' });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const storedUsers = localStorage.getItem('upshare_users') || '[]';
      const users = JSON.parse(storedUsers) as { name: string; email: string; password: string; connects: number }[];
      
      if (users.some(user => user.email === email)) {
        throw new Error('User with this email already exists');
      }
      
      // Create new user with 50 free connects
      const newUser = {
        name,
        email,
        password,
        connects: 50,
      };
      
      // Save user to "database"
      users.push(newUser);
      localStorage.setItem('upshare_users', JSON.stringify(users));
      
      // Create user object for state
      const user: User = {
        id: email, // Using email as ID for simplicity
        name,
        email,
        connects: 50,
      };
      
      localStorage.setItem('upshare_user', JSON.stringify(user));
      dispatch({ type: 'SIGNUP_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'SIGNUP_FAILURE', payload: (error as Error).message });
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('upshare_user');
    dispatch({ type: 'LOGOUT' });
  };

  // Update connects function
  const updateConnects = (newConnectValue: number) => {
    if (state.user) {
      const updatedUser = { ...state.user, connects: newConnectValue };
      localStorage.setItem('upshare_user', JSON.stringify(updatedUser));
      
      // Also update in the users array
      const storedUsers = localStorage.getItem('upshare_users') || '[]';
      const users = JSON.parse(storedUsers) as { name: string; email: string; password: string; connects: number }[];
      const updatedUsers = users.map(user => {
        if (user.email === state.user?.email) {
          return { ...user, connects: newConnectValue };
        }
        return user;
      });
      localStorage.setItem('upshare_users', JSON.stringify(updatedUsers));
      
      dispatch({ type: 'UPDATE_CONNECTS', payload: newConnectValue });
    }
  };

  return (
    <AuthContext.Provider value={{ state, dispatch, login, signup, logout, updateConnects }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);