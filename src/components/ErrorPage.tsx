export function ErrorPage(error: string) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-red-100 text-red-700 p-4 rounded-lg max-w-md text-center">
        {error}
      </div>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Tentar novamente
      </button>
    </div>
  );
}
