import React, { useState, useEffect } from 'react'
import { getNotas, salvarNota, excluirNota, NotaItem } from '@/lib/storage'
import { MiaBubble } from '@/components/MiaCharacter'
import { LegalAIAviso } from '@/components/MiaJusLogo'
import { VoiceDictation } from '@/components/VoiceDictation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  StickyNote,
  Plus,
  Trash2,
  Search,
  CheckCircle,
  Paperclip,
  Palette,
  FileText,
} from 'lucide-react'

export const BlocoNotasPage: React.FC = () => {
  const [notas, setNotas] = useState<NotaItem[]>([])
  const [busca, setBusca] = useState('')
  const [notaSelecionada, setNotaSelecionada] = useState<NotaItem | null>(null)

  // Campos de edição
  const [titulo, setTitulo] = useState('')
  const [texto, setTexto] = useState('')
  const [assunto, setAssunto] = useState('Geral')
  const [cor, setCor] = useState('#EFF6FF')
  const [mensagem, setMensagem] = useState<string | null>(null)

  const carregarNotas = () => {
    const list = getNotas()
    setNotas(list)
    if (!notaSelecionada && list.length > 0) {
      selecionarNota(list[0])
    }
  }

  useEffect(() => {
    carregarNotas()
  }, [])

  const selecionarNota = (n: NotaItem) => {
    setNotaSelecionada(n)
    setTitulo(n.titulo)
    setTexto(n.texto)
    setAssunto(n.assunto)
    setCor(n.cor || '#EFF6FF')
  }

  const handleCriarNova = () => {
    const nova: NotaItem = {
      id: 'nota-' + Date.now(),
      titulo: 'Nova Anotação Jurídica',
      texto: 'Escreva aqui teses, apontamentos de audiência ou ideias visuais...',
      cor: '#FEF3C7',
      assunto: 'Rascunho',
      dataCriacao: new Date().toLocaleDateString('pt-BR'),
    }
    const salva = salvarNota(nova)
    carregarNotas()
    selecionarNota(salva)
  }

  const handleSalvarAtual = () => {
    if (!notaSelecionada) return
    const atualizada = salvarNota({
      id: notaSelecionada.id,
      titulo: titulo.trim() || 'Anotação sem título',
      texto,
      assunto,
      cor,
    })
    setMensagem('Nota salva automaticamente!')
    setTimeout(() => setMensagem(null), 2500)
    carregarNotas()
    setNotaSelecionada(atualizada)
  }

  const handleExcluirAtual = (id: string) => {
    excluirNota(id)
    const restantes = getNotas()
    setNotas(restantes)
    if (restantes.length > 0) {
      selecionarNota(restantes[0])
    } else {
      setNotaSelecionada(null)
      setTitulo('')
      setTexto('')
    }
  }

  const notasFiltradas = notas.filter((n) => {
    return (
      !busca.trim() ||
      n.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      n.texto.toLowerCase().includes(busca.toLowerCase()) ||
      n.assunto.toLowerCase().includes(busca.toLowerCase())
    )
  })

  const CORES_PALETA = [
    { label: 'Azul Claro', hex: '#EFF6FF' },
    { label: 'Amarelo Suave', hex: '#FEF3C7' },
    { label: 'Verde Menta', hex: '#ECFDF5' },
    { label: 'Rosa Claro', hex: '#FDF2F8' },
    { label: 'Cinza Neutro', hex: '#F1F5F9' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
            Organização Pessoal
          </span>
          <h1 className="text-2xl font-serif font-bold text-slate-900 mt-1">
            Bloco de Notas Inteligente
          </h1>
          <p className="text-xs text-slate-600">
            Anotações coloridas com busca instantânea, classificação por assunto e ditado por voz.
          </p>
        </div>

        <Button
          onClick={handleCriarNova}
          className="bg-slate-900 hover:bg-slate-800 text-white text-xs flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Nova Nota</span>
        </Button>
      </div>

      {mensagem && (
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium animate-fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>{mensagem}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Coluna Esquerda: Lista de Notas */}
        <div className="lg:col-span-4 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <Input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Pesquisar notas e teses..."
              className="pl-9 text-xs bg-white"
            />
          </div>

          <div className="space-y-2 max-h-[550px] overflow-y-auto pr-1">
            {notasFiltradas.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400 bg-white rounded-xl border border-slate-200">
                Nenhuma nota encontrada.
              </div>
            ) : (
              notasFiltradas.map((n) => {
                const ativo = notaSelecionada?.id === n.id
                return (
                  <div
                    key={n.id}
                    onClick={() => selecionarNota(n)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none space-y-1 ${
                      ativo
                        ? 'border-slate-800 shadow-sm ring-1 ring-slate-800'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                    style={{ backgroundColor: n.cor || '#FFFFFF' }}
                  >
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span className="font-semibold uppercase tracking-wider text-slate-700">
                        {n.assunto}
                      </span>
                      <span>{n.dataCriacao}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 truncate">{n.titulo}</h4>
                    <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                      {n.texto}
                    </p>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Coluna Direita: Editor da Nota Selecionada */}
        <div className="lg:col-span-8 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          {notaSelecionada ? (
            <>
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700">Cor da Nota:</span>
                  <div className="flex items-center gap-1.5">
                    {CORES_PALETA.map((c) => (
                      <button
                        key={c.hex}
                        type="button"
                        onClick={() => {
                          setCor(c.hex)
                          setTimeout(handleSalvarAtual, 50)
                        }}
                        className={`w-5 h-5 rounded-full border transition-transform ${
                          cor === c.hex ? 'ring-2 ring-slate-800 scale-110' : 'border-slate-300'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.label}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <VoiceDictation onTranscript={(t) => setTexto((prev) => prev + ' ' + t)} />
                  <Button
                    onClick={handleSalvarAtual}
                    size="sm"
                    className="bg-slate-900 hover:bg-slate-800 text-white text-xs h-7 px-3"
                  >
                    Salvar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleExcluirAtual(notaSelecionada.id)}
                    className="text-xs text-red-600 border-slate-200 hover:bg-red-50 h-7 px-2"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <Label className="text-xs font-semibold text-slate-700">Título</Label>
                  <Input
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    className="text-xs mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold text-slate-700">Assunto / Ramo</Label>
                  <Input
                    value={assunto}
                    onChange={(e) => setAssunto(e.target.value)}
                    className="text-xs mt-1"
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs font-semibold text-slate-700">Conteúdo da Nota</Label>
                <textarea
                  value={texto}
                  onChange={(e) => setTexto(e.target.value)}
                  rows={12}
                  className="w-full text-xs rounded-xl border border-slate-200 p-3 mt-1 text-slate-800 leading-relaxed focus:outline-none focus:ring-1 focus:ring-slate-400"
                  style={{ backgroundColor: cor }}
                />
              </div>

              {notaSelecionada.anexos && notaSelecionada.anexos.length > 0 && (
                <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-600">
                  <Paperclip className="w-3.5 h-3.5 text-slate-400" />
                  <span>Anexos: {notaSelecionada.anexos.join(', ')}</span>
                </div>
              )}
            </>
          ) : (
            <div className="p-12 text-center text-slate-400 text-xs">
              Selecione uma nota à esquerda ou crie uma nova para começar.
            </div>
          )}
        </div>
      </div>

      <MiaBubble
        size="sm"
        message="Anote insights de audiências e trechos de despachos orais para reaproveitá-los nas caixas de destaque da Formatação Inteligente."
      />

      <LegalAIAviso />
    </div>
  )
}
