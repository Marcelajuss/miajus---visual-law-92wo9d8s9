import React, { useState } from 'react'
import { salvarAcervoItem } from '@/lib/storage'
import { exportToPdf } from '@/lib/exportUtils'
import { MiaBubble } from '@/components/MiaCharacter'
import { LegalAIAviso } from '@/components/MiaJusLogo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { BarChart3, Plus, Trash2, Save, Download, CheckCircle, TrendingUp } from 'lucide-react'

interface DadoGrafico {
  id: string
  rotulo: string
  valor: number
}

export const GraficoPage: React.FC = () => {
  const [titulo, setTitulo] = useState('Evolução do Dano Material e Correção Monetária')
  const [tipoGrafico, setTipoGrafico] = useState<'bar' | 'line'>('bar')
  const [mensagemSucesso, setMensagemSucesso] = useState<string | null>(null)

  const [dados, setDados] = useState<DadoGrafico[]>([
    { id: '1', rotulo: 'Ano 2021', valor: 8500 },
    { id: '2', rotulo: 'Ano 2022', valor: 12200 },
    { id: '3', rotulo: 'Ano 2023', valor: 16800 },
    { id: '4', rotulo: 'Ano 2024', valor: 21500 },
    { id: '5', rotulo: 'Ano 2025 (Atual)', valor: 26400 },
  ])

  const [novoRotulo, setNovoRotulo] = useState('')
  const [novoValor, setNovoValor] = useState('')

  const adicionarPonto = () => {
    if (!novoRotulo.trim() || !novoValor.trim()) return
    const num = parseFloat(novoValor.replace(',', '.'))
    if (isNaN(num)) return

    const ponto: DadoGrafico = {
      id: 'ponto-' + Date.now(),
      rotulo: novoRotulo,
      valor: num,
    }
    setDados([...dados, ponto])
    setNovoRotulo('')
    setNovoValor('')
  }

  const removerPonto = (id: string) => {
    setDados(dados.filter((d) => d.id !== id))
  }

  const handleSalvarAcervo = () => {
    const texto = dados.map((d) => `${d.rotulo}: R$ ${d.valor.toLocaleString('pt-BR')}`).join(' | ')
    salvarAcervoItem({
      nome: titulo,
      tipo: 'grafico',
      tipoFormatado: 'Gráfico',
      conteudo: `Tipo: ${tipoGrafico === 'bar' ? 'Barras' : 'Linhas'}\nSéries:\n${texto}`,
    })
    setMensagemSucesso('Gráfico salvo no Meu Acervo!')
    setTimeout(() => setMensagemSucesso(null), 3500)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#8B6FB8] bg-[#F4EFF9] px-2 py-0.5 rounded border border-[#E3D9EE]">
            Ferramenta Visual
          </span>
          <h1 className="text-2xl font-serif font-bold text-slate-900 mt-1">Gráfico</h1>
          <p className="text-xs text-slate-600">
            Crie gráficos de barras ou linhas para evidenciar evolução de prejuízos, juros e
            estatísticas.
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
            onClick={() => exportToPdf(titulo, 'preview-grafico-box')}
            variant="outline"
            className="text-xs flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-[#EC4899]" />
            <span>Imprimir / PDF</span>
          </Button>
        </div>
      </div>

      {mensagemSucesso && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-[#F4EFF9] border border-[#A88FBF]/40 text-[#3E3359] text-xs font-medium animate-fade-in">
          <CheckCircle className="w-4 h-4 text-[#EC4899]" />
          <span>{mensagemSucesso}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Painel Esquerdo */}
        <div className="lg:col-span-5 space-y-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <Label className="text-xs font-semibold text-slate-700">Título do Gráfico</Label>
            <Input
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="text-xs mt-1"
            />
          </div>

          <div>
            <Label className="text-xs font-semibold text-slate-700">Tipo de Gráfico</Label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <Button
                type="button"
                variant={tipoGrafico === 'bar' ? 'default' : 'outline'}
                size="sm"
                className="text-xs"
                onClick={() => setTipoGrafico('bar')}
              >
                Gráfico de Barras
              </Button>
              <Button
                type="button"
                variant={tipoGrafico === 'line' ? 'default' : 'outline'}
                size="sm"
                className="text-xs"
                onClick={() => setTipoGrafico('line')}
              >
                Gráfico de Linhas
              </Button>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Adicionar Ponto de Dado
            </h3>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs text-slate-600">Rótulo (Eixo X)</Label>
                <Input
                  value={novoRotulo}
                  onChange={(e) => setNovoRotulo(e.target.value)}
                  placeholder="Ex.: Jun/2024"
                  className="text-xs mt-1"
                />
              </div>
              <div>
                <Label className="text-xs text-slate-600">Valor Numérico</Label>
                <Input
                  value={novoValor}
                  onChange={(e) => setNovoValor(e.target.value)}
                  placeholder="Ex.: 15000"
                  className="text-xs mt-1"
                />
              </div>
            </div>

            <Button onClick={adicionarPonto} className="w-full text-xs">
              <Plus className="w-3.5 h-3.5 mr-1" />
              Adicionar ao Gráfico
            </Button>
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Séries Cadastradas ({dados.length})
            </h3>
            <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
              {dados.map((d) => (
                <div
                  key={d.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                >
                  <span className="font-semibold text-slate-800">{d.rotulo}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-slate-600">
                      R$ {d.valor.toLocaleString('pt-BR')}
                    </span>
                    <button
                      type="button"
                      onClick={() => removerPonto(d.id)}
                      className="text-slate-400 hover:text-red-600"
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
            message="Gráficos de evolução tornam incontestável o crescimento de passivos contratuais e perdas patrimoniais sofridas pela parte."
          />
        </div>

        {/* Painel Direito: Preview do Gráfico */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Pré-Visualização do Gráfico
            </span>
            <span className="text-[11px] text-slate-400">Renderização em Alta Resolução</span>
          </div>

          <div
            id="preview-grafico-box"
            className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4"
          >
            <div className="border-b border-slate-100 pb-3 text-center">
              <h2 className="text-lg font-serif font-bold text-slate-900">{titulo}</h2>
              <p className="text-xs text-slate-500">Demonstrativo estatístico Visual Law</p>
            </div>

            <div className="h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                {tipoGrafico === 'bar' ? (
                  <BarChart data={dados} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="rotulo" tick={{ fontSize: 11, fill: '#475569' }} />
                    <YAxis tick={{ fontSize: 11, fill: '#475569' }} />
                    <Tooltip
                      formatter={(val: any) => [
                        `R$ ${Number(val).toLocaleString('pt-BR')}`,
                        'Valor',
                      ]}
                    />
                    <Legend />
                    <Bar
                      dataKey="valor"
                      name="Montante Apurado"
                      fill="#8B6FB8"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                ) : (
                  <LineChart data={dados} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="rotulo" tick={{ fontSize: 11, fill: '#475569' }} />
                    <YAxis tick={{ fontSize: 11, fill: '#475569' }} />
                    <Tooltip
                      formatter={(val: any) => [
                        `R$ ${Number(val).toLocaleString('pt-BR')}`,
                        'Valor',
                      ]}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="valor"
                      name="Evolução do Valor"
                      stroke="#EC4899"
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: '#EC4899' }}
                    />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>MiaJus - Visual Law</span>
              <span>{dados.length} períodos avaliados</span>
            </div>
          </div>
        </div>
      </div>

      <LegalAIAviso />
    </div>
  )
}
