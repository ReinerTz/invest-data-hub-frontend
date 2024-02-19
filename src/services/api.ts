// src/services/api.ts

import { Stock } from "../types/Stock";

const API_URL = "http://localhost:3000/stocks"; // Ajuste o endpoint conforme necessário

export const fetchLatestStocks = async (): Promise<Stock[]> => {
  try {
    console.log(import.meta.env);
    const response = await fetch(`${import.meta.env.VITE_API_URL}/stocks`);
    if (!response.ok) {
      throw new Error("Erro ao buscar ações");
    }
    return response.json();
  } catch (error) {
    console.error("Erro ao buscar ações", error);
    return [];
  }
};

export const fetchStockRecommendations = async (): Promise<Stock[]> => {
  try {
    const response = await fetch(`${API_URL}/recommendation`);
    if (!response.ok) {
      throw new Error("Erro ao buscar recomendações");
    }
    return response.json();
  } catch (error) {
    console.error("Erro ao buscar recomendações", error);
    return [];
  }
};
