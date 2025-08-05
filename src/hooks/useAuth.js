import { useState, useEffect } from "react";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("http://localhost:4000/api/users/me", {
          credentials: "include", // envia o cookie http-only junto
        });

        if (!res.ok) {
          throw new Error("Não autenticado");
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        setUser(null);
        setError(err.message || "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  return { user, loading, error };
}
