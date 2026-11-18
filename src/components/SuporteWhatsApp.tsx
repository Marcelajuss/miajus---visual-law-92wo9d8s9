import React from 'react'
import { cn } from '@/lib/utils'

/**
 * Ícone oficial do WhatsApp (glifo simples, traço contínuo) da identidade MiaJus.
 * Herda a cor do texto do elemento pai (currentColor) — usado sempre em rosa
 * var(--iris-pink), conforme pedido da usuária ("símbolos em rosa").
 */
export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn('w-4 h-4', className)}
    aria-hidden="true"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    <path d="M9.2 8.2c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .5.4l.7 1.7c.1.2 0 .4-.1.5l-.4.5c-.1.2-.2.3-.1.5.4.8 1.2 1.6 2.1 2 .2.1.4.1.5-.1l.5-.5c.2-.2.3-.2.5-.1l1.7.8c.3.1.4.3.4.5 0 .6-.4 1.3-1 1.5-.5.2-1.1.2-1.7 0a9 9 0 0 1-4.4-3.7c-.4-.7-.7-1.5-.6-2.2 0-.4.2-.9.4-1.3z" />
  </svg>
)

interface SuporteWhatsAppProps {
  className?: string
  /** Tamanho do texto/ícone: "sm" (rodapé) ou "md" (páginas). */
  size?: 'sm' | 'md'
}

/**
 * Link de Suporte por WhatsApp no formato do print enviado pela usuária:
 * ícone do WhatsApp ao lado do texto "Suporte" — porém em ROSA
 * var(--iris-pink) (não verde), com contorno lilás #A88FBF visível.
 */
export const SuporteWhatsApp: React.FC<SuporteWhatsAppProps> = ({ className, size = 'md' }) => {
  return (
    <a
      href="https://wa.me/5511999999999"
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center gap-1.5 font-semibold rounded-lg border border-[#A88FBF] bg-white px-2.5 py-1 transition-colors hover:bg-[#F4EFF9]',
        size === 'sm' ? 'text-xs' : 'text-sm',
        className,
      )}
      style={{ color: 'var(--iris-pink)' }}
      aria-label="Suporte por WhatsApp"
    >
      <WhatsAppIcon className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
      <span>Suporte</span>
    </a>
  )
}
