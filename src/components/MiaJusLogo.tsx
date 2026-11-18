import React from 'react'
import { Link } from 'react-router-dom'
import { MiaCharacter } from '@/components/MiaCharacter'

interface MiaJusLogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  linkToHome?: boolean
}

/**
 * Logotipo "MiaJus" (nome colado) com a avatar da Mia ao lado e o subtítulo "Visual Law".
 */
export const MiaJusLogo: React.FC<MiaJusLogoProps> = ({
  className = '',
  size = 'md',
  linkToHome = true,
}) => {
  const sizeClasses = {
    sm: 'text-base tracking-tight',
    md: 'text-xl tracking-tight',
    lg: 'text-2xl tracking-tight',
  }

  const subtitleClasses = {
    sm: 'text-[9px] tracking-widest',
    md: 'text-[11px] tracking-widest',
    lg: 'text-[13px] tracking-widest',
  }

  const avatarSize = size === 'lg' ? 'md' : 'sm'

  const content = (
    <div className={`inline-flex items-center gap-2.5 select-none leading-none ${className}`}>
      <MiaCharacter size={avatarSize} className="rounded-full" />
      <div className="inline-flex flex-col leading-none">
        <span className={`font-bold tracking-tight text-slate-900 ${sizeClasses[size]}`}>
          MiaJus
        </span>
        <span
          className={`font-sans font-medium uppercase text-[0.72em] tracking-wider mt-0.5 ${subtitleClasses[size]}`}
          style={{ color: 'var(--iris-pink)' }}
        >
          Visual Law
        </span>
      </div>
    </div>
  )

  if (linkToHome) {
    return (
      <Link to="/" className="inline-flex hover:opacity-90 transition-opacity">
        {content}
      </Link>
    )
  }

  return content
}

/**
 * Aviso ético de inteligência artificial conforme item (7) da especificação:
 * "A inteligência artificial pode cometer erros. Revise e valide os documentos e informações antes de utilizá-los."
 */
export const LegalAIAviso: React.FC<{ className?: string; compact?: boolean }> = ({
  className = '',
  compact = false,
}) => {
  return (
    <div
      className={`rounded-lg border border-slate-200 bg-slate-50/80 px-3 py-2 text-slate-600 text-xs flex items-center gap-2 ${className}`}
      role="note"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
      <span className={compact ? 'text-[11px] leading-tight' : 'leading-relaxed'}>
        <strong>Aviso Legal:</strong> A inteligência artificial pode cometer erros. Revise e valide
        os documentos e informações antes de utilizá-los.
      </span>
    </div>
  )
}
