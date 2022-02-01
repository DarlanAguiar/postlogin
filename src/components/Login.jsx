import React, { useState, useContext } from "react";
import { FcGoogle } from "react-icons/fc";

import { useNavigate } from "react-router-dom";

import { firebaseApp } from "../database/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";

import { AuthContexts } from "../contexts/contexts";

import "./Login.css";

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const { setAuthenticated, setUserEmail } = useContext(AuthContexts);

  const navigate = useNavigate();

  const [isRegistering, setIsRegistering] = useState(null);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  onAuthStateChanged(auth, (usuarioFirebase) => {
    console.log("***" + usuarioFirebase.email);
    if (usuarioFirebase) {
      //caso tenha uma seção iniciada
      setUserEmail(usuarioFirebase.email);
      setAuthenticated(true);

      navigate("/");
    } else {
      //caso que nao tenha um seção iniciada
      setUserEmail(null);

      console.log("não tem usuario global");
    }
  });

  const showErrorMessage = (error) => {
    setHasError(true);
    if (error.message === "Firebase: Error (auth/internal-error).") {
      setErrorMessage("Dados incompleto");
    } else if (error.message === "Firebase: Error (auth/missing-email).") {
      setErrorMessage("Adicione o Email");
    } else if (error.message === "Firebase: Error (auth/invalid-email).") {
      setErrorMessage("Email inválido");
    } else if (
      error.message ===
      "Firebase: Password should be at least 6 characters (auth/weak-password)."
    ) {
      setErrorMessage("A senha deve conter no mínimo 6 caracteres");
    } else if (
      error.message === "Firebase: Error (auth/email-already-in-use)."
    ) {
      setErrorMessage("Email utilizado por outro usuáro");
    } else if (error.message === "Firebase: Error (auth/wrong-password).") {
      setErrorMessage("Senha inválida");
    } else if (error.message === "Firebase: Error (auth/user-not-found).") {
      setErrorMessage("Usuário não existe");
    }else if (error.message === "Senhas não conferem") {
      setErrorMessage("Senhas não conferem");
    } else {
      setErrorMessage(
        "cadastro não efetivado, confira os dados e tente novamente"
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasError(false);
    setErrorMessage("");

    if (isRegistering) {
      //se estou criando uma conta entro aqui
      if(password === passwordConfirm){

        try {
          const user = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
        } catch (error) {
          showErrorMessage(error);
        }
      }else{
        showErrorMessage({message: "Senhas não conferem"})
      }
    } else {
      //se nao estou criando entro aqui.
      try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        console.log("***entrando" + email);
      } catch (error) {
        console.log("***" + error.message);
        showErrorMessage(error);
      }
    }
  };

  const handleLoginGoogle = async () => {
    try {
      const user = await signInWithPopup(auth, googleProvider).then(
        (result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // informaçoes do usuario.
          const user = result.user;
        }
      );
    } catch (error) {
      console.log("***" + error.message);
    }
  };

  return (
    <div
      className="container"
      style={{ border: `3px solid ${isRegistering ? "yellow" : "#444"} ` }}
    >
      <div className="divText">
        <h1 style={{ color: isRegistering ? "yellow" : "chartreuse" }}>
          {isRegistering ? "Cadastrar" : "Já possui cadastro? "}
        </h1>
        <p>
          {isRegistering
            ? "Complete os campos para fazer cadastro"
            : "Faça o login "}
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="divInput">
          <label htmlFor="email">Seu email</label>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            type="text"
            placeholder="Email"
          />
        </div>

        <div className="divInput">
          <label>Senha</label>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            type="password"
            placeholder="Senha"
          />
        </div>
        {isRegistering && (
          <div className="divInput">
            <label>Confirme a senha</label>
            <input
              onChange={(e) => {
                setPasswordConfirm(e.target.value);
              }}
              value={passwordConfirm}
              type="password"
              placeholder="Senha"
            />
          </div>
        )}

        {hasError && (
          <p
            className="errorText"
            style={{ color: isRegistering ? "yellow" : "chartreuse" }}
          >
            {errorMessage}
          </p>
        )}

        <button
          className="logarCadastrar"
          type="submit"
          style={{ background: isRegistering ? "yellow" : "chartreuse" }}
        >
          {isRegistering ? "Cadastrar" : "Entrar"}
        </button>
      </form>

      {!isRegistering && (
        <button
          className="googleButton"
          onClick={() => handleLoginGoogle()}
          type="submit"
        >
          Entrar com Google <FcGoogle />
        </button>
      )}
      <button
        className="buttonState"
        onClick={() => {
          setIsRegistering(!isRegistering);
          setHasError(false);
        }}
      >
        {isRegistering
          ? "Já tem conta? Iniciar seção"
          : "Não tem conta? Cadastrar"}
      </button>
      <button
        onClick={() => {
          setAuthenticated(true);
          navigate("/");
        }}
        className="buttonNoRegister"
      >
        Usar o APP sem cadastro
      </button>
    </div>
  );
};

export default Login;
