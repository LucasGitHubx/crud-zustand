import {create} from 'zustand';
import {User, UserID} from '../types';

interface State{
    users: User[];
    addUser: (user: User) => void;
    updateUser: (updatedUser: User, userID: UserID) => void;
    deleteUser: (userID: UserID) => void;
}

export const useUsersStore = create<State>((set) => ({
    users: [],
    
    addUser: (user) => set((state) => ({
        users: [user, ...state.users]
    })),

    updateUser: (updatedUser, userID) => set((state) => ({
        users: state.users.map(user => user.userID === userID ? updatedUser : user)
    })),

    deleteUser: (userID) => set((state) => ({
        users: state.users.filter(user => user.userID !== userID)
    })),
}));