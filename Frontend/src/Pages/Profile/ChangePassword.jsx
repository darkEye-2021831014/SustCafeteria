import { useState } from "react";

// ── Eye Icon ─────────────────────────────────────────────────────────────────
const EyeIcon = ({ open = true }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#bbb"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0 }}
  >
    {open ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    )}
  </svg>
);

const LockIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#bbb"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0 }}
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const ConfirmDialog = ({ onConfirm, onCancel }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center"
    style={{ backgroundColor: "rgba(0,0,0,0.35)" }}
  >
    <div
      className="rounded-[12px] p-6 w-[340px] flex flex-col gap-4 shadow-xl"
      style={{ backgroundColor: "#fff", border: "1px solid rgba(0,0,0,0.08)" }}
    >
      <h3 className="text-[17px] font-bold" style={{ color: "#1a1a1a" }}>
        Change Password?
      </h3>
      <p className="text-[14px]" style={{ color: "#666" }}>
        Are you sure you want to change your password? You will need to use the
        new password on your next login.
      </p>
      <div className="flex gap-3 justify-end mt-1">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-[8px] text-[14px] font-medium hover:cursor-pointer"
          style={{ backgroundColor: "rgba(0,0,0,0.06)", color: "#555" }}
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-5 py-2 rounded-[8px] text-[14px] font-semibold hover:cursor-pointer"
          style={{ backgroundColor: "#E8B5BA", color: "#3a1a1e" }}
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
);

const PasswordField = ({
  label,
  value,
  onChange,
  showPassword,
  onToggleShow,
}) => (
  <div className="flex flex-col gap-5">
    <div className="flex items-center justify-between gap-6">
      {/* Label */}
      <span
        className="text-[20px] font-bold flex-shrink-0"
        style={{ color: "#1a1a1a" }}
      >
        {label}
      </span>

      {/* Input pill */}
      <div
        className="flex items-center gap-2 px-4 py-3 rounded-[10px]"
        style={{
          backgroundColor: "#fff",
          border: "1px solid rgba(0,0,0,0.08)",
          minWidth: "260px",
        }}
      >
        <LockIcon />
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="••••••••"
          className="flex-1 outline-none text-[15px] bg-transparent"
          style={{ color: "#1a1a1a", minWidth: 0 }}
        />
        <button
          type="button"
          onClick={onToggleShow}
          className="ml-1 flex items-center justify-center"
          tabIndex={-1}
        >
          <EyeIcon open={showPassword} />
        </button>
      </div>
    </div>

    {/* Row divider */}
    <hr style={{ borderColor: "rgba(0,0,0,0.1)" }} />
  </div>
);

const ChangePassword = ({ onChangePassword, className = "" }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [error, setError] = useState("");

  const validate = () => {
    if (!oldPassword) return "Please enter your current password.";
    if (newPassword.length < 8)
      return "New password must be at least 8 characters.";
    if (newPassword !== confirmPassword) return "New passwords do not match.";
    return "";
  };

  const handleSubmit = () => {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    setShowDialog(true);
  };

  const handleConfirm = () => {
    setShowDialog(false);
    onChangePassword?.({ oldPassword, newPassword });
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      {showDialog && (
        <ConfirmDialog
          onConfirm={handleConfirm}
          onCancel={() => setShowDialog(false)}
        />
      )}

      <div
        className={`${className} min-h-screen px-10 py-8 flex flex-col`}
        style={{
          backgroundColor: "rgba(232, 181, 186, 0.18)",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* ── Page Header ── */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex flex-col gap-1">
            <h1 className="text-[24px] font-bold" style={{ color: "#1a1a1a" }}>
              Change Password
            </h1>
            <p className="text-[14px]" style={{ color: "#999" }}>
              Update your account password below.
            </p>
          </div>
        </div>

        {/* ── Section divider ── */}
        <hr className="mb-8" style={{ borderColor: "rgba(0,0,0,0.1)" }} />

        {/* ── Password Fields ── */}
        <div className="flex flex-col gap-6">
          <PasswordField
            label="Old Password"
            value={oldPassword}
            onChange={setOldPassword}
            showPassword={showOld}
            onToggleShow={() => setShowOld((v) => !v)}
          />
          <PasswordField
            label="New Password"
            value={newPassword}
            onChange={setNewPassword}
            showPassword={showNew}
            onToggleShow={() => setShowNew((v) => !v)}
          />
          <PasswordField
            label="Confirm Password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            showPassword={showConfirmPwd}
            onToggleShow={() => setShowConfirmPwd((v) => !v)}
          />
        </div>

        {/* ── Inline error ── */}
        {error && (
          <p
            className="mt-4 text-[13px] font-medium"
            style={{ color: "#c0392b" }}
          >
            {error}
          </p>
        )}

        {/* ── Change Password Button ── */}
        <div className="mt-8 self-end">
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-10 py-4 rounded-[10px] text-[15px] font-semibold transition-opacity hover:opacity-90 active:scale-[0.98] hover:cursor-pointer
            bg-[#F54758]/15 hover:bg-[#F54758]/30"
            style={{ color: "#3a1a1e" }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Change Password
          </button>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;

/**
 * ─── USAGE EXAMPLE ───────────────────────────────────────────────────────────
 *
 * const handleChangePassword = async ({ oldPassword, newPassword }) => {
 *   await fetch("/api/me/password", {
 *     method: "PUT",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify({ oldPassword, newPassword }),
 *   });
 * };
 *
 * <ChangePasswordSection onChangePassword={handleChangePassword} />
 * ─────────────────────────────────────────────────────────────────────────────
 */
