import React, { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { forgotPassword } from "../../services/userService";

import loginEmailImg from '../../assets/loginEmail.svg';
import loginUserImg from '../../assets/loginUser.svg';
import loginPasswordImg from '../../assets/loginPassword.svg';

export function Login() {

  const { signIn, signOut } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingForgot, setIsLoadingForgot] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [forgot, setForgot] = useState(false);
  const [errorStatus, setErrorStatus] = useState<number>();
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  useEffect(() => {
    signOut();
  }, []);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setLoginData(prevState => ({ ...prevState, [event.target.id]: event.target.value }));
    setErrorStatus(undefined);
    setErrorEmail('');
    setErrorPassword('');
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      setIsLoading(true);
      await signIn(loginData.email, loginData.password);
      navigate('/minha-conta', { replace: true });
    } catch (error: any) {
      setErrorEmail(error.response.data.message.email);
      setErrorPassword(error.response.data.message.password);
      setErrorStatus(error.response.status);
    } finally {
      setIsLoadingForgot(false);
      setIsLoading(false);
    }
  }

  async function handleForgotPassword(event: FormEvent) {
    event.preventDefault();
    try {
      setIsLoadingForgot(true);
      await forgotPassword(loginData.email);
      alert('Se o email informado estiver cadastrado, você receberá um email de confirmação para redefinir sua senha.');
      setLoginData({ email: '', password: '' });
      setForgot(false);
    } catch (error: any) {
      setErrorEmail(error.response.data.message.email);
      setErrorStatus(error.response.status);
    } finally {
      setIsLoadingForgot(false);
    }
  }

  return (
    <section className="flex flex-col w-full min-h-screen items-center justify-center">
      <div
        onMouseDown={close}
        className={`modal-overlay ${forgot ? 'flex justify-center items-center' : 'hidden'} absolute w-full h-full bg-black/50 z-99 `}>
        <div onMouseDown={(e) => e.stopPropagation()} className="modal relative flex flex-col bg-white w-160 justify-center items-center rounded-2xl shadow-xl p-10">

          <button onClick={() => setForgot(false)} className="absolute text-text-main hover:text-standard-red font-bold text-xl cursor-pointer leading-none top-3 right-3" title="Fechar">✕</button>

          <form onSubmit={handleForgotPassword} className="size-full flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-5">Recuperar Senha</h2>
            <p className="text-xl text-center">Insira seu email cadastrado para receber um link de confirmação.</p>
            <div className="flex items-center mt-5 relative w-full">
              <img src={loginEmailImg} alt="Email login image" className="absolute left-2 w-8 h-8" />
              <input type="email" id="email" placeholder="Email" className="w-full h-14 pl-11 border border-border rounded-xl text-2xl pb-1" value={loginData.email} onChange={handleInputChange} />
            </div>
            <button type="submit" disabled={isLoadingForgot}
              className="w-full h-14 rounded-md bg-standard-blue text-white text-xl font-bold mt-6 cursor-pointer">
              {isLoadingForgot ? 'AGUARDE...' : 'ENVIAR'}
            </button>
          </form>
        </div>
      </div>


      <div className='flex flex-col bg-white w-160 h-160 justify-center items-center rounded-2xl shadow-xl p-10'>
        <div className="flex justify-center items-center rounded-full bg-gray-100 w-35 h-35 p-5">
          <img src={loginUserImg} alt="User login image" className="w-full h-full" />
        </div>

        <h1 className="text-4xl font-bold my-5">Login</h1>

        <form onSubmit={handleSubmit} className="size-full mb-2">
          <div className="flex items-center mt-5 relative w-full">
            <img src={loginEmailImg} alt="Email login image" className="absolute left-2 w-8 h-8" />
            <input type="email" id="email" placeholder="Email" className="w-full h-14 pl-11 border border-border rounded-xl text-2xl pb-1" value={loginData.email} onChange={handleInputChange} />
          </div>
          {(errorStatus) && <p className="-mt-0.5 -mb-3 ml-2 text-red-500">{errorStatus === 400 ? errorEmail : 'Email ou senha inválidos'}</p>}

          <div className="flex items-center mt-5 relative w-full">
            <img src={loginPasswordImg} alt="Password login image" className="absolute left-2 w-8 h-8" />
            <input type="password" id="password" placeholder="Senha" className="w-full h-14 pl-11 border border-border rounded-xl text-2xl pb-1" value={loginData.password} onChange={handleInputChange} />
          </div>
          {(errorStatus) && <p className="-mt-0.5 -mb-3 ml-2 text-red-500">{errorStatus === 400 ? errorPassword : 'Email ou senha inválidos'}</p>}

          <p className="text-xl text-right text-standard-blue underline cursor-pointer" onClick={() => setForgot(true)}>Esqueceu sua senha?</p>

          <button type="submit" disabled={isLoading}
            className="w-full h-14 rounded-md bg-standard-blue text-white text-xl font-bold mt-6 cursor-pointer">
            {isLoading ? 'VALIDANDO...' : 'LOGIN'}
          </button>
        </form>

        <div className="flex flex-col items-center mt-5">
          <p className="text-xl">Não possui uma conta?</p>
          <p className="text-xl text-standard-blue underline"><Link to="/register">Requisitar acesso</Link></p>
        </div>
      </div>
    </section>
  )
}