import React, { useState, useEffect } from 'react'
import { getAgenda, salvarCompromisso, excluirCompromisso, CompromissoItem } from '@/lib/storage'
import { MiaBubble } from '@/components/MiaCharacter'
import { LegalAIAviso } from '@/components/MiaJusLogo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  CalendarDays,
  Plus,
  Trash2,
  Clock,
  AlertCircle,
  CheckCircle,
  Filter,
  Calendar as CalendarIcon,
} from 'lucide-react'

export const AgendaPage: React.FC = () => {
  const [compromissos, setCompromissos] = useState<CompromissoItem[]>([])
  const [visao, setVisao] = useState<'mes' | 'semana' | 'dia'>('mes')
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todas')

  // Novo compromisso
  const [titulo, setTitulo] = useState('')
  const [data, setData] = useState(new Date().toISOString().split('T')[0])
  const [horario, setHorario] = useState('14:00')
  const [categoria, setCategoria] = useState<CompromissoItem['categoria']>('Prazo Fatal')
  const [lembrete, setLembrete] = useState('')
  const [processo, setProcesso] = useState('')
  const [mensagem, setMensagem] = useState<string | null>(null)

  const carregarAgenda = () => {
    setCompromissos(getAgenda())
  }

  useEffect(() => {
    carregarAgenda()
  }, [])

  const handleAdicionar = () => {
    if (!titulo.trim() || !data.trim()) return

    const corMap = {
      'Prazo Fatal': '#EC4899',
      Audiência: '#8B6FB8',
      Reunião: '#A88FBF',
      Diligência: '#C9A8E0',
      Protocolo: '#5D4E86',
    }

    salvarCompromisso({
      titulo,
      data,
      horario,
      categoria,
      cor: corMap[categoria],
      lembrete: lembrete || 'Sem lembrete adicional',
      processo: processo || 'Não vinculado',
    })

    setTitulo('')
    setLembrete('')
    setProcesso('')
    setMensagem('Compromisso registrado na agenda!')
    setTimeout(() => setMensagem(null), 3000)
    carregarAgenda()
  }

  const handleExcluir = (id: string) => {
    excluirCompromisso(id)
    carregarAgenda()
  }

  const filtrados = compromissos.filter((c) => {
    return filtroCategoria === 'todas' || c.categoria === filtroCategoria
  })

  // Ordenar por data crescente
  filtrados.sort((a, b) => a.data.localeCompare(b.data))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
            Controle de Prazos e Compromissos
          </span>
          <h1 className="text-2xl font-serif font-bold text-slate-900 mt-1">
            Agenda e Calendário Inteligente
          </h1>
          <p className="text-xs text-slate-600">
            Acompanhamento de prazos fatais, audiências virtuais, reuniões e diligências com visão
            diária, semanal e mensal.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
          <button
            type="button"
            onClick={() => setVisao('dia')}
            className={`px-3 py-1 rounded-md font-medium transition-all ${
              visao === 'dia' ? 'bg-white shadow text-slate-900 font-bold' : 'text-slate-600'
            }`}
          >
            Diário
          </button>
          <button
            type="button"
            onClick={() => setVisao('semana')}
            className={`px-3 py-1 rounded-md font-medium transition-all ${
              visao === 'semana' ? 'bg-white shadow text-slate-900 font-bold' : 'text-slate-600'
            }`}
          >
            Semanal
          </button>
          <button
            type="button"
            onClick={() => setVisao('mes')}
            className={`px-3 py-1 rounded-md font-medium transition-all ${
              visao === 'mes' ? 'bg-white shadow text-slate-900 font-bold' : 'text-slate-600'
            }`}
          >
            Mensal
          </button>
        </div>
      </div>

      {mensagem && (
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#F4EFF9] border border-[#A88FBF]/40 text-[#3E3359] text-xs font-medium animate-fade-in">
          <CheckCircle className="w-4 h-4 text-[#EC4899]" />
          <span>{mensagem}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Painel Esquerdo: Cadastro de Compromisso */}
        <div className="lg:col-span-4 space-y-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 pb-2 border-b border-slate-100">
            Novo Compromisso / Prazo
          </h3>

          <div className="space-y-2.5">
            <div>
              <Label className="text-xs text-slate-600">Título do Compromisso</Label>
              <Input
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ex.: Prazo Fatal: Agravo de Instrumento"
                className="text-xs mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs text-slate-600">Data</Label>
                <Input
                  type="date"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  className="text-xs mt-1"
                />
              </div>
              <div>
                <Label className="text-xs text-slate-600">Horário</Label>
                <Input
                  type="time"
                  value={horario}
                  onChange={(e) => setHorario(e.target.value)}
                  className="text-xs mt-1"
                />
              </div>
            </div>

            <div>
              <Label className="text-xs text-slate-600">Categoria</Label>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value as any)}
                className="w-full text-xs rounded-md border border-slate-200 p-2 mt-1 bg-white"
              >
                <option value="Prazo Fatal">Prazo Fatal (Rosa)</option>
                <option value="Audiência">Audiência (Lilás)</option>
                <option value="Reunião">Reunião (Lilás Claro)</option>
                <option value="Diligência">Diligência (Lilás Suave)</option>
                <option value="Protocolo">Protocolo (Lilás Escuro)</option>
              </select>
            </div>

            <div>
              <Label className="text-xs text-slate-600">Processo / Cliente Vinculado</Label>
              <Input
                value={processo}
                onChange={(e) => setProcesso(e.target.value)}
                placeholder="Ex.: Proc. 1029384-55.2024.8.26.0100"
                className="text-xs mt-1"
              />
            </div>

            <div>
              <Label className="text-xs text-slate-600">Lembrete / Instrução Prévia</Label>
              <Input
                value={lembrete}
                onChange={(e) => setLembrete(e.target.value)}
                placeholder="Ex.: Juntar procuração e guias recolhidas"
                className="text-xs mt-1"
              />
            </div>

            <Button onClick={handleAdicionar} className="w-full text-xs mt-1">
              <Plus className="w-3.5 h-3.5 mr-1" />
              Adicionar à Agenda
            </Button>
          </div>

          <MiaBubble
            size="sm"
            message="Organize seus prazos fatais com antecedência mínima de 48 horas para permitir a revisão visual da peça antes do protocolo."
          />
        </div>

        {/* Painel Direito: Lista e Linha do Tempo da Agenda */}
        <div className="lg:col-span-8 space-y-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-slate-700" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Compromissos Agendados ({filtrados.length})
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
                className="text-xs rounded-md border border-slate-200 p-1.5 bg-white"
              >
                <option value="todas">Todas as Categorias</option>
                <option value="Prazo Fatal">Prazos Fatais</option>
                <option value="Audiência">Audiências</option>
                <option value="Reunião">Reuniões</option>
                <option value="Diligência">Diligências</option>
                <option value="Protocolo">Protocolos</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            {filtrados.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                Nenhum compromisso agendado para o filtro selecionado.
              </div>
            ) : (
              filtrados.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-start justify-between gap-3 text-xs"
                >
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-wider"
                        style={{ backgroundColor: item.cor }}
                      >
                        {item.categoria}
                      </span>
                      <span className="font-mono text-slate-600 font-bold">
                        {item.data} às {item.horario}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900">{item.titulo}</h4>

                    {item.processo && (
                      <p className="text-slate-600 text-[11px]">
                        <strong>Referência:</strong> {item.processo}
                      </p>
                    )}

                    {item.lembrete && (
                      <p className="text-slate-500 text-[11px] italic">
                        <strong>Lembrete:</strong> {item.lembrete}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleExcluir(item.id)}
                    className="p-1 text-slate-400 hover:text-red-600"
                    title="Excluir da agenda"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <LegalAIAviso />
    </div>
  )
}
