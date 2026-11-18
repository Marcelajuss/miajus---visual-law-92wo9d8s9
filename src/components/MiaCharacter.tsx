import React from 'react'
import miaAvatar from '@/assets/adff4496-feb7-4055-84c0-5e580b870162-2-1e2c8.jpg'

interface MiaAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** Mantido por compatibilidade com chamadas existentes: a avatar da Mia é uma única imagem. */
  expression?: 'happy' | 'waving' | 'thinking' | 'guiding'
  className?: string
}

const sizePx = { sm: 40, md: 64, lg: 110, xl: 180 }

/**
 * Avatar oficial da Mia (imagem enviada pela usuária).
 * A foto é ampliada e deslocada via CSS para enquadrar o rosto dentro do quadrado,
 * sem distorcer a proporção original.
 */
export const MiaCharacter: React.FC<MiaAvatarProps> = ({ size = 'md', className = '' }) => {
  const px = sizePx[size]

  return (
    <div
      className={`relative inline-flex overflow-hidden flex-shrink-0 select-none rounded-xl bg-[#F4EFF9] ${className}`}
      style={{ width: px, height: px }}
      role="img"
      aria-label="Mia - Assistente MiaJus"
    >
      <img
        src={miaAvatar}
        alt=""
        draggable={false}
        className="absolute max-w-none pointer-events-none"
        style={{ width: '240%', left: '-70%', top: '-21%' }}
      />
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
      <MiaCharacter size={size === 'sm' ? 'sm' : 'md'} />
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
