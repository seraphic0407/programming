import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/navbar";
import { Footer } from "../../components/footer";
import { MusicFeastBackground } from "../../components/musicfeast-background";
import "./profile.css";

type User = {
  id: number;
  username: string;
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  location?: string;
  profileImage?: string | null;
};

const API_URL = "http://localhost:3000/api/v1";

export const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [editMode, setEditMode] = useState(false);
  const [passwordMode, setPasswordMode] = useState(false);

  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login", { replace: true });
      return;
    }

    try {
      const parsedUser: User = JSON.parse(storedUser);

      setUser(parsedUser);
      setUsername(parsedUser.username ?? "");
      setFirstName(parsedUser.firstName ?? "");
      setLastName(parsedUser.lastName ?? "");
      setEmail(parsedUser.email ?? "");
      setPhone(parsedUser.phone ?? "");
      setLocation(parsedUser.location ?? "");
    } catch {
      localStorage.removeItem("user");
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const handleUpdateProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) return;

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(`${API_URL}/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          firstName,
          lastName,
          phone,
          location,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message ?? "Gagal memperbarui profile");
      }

      const updatedUser: User = {
        ...user,
        ...result.data,
      };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setEditMode(false);
      setMessage("Profile berhasil diperbarui.");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Gagal memperbarui profile.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) return;

    setMessage("");
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }

    setPasswordLoading(true);

    try {
      const response = await fetch(`${API_URL}/users/${user.id}/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message ?? "Gagal mengubah password");
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordMode(false);

      setMessage("Password berhasil diubah.");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Gagal mengubah password.",
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  if (!user) return null;

  const displayName =
    `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || user.username;

  const initials =
    displayName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((item) => item[0].toUpperCase())
      .join("") || "M";

  return (
    <MusicFeastBackground>
      <div className="profile-page">
        <Navbar />

        <main className="profile-main">
          <div className="profile-floating-note profile-note-one">♪</div>

          <div className="profile-floating-note profile-note-two">♫</div>

          <div className="profile-floating-note profile-note-three">✦</div>

          <section className="profile-hero">
            <div className="profile-hero-label">
              <span />
              PROFILE
              <span />
            </div>

            <div className="profile-hero-content">
              <div>
                <h1>
                  Your <span>Profile</span>
                </h1>

                <p>
                  Manage your account information and keep your MusicFeast
                  experience personal.
                </p>
              </div>

              <button
                type="button"
                className="profile-logout"
                onClick={handleLogout}
              >
                <span>↗</span>
                Logout
              </button>
            </div>
          </section>

          {message && (
            <div className="profile-message profile-message-success">
              {message}
            </div>
          )}

          {error && (
            <div className="profile-message profile-message-error">{error}</div>
          )}

          <section className="profile-layout">
            <aside className="profile-identity-card">
              <div className="profile-card-art">
                <div className="profile-art-ring profile-art-ring-one" />
                <div className="profile-art-ring profile-art-ring-two" />
                <div className="profile-art-glow" />

                <div className="profile-avatar">
                  {user.profileImage ? (
                    <img src={user.profileImage} alt={displayName} />
                  ) : (
                    <span>{initials}</span>
                  )}
                </div>

                <span className="profile-art-note">♪</span>
                <span className="profile-art-star">✦</span>
              </div>

              <div className="profile-identity">
                <span className="profile-card-label">MUSICFEAST MEMBER</span>

                <h2>{displayName}</h2>

                <p>@{user.username}</p>
              </div>

              <div className="profile-info-list">
                <div className="profile-info-item">
                  <span className="profile-info-icon">✉</span>

                  <div>
                    <span>Email</span>
                    <strong>{user.email}</strong>
                  </div>
                </div>

                <div className="profile-info-item">
                  <span className="profile-info-icon">♡</span>

                  <div>
                    <span>Phone</span>
                    <strong>{user.phone || "Not set"}</strong>
                  </div>
                </div>

                <div className="profile-info-item">
                  <span className="profile-info-icon">⌖</span>

                  <div>
                    <span>Location</span>
                    <strong>{user.location || "Not set"}</strong>
                  </div>
                </div>
              </div>

              <div className="profile-card-footer">
                <span>GOOD MUSIC</span>
                <span>BRIGHTER YOU</span>
              </div>
            </aside>

            <div className="profile-content">
              <section className="profile-panel">
                <div className="profile-panel-heading">
                  <div className="profile-panel-title">
                    <span className="profile-section-number">01</span>

                    <div>
                      <h2>Account Settings</h2>

                      <p>
                        Update your information to keep your MusicFeast
                        experience personal and up to date.
                      </p>
                    </div>
                  </div>

                  {!editMode && (
                    <button
                      type="button"
                      className="profile-action-button"
                      onClick={() => {
                        setMessage("");
                        setError("");
                        setEditMode(true);
                      }}
                    >
                      <span>✎</span>
                      Edit profile
                    </button>
                  )}
                </div>

                <form className="profile-form" onSubmit={handleUpdateProfile}>
                  <div className="profile-form-grid">
                    <label className="profile-field">
                      <span>Username</span>

                      <div className="profile-input-wrapper">
                        <span className="profile-input-icon">♙</span>

                        <input
                          type="text"
                          value={username}
                          onChange={(event) => setUsername(event.target.value)}
                          disabled={!editMode}
                        />
                      </div>
                    </label>

                    <label className="profile-field">
                      <span>Email</span>

                      <div className="profile-input-wrapper">
                        <span className="profile-input-icon">✉</span>

                        <input
                          type="email"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          disabled={!editMode}
                        />
                      </div>
                    </label>

                    <label className="profile-field">
                      <span>First name</span>

                      <div className="profile-input-wrapper">
                        <span className="profile-input-icon">♙</span>

                        <input
                          type="text"
                          value={firstName}
                          onChange={(event) => setFirstName(event.target.value)}
                          disabled={!editMode}
                        />
                      </div>
                    </label>

                    <label className="profile-field">
                      <span>Last name</span>

                      <div className="profile-input-wrapper">
                        <span className="profile-input-icon">♙</span>

                        <input
                          type="text"
                          value={lastName}
                          onChange={(event) => setLastName(event.target.value)}
                          disabled={!editMode}
                        />
                      </div>
                    </label>

                    <label className="profile-field">
                      <span>Phone</span>

                      <div className="profile-input-wrapper">
                        <span className="profile-input-icon">♡</span>

                        <input
                          type="tel"
                          value={phone}
                          onChange={(event) => setPhone(event.target.value)}
                          disabled={!editMode}
                        />
                      </div>
                    </label>

                    <label className="profile-field">
                      <span>Address</span>

                      <div className="profile-input-wrapper">
                        <span className="profile-input-icon">⌖</span>

                        <input
                          type="text"
                          value={location}
                          onChange={(event) => setLocation(event.target.value)}
                          disabled={!editMode}
                        />
                      </div>
                    </label>
                  </div>

                  {editMode && (
                    <div className="profile-form-actions">
                      <button
                        type="button"
                        className="profile-cancel-button"
                        onClick={() => {
                          setUsername(user.username ?? "");
                          setFirstName(user.firstName ?? "");
                          setLastName(user.lastName ?? "");
                          setEmail(user.email ?? "");
                          setPhone(user.phone ?? "");
                          setLocation(user.location ?? "");
                          setEditMode(false);
                        }}
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="profile-save-button"
                        disabled={loading}
                      >
                        {loading ? "Saving..." : "Save changes"}
                      </button>
                    </div>
                  )}
                </form>
              </section>

              <section className="profile-panel profile-security-panel">
                <div className="profile-panel-heading">
                  <div className="profile-panel-title">
                    <span className="profile-section-number">02</span>

                    <div>
                      <h2>Password & Security</h2>

                      <p>
                        Keep your account secure by protecting your MusicFeast
                        credentials.
                      </p>
                    </div>
                  </div>

                  {!passwordMode && (
                    <button
                      type="button"
                      className="profile-action-button"
                      onClick={() => {
                        setMessage("");
                        setError("");
                        setPasswordMode(true);
                      }}
                    >
                      <span>♧</span>
                      Change password
                    </button>
                  )}
                </div>

                {!passwordMode ? (
                  <div className="profile-password-preview">
                    <div className="profile-password-icon">♧</div>

                    <div className="profile-password-info">
                      <strong>Password</strong>

                      <div className="profile-password-dots">
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>

                    <div className="profile-security-status">
                      <span />
                      Protected
                    </div>
                  </div>
                ) : (
                  <form
                    className="profile-password-form"
                    onSubmit={handleChangePassword}
                  >
                    <label className="profile-field">
                      <span>Current password</span>

                      <div className="profile-input-wrapper">
                        <span className="profile-input-icon">♧</span>

                        <input
                          type="password"
                          value={currentPassword}
                          onChange={(event) =>
                            setCurrentPassword(event.target.value)
                          }
                          placeholder="Enter current password"
                          required
                        />
                      </div>
                    </label>

                    <label className="profile-field">
                      <span>New password</span>

                      <div className="profile-input-wrapper">
                        <span className="profile-input-icon">♧</span>

                        <input
                          type="password"
                          value={newPassword}
                          onChange={(event) =>
                            setNewPassword(event.target.value)
                          }
                          placeholder="Minimum 8 characters"
                          minLength={8}
                          required
                        />
                      </div>
                    </label>

                    <label className="profile-field">
                      <span>Confirm new password</span>

                      <div className="profile-input-wrapper">
                        <span className="profile-input-icon">♧</span>

                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(event) =>
                            setConfirmPassword(event.target.value)
                          }
                          placeholder="Repeat new password"
                          minLength={8}
                          required
                        />
                      </div>
                    </label>

                    <div className="profile-form-actions">
                      <button
                        type="button"
                        className="profile-cancel-button"
                        onClick={() => {
                          setCurrentPassword("");
                          setNewPassword("");
                          setConfirmPassword("");
                          setPasswordMode(false);
                        }}
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="profile-save-button"
                        disabled={passwordLoading}
                      >
                        {passwordLoading ? "Updating..." : "Update password"}
                      </button>
                    </div>
                  </form>
                )}
              </section>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </MusicFeastBackground>
  );
};
