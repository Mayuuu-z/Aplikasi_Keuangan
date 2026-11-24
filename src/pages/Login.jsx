import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { signInWithGoogle } from "../services/authService";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Detail error login:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "Terjadi kesalahan saat login."
      );
      setIsLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h2 className="mb-3">Sistem Manajemen Keuangan</h2>
        <p className="text-muted mb-4">
          Silakan login untuk mulai mencatat transaksi Anda.
        </p>
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            Login gagal: {errorMessage}
          </div>
        )}
        <Button
          variant="primary"
          size="lg"
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? "Menghubungkan ke Google..." : "Login dengan Google"}
        </Button>
      </div>
    </Container>
  );
}