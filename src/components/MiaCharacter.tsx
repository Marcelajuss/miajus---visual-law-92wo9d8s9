import React from 'react'

interface MiaAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  expression?: 'happy' | 'waving' | 'thinking' | 'guiding'
  className?: string
}

/**
 * Personagem Mia - Mascote e assistente amigável original do MiaJus - Visual Law
 * Ilustração em SVG original, moderna, minimalista e jurídica (tons de azul marinho, terracota suave e dourado)
 */
export const MiaCharacter: React.FC<MiaAvatarProps> = ({
  size = 'md',
  expression = 'happy',
  className = '',
}) => {
  const sizeMap = {
    sm: { w: 40, h: 40, viewBox: '0 0 100 100' },
    md: { w: 64, h: 64, viewBox: '0 0 100 100' },
    lg: { w: 110, h: 110, viewBox: '0 0 100 100' },
    xl: { w: 180, h: 180, viewBox: '0 0 100 100' },
  }

  const { w, h, viewBox } = sizeMap[size]

  return (
    <div
      className={`inline-flex items-center justify-center flex-shrink-0 select-none ${className}`}
      style={{ width: w, height: h }}
      aria-label="Mia - Assistente Visual Law"
    >
      <svg
        width={w}
        height={h}
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm transition-transform hover:scale-105"
      >
        {/* Fundo suave com halo circular elegante */}
        <circle cx="50" cy="50" r="46" fill="#F0F4F8" stroke="#E2E8F0" strokeWidth="2" />
        <circle cx="50" cy="50" r="42" fill="#FFFFFF" />

        {/* Cabelo posterior e coque moderno */}
        <ellipse cx="50" cy="30" rx="20" ry="12" fill="#2C3E50" />
        <circle cx="50" cy="18" r="9" fill="#2C3E50" />
        {/* Grampo minimalista dourado */}
        <rect x="44" y="16" width="12" height="3" rx="1.5" fill="#D97706" />

        {/* Pescoço */}
        <rect x="46" y="58" width="8" height="12" fill="#FBD38D" rx="2" />

        {/* Blazer elegante azul marinho jurídico */}
        <path d="M26 88 C26 70, 36 66, 50 66 C64 66, 74 70, 74 88 L74 94 L26 94 Z" fill="#1E293B" />
        {/* Blusa interna branca */}
        <polygon points="44,66 56,66 50,78" fill="#F8FAFC" />
        {/* Lapelas do blazer */}
        <polygon points="34,68 45,68 42,84 32,82" fill="#0F172A" />
        <polygon points="66,68 55,68 58,84 68,82" fill="#0F172A" />
        {/* Broche discreto MiaJus */}
        <circle cx="38" cy="76" r="2" fill="#D97706" />

        {/* Rosto */}
        <ellipse cx="50" cy="44" rx="17" ry="18" fill="#FED7AA" />

        {/* Franja elegante e moderna */}
        <path
          d="M33 40 C34 32, 42 26, 50 26 C58 26, 66 32, 67 40 C63 35, 57 34, 50 35 C43 36, 37 38, 33 40 Z"
          fill="#2C3E50"
        />
        <path d="M33 40 C35 48, 35 52, 34 56 C33 52, 32 46, 33 40 Z" fill="#2C3E50" />
        <path d="M67 40 C65 48, 65 52, 66 56 C67 52, 68 46, 67 40 Z" fill="#2C3E50" />

        {/* Óculos minimalistas finos de armação dourada (visual law, precisão) */}
        <rect
          x="36"
          y="39"
          width="11"
          height="8"
          rx="3"
          stroke="#B45309"
          strokeWidth="1.2"
          fill="rgba(255,255,255,0.3)"
        />
        <rect
          x="53"
          y="39"
          width="11"
          height="8"
          rx="3"
          stroke="#B45309"
          strokeWidth="1.2"
          fill="rgba(255,255,255,0.3)"
        />
        <line x1="47" y1="43" x2="53" y2="43" stroke="#B45309" strokeWidth="1.2" />

        {/* Olhos amigáveis */}
        {expression === 'thinking' ? (
          <>
            <circle cx="41.5" cy="42" r="1.8" fill="#1E293B" />
            <circle cx="58.5" cy="42" r="1.8" fill="#1E293B" />
            <path
              d="M38 36 Q41.5 35 45 37"
              stroke="#1E293B"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <path
              d="M55 37 Q58.5 35 62 36"
              stroke="#1E293B"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </>
        ) : (
          <>
            <circle cx="41.5" cy="43" r="1.8" fill="#1E293B" />
            <circle cx="58.5" cy="43" r="1.8" fill="#1E293B" />
            <circle cx="42.2" cy="42.3" r="0.6" fill="#FFFFFF" />
            <circle cx="59.2" cy="42.3" r="0.6" fill="#FFFFFF" />
            <path
              d="M38 37 Q41.5 35.5 45 37"
              stroke="#1E293B"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <path
              d="M55 37 Q58.5 35.5 62 37"
              stroke="#1E293B"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </>
        )}

        {/* Nariz delicado */}
        <path
          d="M50 45 L50 48 L51.5 48.5"
          stroke="#F97316"
          strokeWidth="0.8"
          strokeLinecap="round"
        />

        {/* Sorriso acolhedor */}
        <path
          d={expression === 'happy' ? 'M45 52 Q50 56 55 52' : 'M46 52 Q50 55 54 52'}
          stroke="#991B1B"
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
        />

        {/* Bochechas levemente coradas */}
        <circle cx="36" cy="48" r="2.2" fill="#FCA5A5" opacity="0.6" />
        <circle cx="64" cy="48" r="2.2" fill="#FCA5A5" opacity="0.6" />

        {/* Mão acenando se 'waving' ou 'guiding' */}
        {expression === 'waving' && (
          <g className="animate-bounce">
            <circle cx="78" cy="48" r="5" fill="#FED7AA" />
            <path d="M74 52 Q72 62 70 70" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
            <path
              d="M78 43 Q80 40 82 43"
              stroke="#F97316"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </g>
        )}

        {expression === 'guiding' && (
          <g>
            <circle cx="22" cy="52" r="4.5" fill="#FED7AA" />
            <path d="M18 50 L10 46" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        )}
      </svg>
    </div>
  )
}

/**
 * Balão de fala ou orientação da Mia com aviso ético e instruções
 */
export const MiaBubble: React.FC<{
  title?: string
  message: string
  actionLabel?: string
  onAction?: () => void
  variant?: 'info' | 'warning' | 'tip'
  size?: 'sm' | 'md'
}> = ({ title = 'Dica da Mia', message, actionLabel, onAction, variant = 'info', size = 'md' }) => {
  const borderColors = {
    info: 'border-[#E3D9EE] bg-[#F4EFF9]/80 text-[#3E3359]',
    warning: 'border-amber-200 bg-amber-50/80 text-amber-950',
    tip: 'border-slate-200 bg-slate-50 text-slate-800',
  }

  return (
    <div
      className={`flex items-start gap-3 p-3.5 rounded-xl border ${borderColors[variant]} shadow-sm`}
    >
      <MiaCharacter size={size === 'sm' ? 'sm' : 'md'} expression="guiding" />
      <div className="flex-1 min-w-0 text-sm">
        {title && (
          <p className="font-semibold text-xs tracking-wide uppercase opacity-80 mb-0.5">{title}</p>
        )}
        <p className="leading-relaxed">{message}</p>
        {actionLabel && onAction && (
          <button
            type="button"
            onClick={onAction}
            className="mt-2 text-xs font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity"
          >
            {actionLabel} &rarr;
          </button>
        )}
      </div>
    </div>
  )
}
