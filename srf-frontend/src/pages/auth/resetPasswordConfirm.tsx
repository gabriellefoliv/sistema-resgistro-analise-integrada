import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { confirmPasswordReset } from "../../services/userService";

type ResetStatus = "loading" | "success" | "error";

export function ResetPasswordConfirm() {
    const { token } = useParams<{ token: string }>();
    const [status, setStatus] = useState<ResetStatus>("loading");
    const [message, setMessage] = useState("");
    const hasRequested = useRef(false);

    useEffect(() => {
        if (!token) {
            setStatus("error");
            setMessage("Token não fornecido.");
            return;
        }

        if (hasRequested.current) return;
        hasRequested.current = true;

        confirmPasswordReset(token)
            .then((data) => {
                setStatus("success");
                setMessage(data.message);
            })
            .catch((error) => {
                setStatus("error");
                const msg = error?.response?.data?.message || "Ocorreu um erro ao redefinir a senha.";
                setMessage(msg);
            });
    }, [token]);

    return (
        <section className="flex flex-col w-full min-h-screen items-center justify-center">
            <div className="flex flex-col bg-white w-160 justify-center items-center rounded-2xl shadow-xl p-10">

                {status === "loading" && (
                    <div className="flex flex-col items-center gap-4 py-10">
                        <div className="flex items-center justify-center w-24 h-12 gap-4">
                            <span className="border-5 rounded-full border-black loading-span-0"></span>
                            <span className="border-5 rounded-full border-black loading-span-1"></span>
                            <span className="border-5 rounded-full border-black loading-span-2"></span>
                        </div>
                        <p className="text-xl text-text-main">Redefinindo sua senha...</p>
                    </div>
                )}

                {status === "success" && (
                    <div className="flex flex-col items-center gap-4 py-6">
                        <h1 className="text-3xl font-bold text-text-main">Senha Redefinida!</h1>
                        <p className="text-xl text-center text-text-light-gray max-w-sm">
                            {message}
                        </p>
                        <Link
                            to="/login"
                            className="mt-4 w-full h-14 rounded-md bg-standard-blue text-white text-xl font-bold flex items-center justify-center hover:opacity-90 transition-opacity"
                        >
                            IR PARA O LOGIN
                        </Link>
                    </div>
                )}

                {status === "error" && (
                    <div className="flex flex-col items-center gap-4 py-6">

                        <h1 className="text-3xl font-bold text-text-main">Erro na Redefinição</h1>
                        <p className="text-xl text-center text-text-light-gray max-w-sm">
                            {message}
                        </p>
                        <Link
                            to="/login"
                            className="mt-4 w-full h-14 rounded-md bg-standard-blue text-white text-xl font-bold flex items-center justify-center hover:opacity-90 transition-opacity"
                        >
                            VOLTAR AO LOGIN
                        </Link>
                    </div>
                )}

            </div>
        </section>
    );
}
