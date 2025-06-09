export default function AboutCard({ children }) {
  return (
    <article className="relative p-6 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 rounded-xl border border-purple-600 shadow-lg shadow-indigo-900/30 overflow-hidden">
      <div className="relative z-10">{children}</div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-transparent opacity-10 rounded-xl pointer-events-none"
      />
    </article>
  );
}
