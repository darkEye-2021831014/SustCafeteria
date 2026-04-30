import { useState } from "react";

const AvatarPlaceholder = ({ name }) => {
  const initials = name
    ? name
        .trim()
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0].toUpperCase())
        .join("")
    : "?";

  return (
    <div
      className="w-[72px] h-[72px] rounded-full flex-shrink-0 flex items-center justify-center text-[22px] font-semibold select-none"
      style={{
        backgroundColor: "rgba(74, 44, 53, 0.18)",
        color: "#4A2C35",
      }}
    >
      {initials}
    </div>
  );
};

const UserAvatar = ({ avatarUrl, name }) => {
  const [imgError, setImgError] = useState(false);

  if (!avatarUrl || imgError) {
    return <AvatarPlaceholder name={name} />;
  }

  return (
    <img
      src={avatarUrl}
      alt={name ? `${name}'s avatar` : "User Avatar"}
      className="w-[72px] h-[72px] rounded-full object-cover flex-shrink-0"
      onError={() => setImgError(true)}
    />
  );
};

const Sidebar = ({
  name = "Abdul Ahad Naim",
  role = "Assistant Manager",
  avatarUrl = null,
  isLoading = false,
  onMyProfile,
  onLogOut,
  onChangePassword,
  activeItem = "profile",
  setActiveItem,
}) => {
  const handleProfile = () => {
    setActiveItem("profile");
    onMyProfile?.();
  };
  const handlePassword = () => {
    setActiveItem("password");
    onChangePassword?.();
  };

  const handleLogOut = () => {
    // setActiveItem("logout");
    onLogOut?.();
  };

  const activeBg = "rgba(232, 181, 186, 0.55)";

  return (
    <div
      className="flex flex-col flex-1 min-h-screen px-5 py-7 shadow-lg"
      style={{
        backgroundColor: "rgba(232, 181, 186, 0.5)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* User Info Block ── */}
      <div className="flex flex-row items-center gap-4">
        {isLoading ? (
          <div
            className="w-[72px] h-[72px] rounded-full flex-shrink-0 animate-pulse"
            style={{ backgroundColor: "rgba(74, 44, 53, 0.15)" }}
          />
        ) : (
          <UserAvatar avatarUrl={avatarUrl} name={name} />
        )}

        <div className="flex flex-col gap-2 min-w-0">
          {isLoading ? (
            <>
              <div
                className="h-5 w-36 rounded animate-pulse"
                style={{ backgroundColor: "rgba(74, 44, 53, 0.15)" }}
              />
              <div
                className="h-6 w-28 rounded-md animate-pulse"
                style={{ backgroundColor: "rgba(74, 44, 53, 0.12)" }}
              />
            </>
          ) : (
            <>
              <span
                className="text-[20px] font-bold leading-tight truncate"
                style={{ color: "#1F2937" }}
                title={name}
              >
                {name}
              </span>
              <span
                className="text-[14px] font-medium px-3.5 py-1 rounded-full w-fit max-w-full truncate bg-[#F54758]/10 shadow"
                style={{
                  color: "#6B7280",
                }}
                title={role}
              >
                {role}
              </span>
            </>
          )}
        </div>
      </div>

      <hr
        style={{
          marginTop: "26px",
          borderColor: "rgba(74, 44, 53, 0.2)",
        }}
      />

      {/* My Profile */}
      <button
        onClick={handleProfile}
        disabled={isLoading}
        className="flex items-center justify-between w-full px-4 py-3 rounded-[8px] transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer"
        style={{
          marginTop: "26px",
          backgroundColor: activeItem === "profile" ? activeBg : "transparent",
          color: "#1C2B3A",
        }}
      >
        <div className="flex items-center gap-3">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1C2B3A"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span className="text-[15px] font-medium">My Profile</span>
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#1C2B3A"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Change Password */}
      <button
        onClick={handlePassword}
        disabled={isLoading}
        className="flex items-center justify-between w-full px-4 py-3 rounded-[8px] transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer"
        style={{
          marginTop: "26px",
          backgroundColor: activeItem === "password" ? activeBg : "transparent",
          color: "#1C2B3A",
        }}
      >
        <div className="flex items-center gap-3">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1C2B3A"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            <circle cx="12" cy="16" r="1" />
          </svg>
          <span className="text-[15px] font-medium">Change Password</span>
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#1C2B3A"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* ── 3. Log Out ---- */}
      <button
        onClick={handleLogOut}
        disabled={isLoading}
        className="flex items-center gap-3 w-full px-4 py-3 rounded-[8px] transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer hover:bg-[#F54758]/10"
        style={{
          marginTop: "26px",
          color: "#1C2B3A",
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#1C2B3A"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
        <span className="text-[15px] font-medium">Log Out</span>
      </button>
    </div>
  );
};

export default Sidebar;

/**
 * ─── USAGE EXAMPLE ───────────────────────────────────────────────────────────
 *
 * const [user, setUser] = useState(null);
 * const [isLoading, setIsLoading] = useState(true);
 *
 * useEffect(() => {
 *   fetch("/api/me")
 *     .then((res) => res.json())
 *     .then((data) => {
 *       setUser(data);        // { name, role, avatarUrl }
 *       setIsLoading(false);
 *     });
 * }, []);
 *
 * <ProfileLeftSidebar
 *   name={user?.name}
 *   role={user?.role}
 *   avatarUrl={user?.avatarUrl}  // omit or null → shows initials placeholder
 *   isLoading={isLoading}
 *   onMyProfile={() => navigate("/profile")}
 *   onLogOut={() => authService.logout()}
 * />
 * ─────────────────────────────────────────────────────────────────────────────
 */
