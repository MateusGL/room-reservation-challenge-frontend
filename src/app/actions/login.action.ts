"use server";
import { cookies } from "next/headers";
import { loginSchema } from "../schemas/auth-schemas";

export type LoginState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string;
  success?: boolean;
};

export async function loginUser(
  prevState: LoginState | null,
  formData: FormData
): Promise<LoginState> {
  try {
    const validatedData = loginSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!validatedData.success) {
      return {
        errors: validatedData.error.flatten().fieldErrors,
        message: "Campos inválidos. Corrija os erros e tente novamente.",
      };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validatedData.data),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        message: data.message || "Erro ao fazer login",
      };
    }

    // Configuração dos cookies
    if (data.access_token) {
      const cookieStore = await cookies();
      cookieStore.set("access_token", data.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 1 semana
        path: "/",
      });
    }

    return { message: "Login successful!", success: true };
  } catch (error) {
    console.error("Login error:", error);
    return {
      message: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}
