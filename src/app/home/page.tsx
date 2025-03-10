import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <main className="flex flex-col items-center p-6 text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Reserve sua sala com facilidade
        </h1>
        <p className="text-gray-600 mt-4 max-w-xl">
          Escolha uma sala, selecione o horário e faça sua reserva em poucos
          cliques. Gerencie todas as suas reservas em um só lugar.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <div className="flex gap-4">
            <Link
              href="/login"
              className="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-50 transition"
            >
              Fazer Login
            </Link>

            <Link
              href="/register"
              className="px-6 py-3 text-white bg-gray-800 rounded-lg shadow hover:bg-gray-700 transition"
            >
              Criar Conta
            </Link>
          </div>
        </div>
      </main>

      <footer className="w-full py-4 text-center text-gray-500">
        © {new Date().getFullYear()} Sistema de Reservas de Salas
      </footer>
    </div>
  );
}
