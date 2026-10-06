import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { useLogin } from "../../hooks/useLogin";

import musicfeastBg from "../../assets/musicfeast-bg.png";

import LoginIntro from "../../components/login/login-intro";
import LoginForm from "../../components/login/login-form";
import LoginTransition from "../../components/login/login-transition";

import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const { loginUser, loading, error } = useLogin();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showTransition, setShowTransition] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const user = await loginUser(username, password);

    if (!user) {
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));
    setShowTransition(true);
  };

  if (showTransition) {
    return <LoginTransition />;
  }

  return (
    <main className="login-page">
      <div className="login-concert-bg">
        <img src={musicfeastBg} alt="" />
      </div>

      <div className="login-background-overlay" />

      <div className="login-logo">MUSICFEAST</div>

      <section className="login-layout">
        <LoginIntro />

        <LoginForm
          username={username}
          password={password}
          loading={loading}
          error={error}
          onUsernameChange={setUsername}
          onPasswordChange={setPassword}
          onSubmit={handleSubmit}
          onSignUp={() => navigate("/login")}
        />
      </section>
    </main>
  );
};

export { Login };
