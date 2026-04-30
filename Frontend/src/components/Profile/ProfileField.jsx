import { theme } from "../config/theme";
import { IconEdit } from "./Icons";

/**
 * ProfileField
 * Props:
 *   label      — string
 *   value      — string
 *   editable   — bool (default true)
 *   onChange   — (val) => void
 *   last       — bool  (hides bottom divider)
 */
export default function ProfileField({ label, value, editable = true, onChange, last = false }) {
  const { colors, fonts, radius } = theme;

  return (
    <div>
      <div style={{
        display:        "flex",
        alignItems:     "center",
        justifyContent: "space-between",
        padding:        "22px 0",
        gap:            24,
      }}>
        {/* Label */}
        <span style={{
          fontFamily: fonts.heading,
          fontWeight: 700,
          fontSize:   17,
          color:      colors.textPrimary,
          minWidth:   180,
          flexShrink: 0,
        }}>
          {label}
        </span>

        {/* Input or readonly */}
        {editable ? (
          <div style={{
            display:         "flex",
            alignItems:      "center",
            gap:             8,
            backgroundColor: colors.inputBg,
            border:          `1px solid ${colors.inputBorder}`,
            borderRadius:    radius.lg,
            padding:         "11px 16px",
            minWidth:        300,
            boxShadow:       `inset 0 1px 3px rgba(200,130,145,0.08)`,
            transition:      "border-color 0.15s, box-shadow 0.15s",
          }}
          onFocus={() => {}}
          >
            <IconEdit size={14} color={colors.textMuted} />
            <input
              type="text"
              value={value}
              onChange={(e) => onChange?.(e.target.value)}
              style={{
                background:  "none",
                border:      "none",
                outline:     "none",
                fontSize:    14,
                color:       colors.textPrimary,
                fontFamily:  fonts.body,
                fontWeight:  400,
                flex:        1,
                minWidth:    0,
              }}
            />
          </div>
        ) : (
          <div style={{
            backgroundColor: colors.readonlyBg,
            border:          `1px solid #c8c8c8`,
            borderRadius:    radius.lg,
            padding:         "11px 16px",
            minWidth:        300,
          }}>
            <span style={{
              fontSize:   14,
              color:      colors.readonlyText,
              fontFamily: fonts.body,
            }}>
              {value}
            </span>
          </div>
        )}
      </div>

      {/* Divider */}
      {!last && (
        <div style={{
          height:          1,
          backgroundColor: colors.divider,
          opacity:         0.5,
        }} />
      )}
    </div>
  );
}
