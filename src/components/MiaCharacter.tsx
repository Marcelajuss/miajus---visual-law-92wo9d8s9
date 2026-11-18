import React from 'react'
import miaAvatar from '@/assets/6a7a74d8-ef24-45e7-8f79-a25ba4b97848-b9c26.png'

interface MiaAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** Mantido por compatibilidade com chamadas existentes: a avatar da Mia é uma única imagem. */
  expression?: 'happy' | 'waving' | 'thinking' | 'guiding'
  className?: string
}

const sizePx = { sm: 48, md: 76, lg: 132, xl: 224 }

/**
 * Avatar oficial da Mia (nova imagem enviada pela usuária).
 * A ilustração já vem com o fundo lilás arredondado no próprio arquivo (estilo app icon),
 * então ela é exibida INTEIRA — sem recorte — para que o cartaz
 * "Formatação inteligente e Petições que geram resultados" fique sempre visível e legível.
 * Os tamanhos foram ampliados em relação à versão anterior para dar destaque ao cartaz.
 */
export const MiaCharacter: React.FC<MiaAvatarProps> = ({ size = 'md', className = '' }) => {
  const px = sizePx[size]

  return (
    <img
      src={miaAvatar}
      alt="Mia - Assistente MiaJus"
      draggable={false}
      role="img"
      aria-label="Mia - Assistente MiaJus"
      className={`inline-block flex-shrink-0 select-none rounded-xl ${className}`.replace(
        'rounded-xl rounded-',
        'rounded-',
      )}
      style={{ width: px, height: px }}
    />
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
