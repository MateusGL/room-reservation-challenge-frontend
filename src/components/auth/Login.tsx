import type { FC } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { User } from '../../types/index'

interface LoginProps {
  onLogin?: (usuario: User) => void
}

export const Login: FC<LoginProps> = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      })
      const data = await response.json()
      localStorage.setItem('token', data.token)
      onLogin?.(data.usuario)
      router.push('/reservas')
    } catch (error) {
      console.error('Erro no login:', error)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 border rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            value={credentials.email}
            onChange={(e) => setCredentials({...credentials, email: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Senha</label>
          <input
            type="password"
            value={credentials.password}
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Entrar
        </button>
      </form>
    </div>
  )
}