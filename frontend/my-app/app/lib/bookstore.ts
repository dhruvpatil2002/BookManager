import { create } from "zustand";

interface BookState {
  books: any[];
  setBooks: (books: any[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  filterStatus: string | null;
  setFilterStatus: (status: string | null) => void;
  filterTag: string | null;
  setFilterTag: (tag: string | null) => void;
  removeBook: (id: string) => void;
}

export const useBookStore = create<BookState>((set) => ({
  books: [],
  setBooks: (books) => set({ books }),
  loading: false,
  setLoading: (loading) => set({ loading }),
  filterStatus: null,
  setFilterStatus: (status) => set({ filterStatus: status }),
  filterTag: null,
  setFilterTag: (tag) => set({ filterTag: tag }),
    removeBook:(id:string)=>set((state)=>({
    books: state.books.filter(
      (book)=>book._id !== id
    )
      }))
}));