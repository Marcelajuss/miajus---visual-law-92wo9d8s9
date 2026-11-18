// Pilha oficial de fontes da plataforma MiaJus - Visual Law
const FONTE_OFICIAL =
  "Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { salvarAcervoItem } from '@/lib/storage'
import { exportToDocx, exportToPdf } from '@/lib/exportUtils'
import { MiaBubble } from '@/components/MiaCharacter'
import { LegalAIAviso } from '@/components/MiaJusLogo'
import { VoiceDictation } from '@/components/VoiceDictation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Workflow,
  Plus,
  Trash2,
  ArrowDown,
  ArrowUp,
  Save,
  Download,
  Share2,
  CheckCircle,
  FileCode,
} from 'lucide-react'

interface FluxoStep {
  id: string
  titulo: string
  descricao: string
  tipo: 'inicio' | 'etapa' | 'decisao' | 'fim'
  cor: string
}

export const FluxogramaPage: React.FC = () => {
  const navigate = useNavigate()
  const [titulo, setTitulo] = useState('Fluxograma de Cobrança Extrajudicial e Execução')
  const [mensagemSucesso, setMensagemSucesso] = useState<string | null>(null)

  const [etapas, setEtapas] = useState<FluxoStep[]>([
    {
      id: 'step-1',
      titulo: '1. Notificação Extrajudicial com Prazo de 5 Dias',
      descricao: 'Envio por AR digital ou WhatsApp corporativo com aviso de recebimento.',
      tipo: 'inicio',
      cor: '#8B6FB8',
    },
    {
      id: 'step-2',
      titulo: '2. Houve Proposta de Acordo no Prazo?',
      descricao: 'Análise de parcelamento ou pagamento com quitação com desconto autorizado.',
      tipo: 'decisao',
      cor: '#D97706',
    },
    {
      id: 'step-3',
      titulo: '3. Envio da Minuta de Termo de Confissão de Dívida',
      descricao: 'Formalização de título executivo extrajudicial com assinatura digital.',
      tipo: 'etapa',
      cor: '#059669',
    },
    {
      id: 'step-4',
      titulo: '4. Distribuição da Ação de Execução de Título Extrajudicial',
      descricao: 'Inclusão de pedido de penhora online de ativos via SISBAJUD.',
      tipo: 'fim',
      cor: '#DC2626',
    },
  ])

  const [novoTitulo, setNovoTitulo] = useState('')
  const [novaDescricao, setNovaDescricao] = useState('')
  const [novoTipo, setNovoTipo] = useState<'inicio' | 'etapa' | 'decisao' | 'fim'>('etapa')

  const adicionarEtapa = () => {
    if (!novoTitulo.trim()) return
    const corMap = {
      inicio: '#8B6FB8',
      etapa: '#059669',
      decisao: '#D97706',
      fim: '#DC2626',
    }
    const nova: FluxoStep = {
      id: 'step-' + Date.now(),
      titulo: novoTitulo,
      descricao: novaDescricao,
      tipo: novoTipo,
      cor: corMap[novoTipo],
    }
    setEtapas([...etapas, nova])
    setNovoTitulo('')
    setNovaDescricao('')
  }

  const moverEtapa = (index: number, direcao: 'up' | 'down') => {
    const novo = [...etapas]
    const target = direcao === 'up' ? index - 1 : index + 1
    if (target < 0 || target >= novo.length) return
    const temp = novo[index]
    novo[index] = novo[target]
    novo[target] = temp
    setEtapas(novo)
  }

  const removerEtapa = (id: string) => {
    setEtapas(etapas.filter((e) => e.id !== id))
  }

  const handleSalvarAcervo = () => {
    const textoResumo = etapas
      .map((e, idx) => `${idx + 1}. [${e.tipo.toUpperCase()}] ${e.titulo}: ${e.descricao}`)
      .join('\n')
    salvarAcervoItem({
      nome: titulo,
      tipo: 'fluxograma',
      tipoFormatado: 'Fluxograma',
      conteudo: textoResumo,
    })
    setMensagemSucesso('Fluxograma salvo no Meu Acervo com sucesso!')
    setTimeout(() => setMensagemSucesso(null), 3500)
  }

  const handleExportSvg = () => {
    const el = document.getElementById('preview-fluxograma-svg')
    if (!el) return
    const svgContent = el.outerHTML
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `fluxograma_${Date.now()}.svg`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#8B6FB8] bg-[#F4EFF9] px-2 py-0.5 rounded border border-[#E3D9EE]">
            Ferramenta Visual
          </span>
          <h1 className="text-2xl font-serif font-bold text-slate-900 mt-1">Fluxograma</h1>
          <p className="text-xs text-slate-600">
            Estruture etapas processuais, decisões e fluxos com reordenação e exportação visual para
            suas petições.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            onClick={handleSalvarAcervo}
            className="botao-acesso-rosa text-xs flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Salvar no Meu Acervo</span>
          </Button>

          <Button
            onClick={handleExportSvg}
            variant="outline"
            className="text-xs flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-[#8B6FB8]" />
            <span>Exportar SVG</span>
          </Button>

          <Button
            onClick={() => exportToPdf(titulo, 'preview-fluxo-box')}
            variant="outline"
            className="text-xs flex items-center gap-1.5"
          >
            <FileCode className="w-3.5 h-3.5 text-[#8B6FB8]" />
            <span>Imprimir / PDF</span>
          </Button>
        </div>
      </div>

      {mensagemSucesso && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-[#F4EFF9] border border-[#A88FBF]/40 text-[#3E3359] text-xs font-medium animate-fade-in">
          <CheckCircle className="w-4 h-4 text-[#8B6FB8]" />
          <span>{mensagemSucesso}</span>
        </div>
      )}

      {/* Dois Painéis: Editor à esquerda, Pré-visualização à direita */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Painel Esquerdo: Lista de Etapas e Cadastro */}
        <div className="lg:col-span-5 space-y-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <Label className="text-xs font-semibold text-slate-700">Título do Fluxograma</Label>
            <Input
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="text-xs mt-1"
            />
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Adicionar Nova Etapa
            </h3>

            <div className="space-y-2">
              <div>
                <Label className="text-xs text-slate-600">Título da Etapa</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Input
                    value={novoTitulo}
                    onChange={(e) => setNovoTitulo(e.target.value)}
                    placeholder="Ex.: Tentativa de Conciliação Prévia"
                    className="text-xs"
                  />
                  <VoiceDictation onTranscript={(t) => setNovoTitulo(t)} />
                </div>
              </div>

              <div>
                <Label className="text-xs text-slate-600">Descrição / Instrução</Label>
                <textarea
                  value={novaDescricao}
                  onChange={(e) => setNovaDescricao(e.target.value)}
                  placeholder="Detalhes ou consequências da etapa..."
                  rows={2}
                  className="w-full text-xs rounded-md border border-slate-200 p-2 text-slate-800"
                />
              </div>

              <div>
                <Label className="text-xs text-slate-600">Tipo de Etapa</Label>
                <select
                  value={novoTipo}
                  onChange={(e) => setNovoTipo(e.target.value as any)}
                  className="w-full text-xs rounded-md border border-slate-200 p-2 mt-1 bg-white"
                >
                  <option value="inicio">Início / Fato Gerador (Lilás)</option>
                  <option value="etapa">Procedimento / Diligência (Verde)</option>
                  <option value="decisao">Decisão / Condicional (Âmbar)</option>
                  <option value="fim">Conclusão / Medida Judicial (Vermelho)</option>
                </select>
              </div>

              <Button onClick={adicionarEtapa} className="w-full text-xs mt-1">
                <Plus className="w-3.5 h-3.5 mr-1" />
                Adicionar Etapa
              </Button>
            </div>
          </div>

          {/* Lista e Reordenação */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Etapas Configuradas ({etapas.length})
            </h3>

            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {etapas.map((etapa, idx) => (
                <div
                  key={etapa.id}
                  className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 flex items-start justify-between gap-2 text-xs"
                >
                  <div className="flex-1 min-w-0">
                    <span
                      className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold text-white mb-1"
                      style={{ backgroundColor: etapa.cor }}
                    >
                      {etapa.tipo.toUpperCase()}
                    </span>
                    <p className="font-semibold text-slate-900 truncate">{etapa.titulo}</p>
                    <p className="text-slate-500 text-[11px] line-clamp-1">{etapa.descricao}</p>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => moverEtapa(idx, 'up')}
                      className="p-1 text-slate-500 hover:text-slate-900 disabled:opacity-30"
                      title="Mover para cima"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === etapas.length - 1}
                      onClick={() => moverEtapa(idx, 'down')}
                      className="p-1 text-slate-500 hover:text-slate-900 disabled:opacity-30"
                      title="Mover para baixo"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removerEtapa(etapa.id)}
                      className="p-1 text-slate-400 hover:text-red-600"
                      title="Excluir"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <MiaBubble
            size="sm"
            message="Fluxogramas com caixas de decisão condicionais deixam cristalino para o juiz que o autor esgotou os meios amigáveis antes de ajuizar."
          />
        </div>

        {/* Painel Direito: Pré-Visualização Visual do Fluxograma */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Pré-Visualização do Fluxograma
            </span>
            <span className="text-[11px] text-slate-400">Diagramação Dinâmica Visual Law</span>
          </div>

          <div
            id="preview-fluxo-box"
            className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-6"
          >
            <div className="text-center pb-3 border-b border-slate-100">
              <h2 className="text-lg font-serif font-bold text-slate-900">{titulo}</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Diagrama de fluxo processual e procedimental
              </p>
            </div>

            {/* Container do diagrama SVG interativo */}
            <div className="flex flex-col items-center space-y-3 py-2">
              {etapas.map((etapa, idx) => (
                <React.Fragment key={etapa.id}>
                  <div
                    className="w-full max-w-md p-4 rounded-xl border-2 text-center shadow-sm transition-all"
                    style={{
                      borderColor: etapa.cor,
                      backgroundColor: `${etapa.cor}0D`,
                    }}
                  >
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded text-white"
                      style={{ backgroundColor: etapa.cor }}
                    >
                      {etapa.tipo === 'decisao' ? 'Condição / Decisão' : etapa.tipo.toUpperCase()}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-1.5">{etapa.titulo}</h4>
                    {etapa.descricao && (
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {etapa.descricao}
                      </p>
                    )}
                  </div>

                  {idx < etapas.length - 1 && (
                    <div className="flex flex-col items-center my-0.5 text-slate-400">
                      <div className="w-0.5 h-4 bg-slate-300" />
                      <ArrowDown className="w-4 h-4 text-slate-500" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Hidden SVG para exportação limpa */}
            <svg
              id="preview-fluxograma-svg"
              className="hidden"
              xmlns="http://www.w3.org/2000/svg"
              width="600"
              height={etapas.length * 110 + 60}
              viewBox={`0 0 600 ${etapas.length * 110 + 60}`}
            >
              <rect width="100%" height="100%" fill="#ffffff" />
              <text
                x="300"
                y="30"
                textAnchor="middle"
                fontFamily={FONTE_OFICIAL}
                fontSize="16"
                fontWeight="bold"
                fill="#0f172a"
              >
                {titulo}
              </text>
              {etapas.map((etapa, idx) => {
                const y = 50 + idx * 105
                return (
                  <g key={etapa.id}>
                    <rect
                      x="80"
                      y={y}
                      width="440"
                      height="70"
                      rx="8"
                      fill="#f8fafc"
                      stroke={etapa.cor}
                      strokeWidth="2"
                    />
                    <text
                      x="300"
                      y={y + 28}
                      textAnchor="middle"
                      fontFamily={FONTE_OFICIAL}
                      fontSize="13"
                      fontWeight="bold"
                      fill="#0f172a"
                    >
                      {etapa.titulo}
                    </text>
                    <text
                      x="300"
                      y={y + 48}
                      textAnchor="middle"
                      fontFamily={FONTE_OFICIAL}
                      fontSize="11"
                      fill="#475569"
                    >
                      {etapa.descricao.substring(0, 55)}
                    </text>
                  </g>
                )
              })}
            </svg>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>MiaJus - Visual Law</span>
              <span>Total de {etapas.length} etapas registradas</span>
            </div>
          </div>
        </div>
      </div>

      <LegalAIAviso />
    </div>
  )
}
