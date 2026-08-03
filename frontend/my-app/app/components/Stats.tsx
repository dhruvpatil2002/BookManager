interface StatsProps {
  books: any[];
}

export function Stats({ books }: StatsProps) {
  const total = books.length;
  const wantToRead = books.filter((b) => b.status === "want-to-read").length;
  const reading = books.filter((b) => b.status === "reading").length;
  const completed = books.filter((b) => b.status === "completed").length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard label="Total" value={total} color="blue" />
      <StatCard label="Want to Read" value={wantToRead} color="yellow" />
      <StatCard label="Reading" value={reading} color="indigo" />
      <StatCard label="Completed" value={completed} color="green" />
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-100 text-blue-700",
    yellow: "bg-yellow-100 text-yellow-700",
    indigo: "bg-indigo-100 text-indigo-700",
    green: "bg-green-100 text-green-700",
  };
  return (
    <div className={`p-4 rounded-lg ${colorMap[color]}`}>
      <p className="text-sm font-medium">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}