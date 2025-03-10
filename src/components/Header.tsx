"use client";

import Link from "next/link";

export function Header() {
  return (
    <header className="w-full py-4 bg-white text-black shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Botão Home */}
        <Link
          href="/home"
          className="flex items-center hover:bg-gray-100 px-3 py-1 rounded transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.707 3.293a1 1 0 010 1.414L7.414 8H15a1 1 0 110 2H7.414l3.293 3.293a1 1 0 01-1.414 1.414l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Home
        </Link>

        {/* Título com link para Dashboard */}
        <Link 
          href="/dashboard"
          className="text-xl font-bold hover:text-blue-600 transition"
        >
          Sistema de Reservas
        </Link>

        {/* Menu Direito */}
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/myReservations"
            className="flex items-center hover:bg-gray-100 px-3 py-1 rounded transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            Minhas Reservas
          </Link>

          <Link
            href="/profile"
            className="flex items-center hover:bg-gray-100 px-3 py-1 rounded transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            Perfil
          </Link>
        </div>
      </div>
    </header>
  );
}