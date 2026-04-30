import { useState, useRef } from "react";

// ── Pencil Icon ──────────────────────────────────────────────────────────────
const PencilIcon = ({ size = 15, color = "#aaa" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0 }}
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

// ── Confirm Dialog ───────────────────────────────────────────────────────────
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
        Save Changes?
      </h3>
      <p className="text-[14px]" style={{ color: "#666" }}>
        Are you sure you want to save these profile changes? This will update
        your information in the system.
      </p>
      <div className="flex gap-3 justify-end mt-1">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-[8px] text-[14px] font-medium hover:cursor-pointer"
          style={{
            backgroundColor: "rgba(0,0,0,0.06)",
            color: "#555",
          }}
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-5 py-2 rounded-[8px] text-[14px] font-semibold hover:cursor-pointer"
          style={{ backgroundColor: "#E8B5BA", color: "#3a1a1e" }}
        >
          Confirm Save
        </button>
      </div>
    </div>
  </div>
);

// ── Editable Field Row ───────────────────────────────────────────────────────
const EditableField = ({
  label,
  value,
  onChange,
  type = "text",
  readOnly = false,
}) => (
  <div className="flex flex-col gap-5">
    <div className="flex items-center justify-between gap-6">
      {/* Label */}
      <span
        className="text-[20px] font-bold"
        style={{ color: "#1a1a1a", flexShrink: 0 }}
      >
        {label}
      </span>

      {/* Input pill */}
      {readOnly ? (
        <div
          className="flex items-center justify-center px-6 py-3 rounded-[10px] text-[15px] font-medium"
          style={{
            backgroundColor: "#D5D8DC",
            color: "#666",
            minWidth: "260px",
          }}
        >
          {value}
        </div>
      ) : (
        <div
          className="flex items-center gap-2 px-4 py-3 rounded-[10px]"
          style={{
            backgroundColor: "#fff",
            border: "1px solid rgba(0,0,0,0.08)",
            minWidth: "260px",
          }}
        >
          <PencilIcon size={15} color="#bbb" />
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 outline-none text-[15px] bg-transparent"
            style={{ color: "#1a1a1a", minWidth: 0 }}
          />
        </div>
      )}
    </div>

    {/* Row divider */}
    <hr style={{ borderColor: "rgba(0,0,0,0.1)" }} />
  </div>
);

const Body = ({
  user = {
    name: "Abdul Ahad Naim",
    role: "Assistant Manager",
    email: "naimhasan06@gmail.com",
    mobile: "+8801765472839",
    joinDate: "15 August, 2023",
    location: "Akhalia New Market, Sylhet",
    avatarUrl: null,
  },
  isLoading = false,
  onSave,
  onAvatarChange,
  className = "",
}) => {
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    location: user.location,
  });
  const [avatarPreview, setAvatarPreview] = useState(user.avatarUrl);
  const [showConfirm, setShowConfirm] = useState(false);
  const fileInputRef = useRef(null);

  const handleField = (key) => (val) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleAvatarFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarPreview(URL.createObjectURL(file));
    onAvatarChange?.(file);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    onSave?.({ ...user, ...form });
  };

  // Initials fallback
  const initials = form.name
    ? form.name
        .trim()
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0].toUpperCase())
        .join("")
    : "?";

  return (
    <>
      {showConfirm && (
        <ConfirmDialog
          onConfirm={handleConfirm}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      <div
        className={`${className} min-h-screen px-10 py-8 flex flex-col bg-[#E8B5BA]/20`}
        style={{
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* ── Header: Avatar + Name/Role + Save Button ── */}
        <div className="flex items-center justify-between mb-8">
          {/* Left: Avatar + Name/Role */}
          <div className="flex items-center gap-5">
            {/* Avatar */}
            <div className="relative" style={{ width: 110, height: 110 }}>
              <div
                className="w-full h-full rounded-full overflow-hidden"
                style={{ border: "3px solid rgba(232,181,186,0.5)" }}
              >
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center text-[28px] font-semibold select-none"
                    style={{
                      backgroundColor: "rgba(232,181,186,0.3)",
                      color: "#7B3F4E",
                    }}
                  >
                    {initials}
                  </div>
                )}
              </div>

              {/* Pencil edit badge */}
              <button
                onClick={handleAvatarClick}
                className="absolute bottom-1 right-1 flex items-center justify-center rounded-full hover:cursor-pointer"
                style={{
                  width: 28,
                  height: 28,
                  backgroundColor: "#fff",
                  border: "1.5px solid rgba(0,0,0,0.12)",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
                }}
                title="Change photo"
              >
                <PencilIcon size={13} color="#555" />
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarFile}
              />
            </div>

            {/* Name + Role badge */}
            <div className="flex flex-col gap-2">
              <span
                className="text-[22px] font-bold leading-tight"
                style={{ color: "#1a1a1a" }}
              >
                {form.name}
              </span>
              <span
                className="text-[13px] font-medium px-4 py-1.5 rounded-[8px] w-fit"
                style={{
                  backgroundColor: "rgba(232,181,186,0.4)",
                  color: "#7B3F4E",
                  border: "1px solid rgba(232,181,186,0.6)",
                }}
              >
                {user.role}
              </span>
            </div>
          </div>

          {/* Save Changes */}
          <button
            onClick={() => setShowConfirm(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-[10px] text-[15px] font-semibold transition-opacity active:scale-[0.98] hover:cursor-pointer bg-[#F54758]/15 hover:bg-[#F54758]/30"
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
            Save Changes
          </button>
        </div>

        {/* ── Section divider ── */}
        <hr className="mb-8" style={{ borderColor: "rgba(0,0,0,0.1)" }} />

        {/* ── Field Rows ── */}
        <div className="flex flex-col gap-6">
          <EditableField
            label="Name"
            value={form.name}
            onChange={handleField("name")}
          />
          <EditableField
            label="Email"
            value={form.email}
            onChange={handleField("email")}
            type="email"
          />
          <EditableField
            label="Mobile Number"
            value={form.mobile}
            onChange={handleField("mobile")}
            type="tel"
          />
          <EditableField label="Join Date" value={user.joinDate} readOnly />
          <EditableField
            label="Location"
            value={form.location}
            onChange={handleField("location")}
          />
        </div>
      </div>
    </>
  );
};

export default Body;

/**
 * ─── USAGE EXAMPLE ───────────────────────────────────────────────────────────
 *
 * const [user, setUser] = useState(null);
 * const [isLoading, setIsLoading] = useState(true);
 *
 * useEffect(() => {
 *   fetch("/api/me")
 *     .then((r) => r.json())
 *     .then((data) => { setUser(data); setIsLoading(false); });
 * }, []);
 *
 * const handleSave = async (updated) => {
 *   await fetch("/api/me", {
 *     method: "PUT",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify(updated),
 *   });
 * };
 *
 * const handleAvatarChange = async (file) => {
 *   const fd = new FormData();
 *   fd.append("avatar", file);
 *   await fetch("/api/me/avatar", { method: "POST", body: fd });
 * };
 *
 * <ProfileMainSection
 *   user={user}
 *   isLoading={isLoading}
 *   onSave={handleSave}
 *   onAvatarChange={handleAvatarChange}
 * />
 * ─────────────────────────────────────────────────────────────────────────────
 */
