import { BookCard } from "@/app/components/BookCard";
import { useBookStore } from "@/app/lib/bookstore";

interface BookListProps {
  books: any[];
}

export function BookList({ books }: BookListProps) {
  const { filterStatus, filterTag } = useBookStore();

  const filtered = books.filter((book) => {
    if (filterStatus && book.status !== filterStatus) return false;

    if (filterTag) {
      const tags =
        book.tags?.map((tag: string) => tag.toLowerCase()) ?? [];

      if (!tags.includes(filterTag.toLowerCase())) {
        return false;
      }
    }

    return true;
  });

  if (filtered.length === 0) {
    return (
      <p className="py-8 text-center text-gray-500">
        No books match your filters.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filtered.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
}