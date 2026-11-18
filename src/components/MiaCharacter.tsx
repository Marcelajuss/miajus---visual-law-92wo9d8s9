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
 *
 * A ilustração traz o fundo lilás arredondado no PRÓPRIO arquivo (estilo app icon),
 * mas esse lilás vem com bordas irregulares na origem — quando a imagem era exibida
 * como <img> com rounded, essas bordas tortas apareciam (relato da usuária).
 *
 * Correção: a imagem é renderizada dentro de um CONTÊINER com cantos arredondados
 * uniformes (rounded-[22%], o mesmo formato app icon), overflow-hidden e um fundo
 * lilás uniforme (#D8C6EE, o lilás claro aprovado da paleta) atrás dela. A imagem
 * é ampliada ~12% (scale 1.12) para que a borda irregular do arquivo fique sempre
 * FORA do contêiner — o que se vê é o lilás liso do interior da ilustração e,
 * onde eventualmente sobra, o lilás uniforme do fundo do contêiner.
 *
 * A avatar continua exibida INTEIRA e nos MESMOS tamanhos ampliados da v0.0.8
 * (o texto do cartaz "Formatação inteligente e Petições que geram resultados"
 * segue legível): o recorte acontece só na franja da borda, não no conteúdo.
 */
export const MiaCharacter: React.FC<MiaAvatarProps> = ({ size = 'md', className = '' }) => {
  const px = sizePx[size]

  // Qualquer rounded-* recebido de fora é descartado: o formato uniforme do
  // contêiner é quem garante bordas regulares em todos os usos da avatar.
  const classesExternas = className.replace(/\brounded(?:-[^\s]+)?/g, '').trim()

  return (
    <div
      role="img"
      aria-label="Mia - Assistente MiaJus"
      draggable={false}
      className={`inline-block flex-shrink-0 select-none overflow-hidden rounded-[22%] ${classesExternas}`}
      style={{ width: px, height: px, backgroundColor: '#D8C6EE' }}
    >
      <img
        src={miaAvatar}
        alt=""
        aria-hidden="true"
        draggable={false}
        className="block"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          transform: 'scale(1.12)',
          transformOrigin: 'center',
        }}
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
