import {
  createContext,
  useContext,
  useState,
  createElement,
  type ReactNode,
} from "react";
import type { TokenPair } from "../types/token";

export interface TokenContextValue {
  selectedPair: TokenPair | null;
  setSelectedPair: (pair: TokenPair | null) => void;
}

export const TokenContext = createContext<TokenContextValue | undefined>(
  undefined
);

export function useToken() {
  const ctx = useContext(TokenContext);
  if (!ctx) {
    throw new Error("useToken must be used within a TokenProvider");
  }
  return ctx;
}

export function TokenProvider({ children }: { children: ReactNode }) {
  const [selectedPair, setSelectedPair] = useState<TokenPair | null>(null);

  return createElement(
    TokenContext.Provider,
    { value: { selectedPair, setSelectedPair } },
    children
  );
}
