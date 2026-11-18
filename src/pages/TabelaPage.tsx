import React, { useState } from 'react'
import { salvarAcervoItem } from '@/lib/storage'
import { exportToDocx, exportToPdf } from '@/lib/exportUtils'
import { MiaBubble } from '@/components/MiaCharacter'
import { LegalAIAviso } from '@/components/MiaJusLogo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table as TableIcon, Plus, Trash2, Save, Download, CheckCircle, Copy } from 'lucide-react'

interface LinhaTabela {
  id: string
  item: string
  fundamento: string
  valor: string
  status: string
}

export const TabelaPage: React.FC = () => {
  const [titulo, setTitulo] = useState('Tabela Demonstrativa de Pedidos e Liquidação de Valores')
  const [mensagemSucesso, setMensagemSucesso] = useState<string | null>(null)

  const [linhas, setLinhas] = useState<LinhaTabela[]>([
    {
      id: 'row-1',
      item: 'Reparação por Danos Morais',
      fundamento:
        'Inscrição indevida nos órgãos de proteção ao crédito (Súmula 385 STJ a contrario sensu)',
      valor: 'R$ 15.000,00',
      status: 'Principal',
    },
    {
      id: 'row-2',
      item: 'Restituição em Dobro de Tarifas Bancárias',
      fundamento: 'Art. 42, parágrafo único, CDC c/c Tema 929 do STJ',
      valor: 'R$ 3.420,00',
      status: 'Acessório',
    },
    {
      id: 'row-3',
      item: 'Multa Diária (Astreintes)',
      fundamento: 'Descumprimento da tutela de urgência de exclusão registral',
      valor: 'R$ 500,00 / dia',
      status: 'Cominatório',
    },
  ])

  const [novoItem, setNovoItem] = useState('')
  const [novoFundamento, setNovoFundamento] = useState('')
  const [novoValor, setNovoValor] = useState('')
  const [novoStatus, setNovoStatus] = useState('Principal')

  const adicionarLinha = () => {
    if (!novoItem.trim() || !novoValor.trim()) return
    const nova: LinhaTabela = {
      id: 'row-' + Date.now(),
      item: novoItem,
      fundamento: novoFundamento,
      valor: novoValor,
      status: novoStatus,
    }
    setLinhas([...linhas, nova])
    setNovoItem('')
    setNovoFundamento('')
    setNovoValor('')
  }

  const removerLinha = (id: string) => {
    setLinhas(linhas.filter((l) => l.id !== id))
  }

  const handleSalvarAcervo = () => {
    const texto = linhas
      .map((l) => `${l.item} | ${l.fundamento} | ${l.valor} (${l.status})`)
      .join('\n')
    salvarAcervoItem({
      nome: titulo,
      tipo: 'tabela',
      tipoFormatado: 'Tabela',
      conteudo: texto,
    })
    setMensagemSucesso('Tabela salva no Meu Acervo!')
    setTimeout(() => setMensagemSucesso(null), 3500)
  }

  const handleExportDocx = () => {
    const el = document.getElementById('preview-tabela-box')
    if (el) {
      exportToDocx(titulo, el.innerHTML)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
            Ferramenta Visual
          </span>
          <h1 className="text-2xl font-serif font-bold text-slate-900 mt-1">Tabela</h1>
          <p className="text-xs text-slate-600">
            Estruture liquidações de valores, pedidos comparativos e demonstrativos contábeis para
            Visual Law.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            onClick={handleSalvarAcervo}
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Salvar no Meu Acervo</span>
          </Button>

          <Button
            onClick={handleExportDocx}
            variant="outline"
            className="text-xs flex items-center gap-1.5 border-slate-300"
          >
            <Download className="w-3.5 h-3.5 text-blue-700" />
            <span>Exportar DOCX</span>
          </Button>

          <Button
            onClick={() => exportToPdf(titulo, 'preview-tabela-box')}
            variant="outline"
            className="text-xs flex items-center gap-1.5 border-slate-300"
          >
            <Download className="w-3.5 h-3.5 text-slate-700" />
            <span>Imprimir / PDF</span>
          </Button>
        </div>
      </div>

      {mensagemSucesso && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium animate-fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>{mensagemSucesso}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Painel Esquerdo */}
        <div className="lg:col-span-5 space-y-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <Label className="text-xs font-semibold text-slate-700">Título da Tabela</Label>
            <Input
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="text-xs mt-1"
            />
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Adicionar Linha
            </h3>

            <div className="space-y-2">
              <div>
                <Label className="text-xs text-slate-600">Descrição do Pedido / Parcela</Label>
                <Input
                  value={novoItem}
                  onChange={(e) => setNovoItem(e.target.value)}
                  placeholder="Ex.: Indenização Material"
                  className="text-xs mt-1"
                />
              </div>

              <div>
                <Label className="text-xs text-slate-600">Fundamentação Jurídica / Artigo</Label>
                <Input
                  value={novoFundamento}
                  onChange={(e) => setNovoFundamento(e.target.value)}
                  placeholder="Ex.: Art. 186 e 927 do Código Civil"
                  className="text-xs mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs text-slate-600">Valor Pleiteado</Label>
                  <Input
                    value={novoValor}
                    onChange={(e) => setNovoValor(e.target.value)}
                    placeholder="Ex.: R$ 8.500,00"
                    className="text-xs mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs text-slate-600">Classificação</Label>
                  <select
                    value={novoStatus}
                    onChange={(e) => setNovoStatus(e.target.value)}
                    className="w-full text-xs rounded-md border border-slate-200 p-2 mt-1 bg-white"
                  >
                    <option value="Principal">Principal</option>
                    <option value="Acessório">Acessório</option>
                    <option value="Cominatório">Cominatório</option>
                    <option value="Subsidiário">Subsidiário</option>
                  </select>
                </div>
              </div>

              <Button
                onClick={adicionarLinha}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs mt-1"
              >
                <Plus className="w-3.5 h-3.5 mr-1" />
                Inserir na Tabela
              </Button>
            </div>
          </div>

          <MiaBubble
            size="sm"
            message="Juizados especiais e varas cíveis valorizam tabelas discriminadas de valores, evitando intimações para emenda da inicial."
          />
        </div>

        {/* Painel Direito: Preview da Tabela */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Pré-Visualização da Tabela
            </span>
            <span className="text-[11px] text-slate-400">Padrão Visual Law com Destaques</span>
          </div>

          <div
            id="preview-tabela-box"
            className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4"
          >
            <div className="border-b border-slate-100 pb-3 text-center">
              <h2 className="text-base sm:text-lg font-serif font-bold text-slate-900">{titulo}</h2>
              <p className="text-xs text-slate-500">
                Quadro sinótico para cognição imediata do magistrado
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white text-left font-serif">
                    <th className="p-2.5 rounded-tl-lg font-semibold">Item / Pedido</th>
                    <th className="p-2.5 font-semibold">Fundamento Legal / Tese</th>
                    <th className="p-2.5 font-semibold">Valor</th>
                    <th className="p-2.5 font-semibold">Tipo</th>
                    <th className="p-2.5 rounded-tr-lg text-center">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {linhas.map((l, idx) => (
                    <tr key={l.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}>
                      <td className="p-2.5 font-bold text-slate-900">{l.item}</td>
                      <td className="p-2.5 text-slate-600 leading-relaxed">{l.fundamento}</td>
                      <td className="p-2.5 font-mono font-bold text-slate-900 whitespace-nowrap">
                        {l.valor}
                      </td>
                      <td className="p-2.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-200/80 text-slate-700 px-1.5 py-0.5 rounded">
                          {l.status}
                        </span>
                      </td>
                      <td className="p-2.5 text-center">
                        <button
                          type="button"
                          onClick={() => removerLinha(l.id)}
                          className="text-slate-400 hover:text-red-600 p-1"
                          title="Excluir linha"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>MiaJus - Visual Law</span>
              <span>{linhas.length} itens discriminados</span>
            </div>
          </div>
        </div>
      </div>

      <LegalAIAviso />
    </div>
  )
}
