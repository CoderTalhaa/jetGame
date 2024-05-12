import { create } from "zustand";

const useGameStore = create((set)=> ({
    status: '',
    setStatus: (newStatus)=> set({status: newStatus})
}))

export default useGameStore;