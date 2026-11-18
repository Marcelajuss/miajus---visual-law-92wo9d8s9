import React, { useState } from 'react'
import { MiaBubble } from '@/components/MiaCharacter'
import { LegalAIAviso } from '@/components/MiaJusLogo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Scale,
  Gavel,
  FileText,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Building2,
  CheckCircle2,
  Download,
  Search,
  BookMarked,
  FolderLock,
  Lock,
  Stamp,
  Users,
  Briefcase,
  HelpCircle,
  Copy,
  Check,
} from 'lucide-react'

interface IconItem {
  id: string
  nome: string
  categoria: 'processual' | 'prazos' | 'seguranca' | 'contratos' | 'institucional'
  tags: string[]
  component: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  svgString: string
}

export const AcervoIconesPage: React.FC = () => {
  const [busca, setBusca] = useState('')
  const [categoria, setCategoria] = useState<string>('todas')
  const [cor, setCor] = useState('#1E3A8A')
  const [tamanho, setTamanho] = useState(48)
  const [strokeWidth, setStrokeWidth] = useState(2)
  const [copiadoId, setCopiadoId] = useState<string | null>(null)

  const ICONES: IconItem[] = [
    {
      id: 'balanca',
      nome: 'Balança da Justiça',
      categoria: 'processual',
      tags: ['justiça', 'direito', 'igualdade', 'processo'],
      component: Scale,
      svgString: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="${cor}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>`,
    },
    {
      id: 'martelo',
      nome: 'Martelo Judiciário (Gavel)',
      categoria: 'processual',
      tags: ['decisão', 'sentença', 'juiz', 'acórdão'],
      component: Gavel,
      svgString: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="${cor}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"><path d="m14.5 12.5-8 8a2.12 2.12 0 1 1-3-3l8-8"/><path d="m16 16 6-6"/><path d="m8 8 6-6"/><path d="m9 7 8 8"/><path d="m21 11-8-8"/></svg>`,
    },
    {
      id: 'peticao',
      nome: 'Petição / Contrato Formal',
      categoria: 'contratos',
      tags: ['peça', 'petição', 'documento', 'termo'],
      component: FileText,
      svgString: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="${cor}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>`,
    },
    {
      id: 'alerta',
      nome: 'Aviso de Urgência / Risco',
      categoria: 'processual',
      tags: ['urgência', 'tutela', 'atenção', 'risco'],
      component: AlertTriangle,
      svgString: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="${cor}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
    },
    {
      id: 'prazo',
      nome: 'Prazo Fatal / Cronômetro',
      categoria: 'prazos',
      tags: ['prazo', 'tempestividade', 'tempo', 'calendário'],
      component: Clock,
      svgString: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="${cor}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    },
    {
      id: 'conformidade',
      nome: 'Conformidade / Escudo Legal',
      categoria: 'seguranca',
      tags: ['lgpd', 'compliance', 'segurança', 'proteção'],
      component: ShieldCheck,
      svgString: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="${cor}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>`,
    },
    {
      id: 'tribunal',
      nome: 'Tribunal / Fórum Judiciário',
      categoria: 'institucional',
      tags: ['fórum', 'tribunal', 'comarca', 'vara'],
      component: Building2,
      svgString: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="${cor}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>`,
    },
    {
      id: 'assinatura',
      nome: 'Chave de Autenticação Digital',
      categoria: 'seguranca',
      tags: ['certificado', 'assinatura', 'segurança', 'validade'],
      component: Stamp,
      svgString: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="${cor}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"><path d="M5 22h14"/><path d="M19.27 13.73A2.5 2.5 0 0 0 17.5 13h-11A2.5 2.5 0 0 0 4 15.5V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1.5c0-.66-.26-1.3-.73-1.77Z"/><path d="M14 13V8.5C14 7.12 12.88 6 11.5 6S9 7.12 9 8.5V13"/></svg>`,
    },
    {
      id: 'advogados',
      nome: 'Partes / Litigantes',
      categoria: 'institucional',
      tags: ['partes', 'autor', 'réu', 'sociedade'],
      component: Users,
      svgString: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="${cor}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    },
    {
      id: 'honorarios',
      nome: 'Honorários / Atividade Profissional',
      categoria: 'contratos',
      tags: ['honorários', 'escritório', 'patrocínio', 'gestão'],
      component: Briefcase,
      svgString: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="${cor}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
    },
  ]

  const filtrados = ICONES.filter((item) => {
    const matchCat = categoria === 'todas' || item.categoria === categoria
    const matchBusca =
      !busca.trim() ||
      item.nome.toLowerCase().includes(busca.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(busca.toLowerCase()))
    return matchCat && matchBusca
  })

  const baixarSvg = (icone: IconItem) => {
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${tamanho}" height="${tamanho}" viewBox="0 0 24 24" fill="none" stroke="${cor}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">${icone.svgString.match(/<svg[^>]*>([\s\S]*?)<\/svg>/)?.[1] || ''}</svg>`
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `icone_${icone.id}.svg`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const baixarPng = (icone: IconItem) => {
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${tamanho * 2}" height="${tamanho * 2}" viewBox="0 0 24 24" fill="none" stroke="${cor}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">${icone.svgString.match(/<svg[^>]*>([\s\S]*?)<\/svg>/)?.[1] || ''}</svg>`
    const img = new Image()
    const svgBlob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(svgBlob)

    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = tamanho * 2
      canvas.height = tamanho * 2
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(img, 0, 0)
        const pngUrl = canvas.toDataURL('image/png')
        const a = document.createElement('a')
        a.href = pngUrl
        a.download = `icone_${icone.id}.png`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      }
      URL.revokeObjectURL(url)
    }
    img.src = url
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
            Biblioteca Visual
          </span>
          <h1 className="text-2xl font-serif font-bold text-slate-900 mt-1">Acervo de Ícones</h1>
          <p className="text-xs text-slate-600">
            Ícones jurídicos vetorizados com ajuste dinâmico de cor, tamanho, espessura e download
            em PNG e SVG.
          </p>
        </div>

        <div className="text-xs text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
          {filtrados.length} ícones disponíveis
        </div>
      </div>

      {/* Controles de Estilo Global e Filtros */}
      <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div>
            <Label className="text-xs font-semibold text-slate-700">Pesquisar Ícone</Label>
            <div className="relative mt-1">
              <Search className="w-4 h-4 absolute left-2.5 top-2.5 text-slate-400" />
              <Input
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Ex.: balança, juiz, prazo..."
                className="pl-8 text-xs"
              />
            </div>
          </div>

          <div>
            <Label className="text-xs font-semibold text-slate-700">Categoria</Label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full text-xs rounded-md border border-slate-200 p-2 mt-1 bg-white"
            >
              <option value="todas">Todas as Categorias</option>
              <option value="processual">Processual / Julgamento</option>
              <option value="prazos">Prazos e Urgências</option>
              <option value="seguranca">Segurança e LGPD</option>
              <option value="contratos">Contratos e Peças</option>
              <option value="institucional">Institucional</option>
            </select>
          </div>

          <div>
            <Label className="text-xs font-semibold text-slate-700">Cor do Traço</Label>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="color"
                value={cor}
                onChange={(e) => setCor(e.target.value)}
                className="w-8 h-8 rounded border border-slate-200 cursor-pointer p-0"
              />
              <span className="text-xs font-mono text-slate-600 uppercase">{cor}</span>
            </div>
          </div>

          <div>
            <Label className="text-xs font-semibold text-slate-700">
              Tamanho do Ícone: {tamanho}px
            </Label>
            <input
              type="range"
              min="24"
              max="96"
              step="4"
              value={tamanho}
              onChange={(e) => setTamanho(Number(e.target.value))}
              className="w-full mt-2 accent-slate-900 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Grade de Ícones */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filtrados.map((item) => {
          const Comp = item.component
          return (
            <div
              key={item.id}
              className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 shadow-sm flex flex-col items-center justify-between text-center space-y-3 transition-all"
            >
              <div
                className="flex items-center justify-center p-3 rounded-xl bg-slate-50 border border-slate-100 w-full"
                style={{ minHeight: '90px' }}
              >
                <Comp
                  style={{
                    width: tamanho,
                    height: tamanho,
                    color: cor,
                    strokeWidth: strokeWidth,
                  }}
                />
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 truncate max-w-[140px]">
                  {item.nome}
                </h4>
                <p className="text-[10px] text-slate-400 capitalize">{item.categoria}</p>
              </div>

              <div className="grid grid-cols-2 gap-1.5 w-full pt-1">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => baixarPng(item)}
                  className="text-[10px] h-7 px-1 w-full border-slate-200"
                >
                  PNG
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => baixarSvg(item)}
                  className="text-[10px] h-7 px-1 w-full border-slate-200 text-blue-700"
                >
                  SVG
                </Button>
              </div>
            </div>
          )
        })}
      </div>

      <MiaBubble
        size="sm"
        message="A aplicação moderada de ícones em títulos e seções de peças em Visual Law guia os olhos do leitor sem sobrecarregar o aspecto solene do documento."
      />

      <LegalAIAviso />
    </div>
  )
}
