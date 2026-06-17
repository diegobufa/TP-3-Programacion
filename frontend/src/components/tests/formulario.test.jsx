import { test, expect } from "vitest";

function validarEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

test("Email válido", () => {
  expect(validarEmail("usuario@gmail.com")).toBe(true);
});

test("Email inválido", () => {
  expect(validarEmail("usuariogmail.com")).toBe(false);
});