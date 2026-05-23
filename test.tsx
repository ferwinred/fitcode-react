import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { test, describe, beforeEach, expect, jest } from "@jest/globals";

// ─── Mocks ───────────────────────────────────────────────────────────────────
// IMPORTANTE: Los mocks deben definirse ANTES de importar el componente que los usa

const mockRegister = jest.fn().mockName('mockRegister');
const mockIsAuthenticated = jest.fn().mockReturnValue(false).mockName('mockIsAuthenticated');

// Mock minimalista para evitar el error "App Router not mounted"
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => "",
  useSearchParams: () => new URLSearchParams(),
}));

// Mock de next/link
jest.mock("next/link", () => {
  return ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  );
});

// Mock del contexto de autenticación
jest.mock("@/context/auth-context", () => ({
  useAuth: jest.fn(() => ({
    register: mockRegister,
    isAuthenticated: mockIsAuthenticated(),
  })),
}));

// Mock de getUserErrorMessage
jest.mock("@/src/infrastructure/api/ApiClientError", () => ({
  getUserErrorMessage: (_err: unknown, fallback: string) => fallback,
}));

// Mock de componentes UI para que sean elementos HTML simples
jest.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }) => (
    <button {...props}>{children}</button>
  ),
}));

jest.mock("@/components/ui/input", () => ({
  Input: (props: React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} />,
}));

jest.mock("@/components/ui/label", () => ({
  Label: ({ children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement> & { children: React.ReactNode }) => (
    <label {...props}>{children}</label>
  ),
}));

jest.mock("@/components/ui/card", () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CardContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CardHeader: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// ─── Helper ───────────────────────────────────────────────────────────────────

// Import dinámico del componente para garantizar que use los mocks
const SignUpPage = require("./app/(auth)/signup/page").default;

/** Rellena y envía el paso 1 del formulario */
async function completarPaso1({
  nombre = "Carlos",
  apellido = "Mendoza",
  email = "carlos@fitcode.com",
  password = "password123",
} = {}) {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText(/nombre/i), nombre);
  await user.type(screen.getByLabelText(/apellido/i), apellido);
  await user.type(screen.getByLabelText(/email/i), email);
  await user.type(screen.getByLabelText(/password/i), password);
  await user.click(screen.getByRole("button", { name: /continuar/i }));
}

// ─── Setup ───────────────────────────────────────────────────────────────────

beforeEach(() => {
  jest.clearAllMocks();
  mockIsAuthenticated.mockReturnValue(false);
});

// ═════════════════════════════════════════════════════════════════════════════
// 1. RENDERIZADO INICIAL
// ═════════════════════════════════════════════════════════════════════════════

describe("SignUpPage - Renderizado inicial (Paso 1)", () => {
  test("muestra el título 'Crear cuenta'", () => {
    render(<SignUpPage />);
    expect(screen.getByText("Crear cuenta")).toBeInTheDocument();
  });

  test("muestra el subtítulo 'Datos obligatorios' en paso 1", () => {
    render(<SignUpPage />);
    expect(screen.getByText("Datos obligatorios")).toBeInTheDocument();
  });

  test("muestra los campos obligatorios: Nombre, Apellido, Email, Password", () => {
    render(<SignUpPage />);
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/apellido/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test("muestra los campos opcionales: Telefono, Sexo, Fecha de nacimiento", () => {
    render(<SignUpPage />);
    expect(screen.getByLabelText(/telefono/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/sexo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/fecha de nacimiento/i)).toBeInTheDocument();
  });

  test("el botón inicial dice 'Continuar'", () => {
    render(<SignUpPage />);
    expect(screen.getByRole("button", { name: /continuar/i })).toBeInTheDocument();
  });

  test("muestra el link a 'Iniciar sesión'", () => {
    render(<SignUpPage />);
    const link = screen.getByRole("link", { name: /iniciar sesión/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/signin");
  });

  test("el indicador de pasos muestra paso 1 activo", () => {
    render(<SignUpPage />);
    // Los 2 pasos existen (divs del step indicator)
    expect(screen.getByText("Datos obligatorios")).toBeInTheDocument();
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// 2. INTERACCIÓN CON INPUTS
// ═════════════════════════════════════════════════════════════════════════════

describe("SignUpPage - Interacción con inputs", () => {
  test("el usuario puede escribir en el campo Nombre", async () => {
    render(<SignUpPage />);
    const input = screen.getByLabelText(/nombre/i);
    await userEvent.type(input, "Carlos");
    expect(input).toHaveValue("Carlos");
  });

  test("el usuario puede escribir en el campo Apellido", async () => {
    render(<SignUpPage />);
    const input = screen.getByLabelText(/apellido/i);
    await userEvent.type(input, "Mendoza");
    expect(input).toHaveValue("Mendoza");
  });

  test("el usuario puede escribir un email válido", async () => {
    render(<SignUpPage />);
    const input = screen.getByLabelText(/email/i);
    await userEvent.type(input, "carlos@fitcode.com");
    expect(input).toHaveValue("carlos@fitcode.com");
  });

  test("el usuario puede escribir una contraseña", async () => {
    render(<SignUpPage />);
    const input = screen.getByLabelText(/password/i);
    await userEvent.type(input, "mipassword123");
    expect(input).toHaveValue("mipassword123");
  });

  test("la contraseña está oculta por defecto (type=password)", () => {
    render(<SignUpPage />);
    const input = screen.getByLabelText(/password/i);
    expect(input).toHaveAttribute("type", "password");
  });

  test("el botón del ojo muestra/oculta la contraseña", async () => {
    const user = userEvent.setup();
    render(<SignUpPage />);
    const passwordInput = screen.getByLabelText(/password/i);
    const toggleBtn = screen.getByRole("button", { name: /mostrar contraseña/i });
    
    expect(passwordInput).toHaveAttribute("type", "password");
    await user.click(toggleBtn);
    expect(passwordInput).toHaveAttribute("type", "text");
    await user.click(screen.getByRole("button", { name: /ocultar contraseña/i }));
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  test("el usuario puede seleccionar el sexo", async () => {
    render(<SignUpPage />);
    const select = screen.getByLabelText(/sexo/i);
    await userEvent.selectOptions(select, "male");
    expect(select).toHaveValue("male");
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// 3. VALIDACIONES - PASO 1
// ═════════════════════════════════════════════════════════════════════════════

describe("SignUpPage - Validaciones Paso 1", () => {
  test("muestra error si se envía el formulario vacío", async () => {
    const user = userEvent.setup();
    render(<SignUpPage />);
    await user.click(screen.getByRole("button", { name: /continuar/i }));
    expect(
      await screen.findByText("Por favor completa todos los campos obligatorios")
    ).toBeInTheDocument();
  });

  test("muestra error si falta el nombre", async () => {
    const user = userEvent.setup();
    render(<SignUpPage />);
    await user.type(screen.getByLabelText(/apellido/i), "Mendoza");
    await user.type(screen.getByLabelText(/email/i), "carlos@fitcode.com");
    await user.type(screen.getByLabelText(/password/i), "password123");
    await user.click(screen.getByRole("button", { name: /continuar/i }));
    expect(
      await screen.findByText("Por favor completa todos los campos obligatorios")
    ).toBeInTheDocument();
  });

  test("muestra error si la contraseña tiene menos de 8 caracteres", async () => {
    const user = userEvent.setup();
    render(<SignUpPage />);
    await user.type(screen.getByLabelText(/nombre/i), "Carlos");
    await user.type(screen.getByLabelText(/apellido/i), "Mendoza");
    await user.type(screen.getByLabelText(/email/i), "carlos@fitcode.com");
    await user.type(screen.getByLabelText(/password/i), "abc123"); // solo 6 chars
    await user.click(screen.getByRole("button", { name: /continuar/i }));
    expect(
      await screen.findByText("La contraseña debe tener al menos 8 caracteres")
    ).toBeInTheDocument();
  });

  test("no muestra error si todos los campos obligatorios están llenos", async () => {
    render(<SignUpPage />);
    await completarPaso1();
    // Si pasó al paso 2, no hay error
    expect(screen.queryByText("Por favor completa todos los campos obligatorios")).not.toBeInTheDocument();
    expect(screen.queryByText("La contraseña debe tener al menos 8 caracteres")).not.toBeInTheDocument();
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// 4. NAVEGACIÓN ENTRE PASOS
// ═════════════════════════════════════════════════════════════════════════════

describe("SignUpPage - Navegación entre pasos", () => {
  test("avanza al paso 2 al completar correctamente el paso 1", async () => {
    render(<SignUpPage />);
    await completarPaso1();
    expect(
      await screen.findByText("Datos opcionales (puedes completarlos después)")
    ).toBeInTheDocument();
  });

  test("en el paso 2 aparece el botón 'Atrás'", async () => {
    render(<SignUpPage />);
    await completarPaso1();
    expect(await screen.findByRole("button", { name: /atrás/i })).toBeInTheDocument();
  });

  test("en el paso 2 aparece el botón 'Crear cuenta'", async () => {
    render(<SignUpPage />);
    await completarPaso1();
    expect(await screen.findByRole("button", { name: /crear.?cuenta/i })).toBeInTheDocument();
  });

  test("el botón 'Atrás' regresa al paso 1", async () => {
    const user = userEvent.setup();
    render(<SignUpPage />);
    await completarPaso1();
    const backBtn = await screen.findByRole("button", { name: /atrás/i });
    await user.click(backBtn);
    expect(screen.getByText("Datos obligatorios")).toBeInTheDocument();
  });

  test("en el paso 2 muestra los campos opcionales: Peso, Altura, Objetivo", async () => {
    render(<SignUpPage />);
    await completarPaso1();
    expect(await screen.findByLabelText(/peso/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/altura/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/objetivo principal/i)).toBeInTheDocument();
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// 5. ENVÍO DEL FORMULARIO - PASO 2
// ═════════════════════════════════════════════════════════════════════════════

describe("SignUpPage - Envío del formulario (Paso 2)", () => {
  test("llama a register con los datos correctos al crear cuenta", async () => {
    const user = userEvent.setup();
    mockRegister.mockResolvedValueOnce();
    render(<SignUpPage />);

    await completarPaso1({
      nombre: "Carlos",
      apellido: "Mendoza",
      email: "carlos@fitcode.com",
      password: "password123",
    });

    // Paso 2 - crear cuenta sin datos opcionales
    const submitBtn = await screen.findByRole("button", { name: /crear.?cuenta/i });
    await user.click(submitBtn);

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledTimes(1);
      expect(mockRegister).toHaveBeenCalledWith(
        expect.objectContaining({
          email: "carlos@fitcode.com",
          password: "password123",
          fullName: "Carlos Mendoza",
          displayName: "Carlos",
        })
      );
    });
  });

  test("llama a register con peso y altura si el usuario los completa", async () => {
    const user = userEvent.setup();
    mockRegister.mockResolvedValueOnce(undefined);
    render(<SignUpPage />);

    await completarPaso1();

    const pesoInput = await screen.findByLabelText(/peso/i);
    const alturaInput = screen.getByLabelText(/altura/i);
    await user.type(pesoInput, "75");
    await user.type(alturaInput, "178");

    await user.click(screen.getByRole("button", { name: /crear.?cuenta/i }));

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith(
        expect.objectContaining({
          weightKg: 75,
          heightCm: 178,
        })
      );
    });
  });

  test("muestra error si register falla", async () => {
    const user = userEvent.setup();
    mockRegister.mockRejectedValueOnce(new Error("Server error"));
    render(<SignUpPage />);

    await completarPaso1();
    const submitBtn = await screen.findByRole("button", { name: /crear.?cuenta/i });
    await user.click(submitBtn);

    expect(
      await screen.findByText("Error al crear la cuenta. Intenta de nuevo.")
    ).toBeInTheDocument();
  });

  test("muestra 'Creando cuenta...' mientras carga", async () => {
    const user = userEvent.setup();
    // register tarda (promesa que no resuelve inmediatamente)
    mockRegister.mockImplementation(() => new Promise(() => {}));
    render(<SignUpPage />);

    await completarPaso1();
    await user.click(await screen.findByRole("button", { name: /crear.?cuenta/i }));

    expect(await screen.findByText("Creando cuenta...")).toBeInTheDocument();
  });

  test("el botón submit se deshabilita mientras carga", async () => {
    const user = userEvent.setup();
    mockRegister.mockImplementation(() => new Promise(() => {}));
    render(<SignUpPage />);

    await completarPaso1();
    const submitBtn = await screen.findByRole("button", { name: /crear.?cuenta/i });
    await user.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText("Creando cuenta...").closest("button")).toBeDisabled();
    });
  });
});