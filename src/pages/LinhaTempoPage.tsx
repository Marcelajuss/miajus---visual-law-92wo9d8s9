import React, { useState } from 'react'
import { salvarAcervoItem } from '@/lib/storage'
import { exportToPdf } from '@/lib/exportUtils'
import { MiaBubble } from '@/components/MiaCharacter'
import { LegalAIAviso } from '@/components/MiaJusLogo'
import { VoiceDictation } from '@/components/VoiceDictation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  GitCommit,
  Plus,
  Trash2,
  Save,
  Download,
  CheckCircle,
  Calendar,
  ArrowUp,
  ArrowDown,
} from 'lucide-react'

interface MarcoTemporal {
  id: string
  data: string
  titulo: string
  detalhes: string
  relevancia: 'fato' | 'dano' | 'notificacao' | 'prescricao'
}

export const LinhaTempoPage: React.FC = () => {
  const [titulo, setTitulo] = useState('Linha do Tempo Cronológica dos Fatos e Prescrição')
  const [mensagemSucesso, setMensagemSucesso] = useState<string | null>(null)

  const [marcos, setMarcos] = useState<MarcoTemporal[]>([
    {
      id: 'marco-1',
      data: '15/01/2020',
      titulo: 'Celebração do Contrato de Financiamento',
      detalhes: 'Assinatura digital sem entrega de cópia do instrumento e sem ciência do CET.',
      relevancia: 'fato',
    },
    {
      id: 'marco-2',
      data: '12/08/2022',
      titulo: 'Cobrança em Duplicidade da Parcela 18',
      detalhes: 'Débito automático efetuado duas vezes na mesma conta bancária do autor.',
      relevancia: 'dano',
    },
    {
      id: 'marco-3',
      data: '20/08/2022',
      titulo: 'Abertura de Protocolo no SAC Bancário',
      detalhes: 'Promessa de estorno no prazo de 48 horas não cumprida (Protocolo nº 9823471).',
      relevancia: 'notificacao',
    },
    {
      id: 'marco-4',
      data: '10/01/2025',
      titulo: 'Inscrição Indevida nos Órgãos Restritivos',
      detalhes: 'Inclusão do nome do consumidor no rol de inadimplentes do Serasa.',
      relevancia: 'dano',
    },
    {
      id: 'marco-5',
      data: '15/01/2025',
      titulo: 'Início da Fluência do Prazo Prescricional (Art. 206, CC)',
      detalhes: 'Ajuizamento tempestivo antes do término do prazo quinquenal.',
      relevancia: 'prescricao',
    },
  ])

  const [novaData, setNovaData] = useState('')
  const [novoTitulo, setNovoTitulo] = useState('')
  const [novosDetalhes, setNovosDetalhes] = useState('')
  const [novaRelevancia, setNovaRelevancia] = useState<
    'fato' | 'dano' | 'notificacao' | 'prescricao'
  >('fato')

  const adicionarMarco = () => {
    if (!novoTitulo.trim() || !novaData.trim()) return
    const novo: MarcoTemporal = {
      id: 'marco-' + Date.now(),
      data: novaData,
      titulo: novoTitulo,
      detalhes: novosDetalhes,
      relevancia: novaRelevancia,
    }
    setMarcos([...marcos, novo])
    setNovaData('')
    setNovoTitulo('')
    setNovosDetalhes('')
  }

  const removerMarco = (id: string) => {
    setMarcos(marcos.filter((m) => m.id !== id))
  }

  const moverMarco = (index: number, direcao: 'up' | 'down') => {
    const list = [...marcos]
    const target = direcao === 'up' ? index - 1 : index + 1
    if (target < 0 || target >= list.length) return
    const temp = list[index]
    list[index] = list[target]
    list[target] = temp
    setMarcos(list)
  }

  const handleSalvarAcervo = () => {
    const resumo = marcos
      .map((m) => `[${m.data}] ${m.titulo} (${m.relevancia.toUpperCase()}): ${m.detalhes}`)
      .join('\n')
    salvarAcervoItem({
      nome: titulo,
      tipo: 'linha_tempo',
      tipoFormatado: 'Linha do Tempo',
      conteudo: resumo,
    })
    setMensagemSucesso('Linha do Tempo salva no Meu Acervo!')
    setTimeout(() => setMensagemSucesso(null), 3500)
  }

  const badgeColor = (rel: string) => {
    switch (rel) {
      case 'dano':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'notificacao':
        return 'bg-[#F4EFF9] text-[#5D4E86] border-[#A88FBF]/40'
      case 'prescricao':
        return 'bg-[#F4EFF9] text-[#5D4E86] border-[#A88FBF]/50'
      default:
        return 'bg-pink-100 text-pink-800 border-pink-200'
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#8B6FB8] bg-[#F4EFF9] px-2 py-0.5 rounded border border-[#E3D9EE]">
            Ferramenta Visual
          </span>
          <h1 className="text-2xl font-serif font-bold text-slate-900 mt-1">Linha do Tempo</h1>
          <p className="text-xs text-slate-600">
            Organize marcos temporais, datas e prazos de prescrição de maneira visual e cronológica.
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
            onClick={() => exportToPdf(titulo, 'preview-timeline-box')}
            variant="outline"
            className="text-xs flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-[#8B6FB8]" />
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Painel Esquerdo */}
        <div className="lg:col-span-5 space-y-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <Label className="text-xs font-semibold text-slate-700">Título da Linha do Tempo</Label>
            <Input
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="text-xs mt-1"
            />
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Inserir Marco Temporal
            </h3>

            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs text-slate-600">Data ou Período</Label>
                  <Input
                    value={novaData}
                    onChange={(e) => setNovaData(e.target.value)}
                    placeholder="Ex.: 15/03/2024"
                    className="text-xs mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs text-slate-600">Categoria</Label>
                  <select
                    value={novaRelevancia}
                    onChange={(e) => setNovaRelevancia(e.target.value as any)}
                    className="w-full text-xs rounded-md border border-slate-200 p-2 mt-1 bg-white"
                  >
                    <option value="fato">Fato Fático</option>
                    <option value="dano">Ocorrência de Dano</option>
                    <option value="notificacao">Notificação / SAC</option>
                    <option value="prescricao">Marco Prescricional</option>
                  </select>
                </div>
              </div>

              <div>
                <Label className="text-xs text-slate-600">Título do Fato</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Input
                    value={novoTitulo}
                    onChange={(e) => setNovoTitulo(e.target.value)}
                    placeholder="Ex.: Reclamação no Procon"
                    className="text-xs"
                  />
                  <VoiceDictation onTranscript={(t) => setNovoTitulo(t)} />
                </div>
              </div>

              <div>
                <Label className="text-xs text-slate-600">Detalhes / Prova Documental</Label>
                <textarea
                  value={novosDetalhes}
                  onChange={(e) => setNovosDetalhes(e.target.value)}
                  placeholder="Referência ao documento anexo (Ex: Doc. 04)..."
                  rows={2}
                  className="w-full text-xs rounded-md border border-slate-200 p-2 text-slate-800"
                />
              </div>

              <Button
                onClick={adicionarMarco}
                className="w-full bg-grad-primario bg-grad-primario-hover text-white text-xs mt-1"
              >
                <Plus className="w-3.5 h-3.5 mr-1" />
                Adicionar Marco
              </Button>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Marcos Cadastrados ({marcos.length})
            </h3>
            <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
              {marcos.map((m, idx) => (
                <div
                  key={m.id}
                  className="p-2 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between text-xs"
                >
                  <div className="min-w-0 flex-1">
                    <span className="font-mono text-[11px] font-bold text-slate-600 mr-2">
                      {m.data}
                    </span>
                    <span className="font-semibold text-slate-900 truncate">{m.titulo}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => moverMarco(idx, 'up')}
                      className="p-1 text-slate-400 hover:text-slate-800 disabled:opacity-20"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === marcos.length - 1}
                      onClick={() => moverMarco(idx, 'down')}
                      className="p-1 text-slate-400 hover:text-slate-800 disabled:opacity-20"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removerMarco(m.id)}
                      className="p-1 text-slate-400 hover:text-red-600"
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
            message="Demonstrar graficamente a data do conhecimento do fato e a data da distribuição elimina dúvidas do juízo quanto à decadência ou prescrição."
          />
        </div>

        {/* Painel Direito: Preview da Linha do Tempo */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Pré-Visualização Cronológica
            </span>
            <span className="text-[11px] text-slate-400">Disposição Visual Vertical A4</span>
          </div>

          <div
            id="preview-timeline-box"
            className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-6"
          >
            <div className="border-b border-slate-100 pb-3 text-center">
              <h2 className="text-lg font-serif font-bold text-slate-900">{titulo}</h2>
              <p className="text-xs text-slate-500">
                Quadro de sucessão temporal dos acontecimentos
              </p>
            </div>

            <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {marcos.map((marco) => (
                <div key={marco.id} className="relative group">
                  <div className="absolute -left-6 sm:-left-8 top-1 w-3 h-3 rounded-full bg-[#8B6FB8] ring-4 ring-white" />
                  <div className="bg-[#F4EFF9]/60 p-3.5 rounded-xl border border-[#E3D9EE] space-y-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-xs font-bold text-[#5D4E86] bg-[#F4EFF9] px-2 py-0.5 rounded">
                        {marco.data}
                      </span>
                      <span
                        className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${badgeColor(marco.relevancia)}`}
                      >
                        {marco.relevancia}
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 pt-0.5">
                      {marco.titulo}
                    </h4>
                    {marco.detalhes && (
                      <p className="text-xs text-slate-600 leading-relaxed">{marco.detalhes}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
              <span>MiaJus - Visual Law</span>
              <span>{marcos.length} marcos demonstrados</span>
            </div>
          </div>
        </div>
      </div>

      <LegalAIAviso />
    </div>
  )
}
