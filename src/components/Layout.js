import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-xl">Sistema de Reserva de Salas</h1>
      </header>
      <main className="flex-grow container mx-auto p-4">{children}</main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        &copy; 2025 Sistema de Reserva de Salas
      </footer>
    </div>
  );
};

export default Layout;
