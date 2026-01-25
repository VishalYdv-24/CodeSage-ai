export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="fixed top-5 right-5 z-50 animate-slide-in">
      <div className="bg-black text-white px-4 py-2 rounded-lg shadow-lg text-sm">
        {message}
      </div>
    </div>
  );
}
