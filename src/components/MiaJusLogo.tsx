import React from 'react'
import { Link } from 'react-router-dom'

interface MiaJusLogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  linkToHome?: boolean
}

/**
 * Logotipo exclusivamente tipográfico "MiaJus - Visual Law", sem símbolos,
 * com identidade própria clara, minimalista e jurídica.
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

  const content = (
    <div className={`inline-flex flex-col select-none leading-none ${className}`}>
      <div className={`font-bold text-slate-900 ${sizeClasses[size]} flex items-baseline gap-1`}>
        <span className="font-semibold tracking-normal text-slate-900">Mia</span>
        <span className="font-bold text-slate-800">Jus</span>
        <span className="font-light text-slate-400 mx-1">—</span>
        <span className="font-sans font-medium text-slate-600 uppercase text-[0.72em] tracking-wider">
          Visual Law
        </span>
      </div>
      <span
        className={`font-sans uppercase text-slate-400 font-semibold mt-1 ${subtitleClasses[size]}`}
      >
        Plataforma Jurídica Estruturada
      </span>
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
