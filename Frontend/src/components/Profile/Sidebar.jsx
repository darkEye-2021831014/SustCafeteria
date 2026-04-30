import { theme } from "../config/theme";
import { IconUser, IconLogOut, IconChevronRight } from "./Icons";

const SIDEBAR_ITEMS = [
  { key: "Profile", label: "My Profile", Icon: IconUser },
];

export default function Sidebar({ activePage, onNavigate, onLogout, user }) {
  const { colors, layout, fonts, radius } = theme;

  return (
    <aside style={{
      width:           layout.sidebarWidth,
      minHeight:       "100%",
      backgroundColor: colors.primary,
      borderRight:     `1px solid ${colors.inputBorder}`,
      display:         "flex",
      flexDirection:   "column",
      padding:         "20px 12px 16px",
      flexShrink:      0,
      fontFamily:      fonts.body,
    }}>

      {/* ── User card ── */}
      <div style={{
        display:       "flex",
        alignItems:    "center",
        gap:           12,
        padding:       "4px 8px 20px",
        borderBottom:  `1px solid ${colors.inputBorder}`,
        marginBottom:  12,
      }}>
        {/* Avatar */}
        <div style={{
          width:        44,
          height:       44,
          borderRadius: "50%",
          overflow:     "hidden",
          border:       `2px solid ${colors.white}`,
          flexShrink:   0,
          boxShadow:    `0 1px 4px ${colors.shadow}`,
          background:   colors.primaryDark,
          display:      "flex",
          alignItems:   "center",
          justifyContent: "center",
        }}>
          {user?.avatarUrl ? (
            <img src={user.avatarUrl} alt="avatar"
              style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <span style={{ color: colors.white, fontWeight: 700, fontSize: 15 }}>
              {user?.name?.[0] ?? "?"}
            </span>
          )}
        </div>

        {/* Name + badge */}
        <div style={{ minWidth: 0 }}>
          <p style={{
            fontWeight:   700,
            fontSize:     13.5,
            color:        colors.textPrimary,
            lineHeight:   1.3,
            whiteSpace:   "nowrap",
            overflow:     "hidden",
            textOverflow: "ellipsis",
          }}>
            {user?.name ?? "Loading…"}
          </p>
          <span style={{
            display:         "inline-block",
            marginTop:       4,
            fontSize:        11,
            padding:         "2px 10px",
            borderRadius:    radius.pill,
            backgroundColor: colors.badgeBg,
            color:           colors.badgeText,
            fontWeight:      500,
            border:          `1px solid ${colors.inputBorder}`,
          }}>
            {user?.role ?? ""}
          </span>
        </div>
      </div>

      {/* ── Nav items ── */}
      <nav style={{ flex: 1 }}>
        {SIDEBAR_ITEMS.map(({ key, label, Icon }) => {
          const active = activePage === key || activePage === "Profile";
          return (
            <button
              key={key}
              onClick={() => onNavigate(key)}
              style={{
                display:         "flex",
                alignItems:      "center",
                justifyContent:  "space-between",
                width:           "100%",
                padding:         "10px 12px",
                borderRadius:    radius.md,
                border:          "none",
                cursor:          "pointer",
                fontFamily:      fonts.body,
                fontSize:        14,
                fontWeight:      active ? 600 : 500,
                color:           active ? colors.textPrimary : colors.textSecondary,
                backgroundColor: active ? colors.white : "transparent",
                boxShadow:       active ? `0 1px 6px ${colors.shadow}` : "none",
                transition:      "background 0.15s, box-shadow 0.15s",
                marginBottom:    4,
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Icon size={17} color={active ? colors.primaryDeep : colors.textMuted} />
                {label}
              </span>
              {active && <IconChevronRight size={14} color={colors.textMuted} />}
            </button>
          );
        })}
      </nav>

      {/* ── Log Out ── */}
      <button
        onClick={onLogout}
        style={{
          display:         "flex",
          alignItems:      "center",
          gap:             10,
          width:           "100%",
          padding:         "10px 12px",
          borderRadius:    radius.md,
          border:          "none",
          cursor:          "pointer",
          fontFamily:      fonts.body,
          fontSize:        14,
          fontWeight:      500,
          color:           colors.textSecondary,
          backgroundColor: "transparent",
          transition:      "background 0.15s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.badgeBg)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
      >
        <IconLogOut size={17} color={colors.textMuted} />
        Log Out
      </button>
    </aside>
  );
}
