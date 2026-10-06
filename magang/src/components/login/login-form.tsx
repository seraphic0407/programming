import type { FormEvent } from "react";

type LoginFormProps = {
  username: string;
  password: string;
  loading: boolean;
  error: unknown;
  onUsernameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onSignUp: () => void;
};

const LoginForm = ({
  username,
  password,
  loading,
  error,
  onUsernameChange,
  onPasswordChange,
  onSubmit,
  onSignUp,
}: LoginFormProps) => {
  return (
    <div className="login-card">
      <div className="login-card-header">
        <p className="login-card-brand">MUSICFEAST</p>

        <h2>
          Welcome <span>Back</span>
        </h2>

        <p className="login-card-description">
          Good music always finds its way back to you.
        </p>
      </div>

      <form className="login-form" onSubmit={onSubmit}>
        <div className="login-field">
          <label htmlFor="username">Username</label>

          <div className="login-input-wrapper">
            <span className="login-input-icon">♙</span>

            <input
              id="username"
              type="text"
              value={username}
              onChange={(event) => onUsernameChange(event.target.value)}
              placeholder="Username"
              autoComplete="username"
              required
            />
          </div>
        </div>

        <div className="login-field">
          <label htmlFor="password">Password</label>

          <div className="login-input-wrapper">
            <span className="login-input-icon">♙</span>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => onPasswordChange(event.target.value)}
              placeholder="Password"
              autoComplete="current-password"
              required
            />
          </div>
        </div>

        <button type="button" className="forgot-password">
          Forgot password?
        </button>

        {Boolean(error) && <p className="login-error">Login gagal</p>}

        <button type="submit" className="login-button" disabled={loading}>
          <span>{loading ? "Signing In..." : "Log In"}</span>

          {!loading && <strong>→</strong>}
        </button>
      </form>

      <div className="login-signup">
        <p>Don't have an account?</p>

        <button type="button" onClick={onSignUp}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
