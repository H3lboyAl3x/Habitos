import * as SQLite from "expo-sqlite";
import { Habitos } from "./types";

export const db = SQLite.openDatabaseSync("app.db");

// Cria a tabela
export const initDB = async () => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS habitos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      hora TEXT NOT NULL,
      descricao TEXT
    );
  `);
};

// Adicionar hábito
export const addUser = async (nome: string, hora: string, descricao: string) => {
  await db.runAsync(
    "INSERT INTO habitos (nome, hora, descricao) VALUES (?, ?, ?)",
    nome,
    hora,
    descricao
  );
};

// Listar hábitos
export const getUsers = async (): Promise<Habitos[]> => {
  return await db.getAllAsync<Habitos>("SELECT * FROM habitos");
};

// Buscar por ID
export const getUserById = async (id: number): Promise<Habitos | null> => {
  return await db.getFirstAsync<Habitos>(
    "SELECT * FROM habitos WHERE id = ?",
    id
  );
};

// Remover hábito
export const deleteUser = async (id: number) => {
  await db.runAsync("DELETE FROM habitos WHERE id = ?", id);
};

// Ediat hábito
export const updateUser = async (id: number, nome: string, hora: string, descricao: string) => {
  await db.runAsync(
    "UPDATE habitos SET nome = ?, hora = ?, descricao = ? WHERE id = ?",
    nome,
    hora,
    descricao,
    id
  );
};