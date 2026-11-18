import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { salvarAcervoItem, getAcervo, AcervoItem } from '@/lib/storage'
import { exportToDocx, exportToPdf } from '@/lib/exportUtils'
import { MiaBubble } from '@/components/MiaCharacter'
import { LegalAIAviso } from '@/components/MiaJusLogo'
import { VoiceDictation } from '@/components/VoiceDictation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  FileText,
  Save,
  Download,
  Printer,
  Sparkles,
  Palette,
  Columns,
  Image as ImageIcon,
  CheckCircle,
  Plus,
  Trash2,
  Copy,
  QrCode,
  Workflow,
  BarChart2,
  Table as TableIcon,
} from 'lucide-react'

export const FormatacaoInteligente: React.FC = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const projectId = searchParams.get('id')
  const isNovo = searchParams.get('modo') === 'novo'

  // Estado da peça Visual Law
  const [tituloPeca, setTituloPeca] = useState(
    'Petição Inicial com Síntese Visual e Destaques Fáticos',
  )
  const [tipoModelo, setTipoModelo] = useState<'peticao' | 'contrato' | 'procuracao' | 'recurso'>(
    'peticao',
  )
  const [comarcaVara, setComarcaVara] = useState(
    'EXCELENTÍSSIMO SENHOR DOUTOR JUIZ DE DIREITO DA 3ª VARA CÍVEL DA COMARCA DE SÃO PAULO/SP',
  )
  const [partes, setPartes] = useState('AUTOR: JOÃO DA SILVA | RÉU: BANCO EXEMPLO S/A')
  const [resumoVisual, setResumoVisual] = useState(
    '• Fato Principal: Cobrança de tarifa indevida e negativação em 10/01/2025.\n• Pedido Liminar: Exclusão imediata do apontamento nos órgãos de proteção.\n• Valor da Causa: R$ 15.000,00.',
  )
  const [dosFatos, setDosFatos] = useState(
    'A parte Autora é cliente correntista há mais de 8 anos, mantendo conduta irretocável. Não obstante, fora surpreendida com negativação motivada por débito inexistente decorrente de fraude notória.',
  )
  const [fundamentacao, setFundamentacao] = useState(
    'Incide na espécie a responsabilidade objetiva das instituições financeiras, nos termos da Súmula 479 do Colendo Superior Tribunal de Justiça. O dano moral decorre in re ipsa do abalo de crédito indevido.',
  )
  const [pedidos, setPedidos] = useState(
    'a) Concessão da tutela de urgência;\nb) Inversão do ônus da prova (art. 6º, VIII, CDC);\nc) Condenação em danos morais no importe de R$ 15.000,00;\nd) Condenação em honorários sucumbenciais no percentual de 20%.',
  )

  // Configurações visuais (Visual Law)
  const [corPrimaria, setCorPrimaria] = useState('#1E3A8A') // Azul Marinho Jurídico
  const [corSecundaria, setCorSecundaria] = useState('#F1F5F9') // Fundo do quadro
  const [estiloFonte, setEstiloFonte] = useState<'sans' | 'serif'>('sans')
  const [mostrarCabecalho, setMostrarCabecalho] = useState(true)
  const [mostrarQuadroResumo, setMostrarQuadroResumo] = useState(true)
  const [mostrarAlertaLegal, setMostrarAlertaLegal] = useState(true)
  const [exibirQrCodeExemplo, setExibirQrCodeExemplo] = useState(true)

  // Elementos adicionais inseridos
  const [itensVisuais, setItensVisuais] = useState<
    Array<{ id: string; tipo: string; titulo: string; descricao: string }>
  >([
    {
      id: 'elem-1',
      tipo: 'Linha do Tempo',
      titulo: 'Cronologia Fática Essencial',
      descricao:
        '10/01/2025: Cobrança Indevida → 12/01/2025: Protocolo SAC sem solução → 15/01/2025: Inscrição no SPC/Serasa.',
    },
  ])

  const [salvando, setSalvando] = useState(false)
  const [mensagemSucesso, setMensagemSucesso] = useState<string | null>(null)

  // Carregar do acervo caso venha com ?id=
  useEffect(() => {
    if (projectId) {
      const acervo = getAcervo()
      const item = acervo.find((p) => p.id === projectId)
      if (item) {
        setTituloPeca(item.nome)
        if (['peticao', 'contrato', 'procuracao', 'recurso'].includes(item.tipo)) {
          setTipoModelo(item.tipo as any)
        }
      }
    }
  }, [projectId])

  const handleSalvarAcervo = () => {
    setSalvando(true)
    const novoItem = salvarAcervoItem({
      id: projectId || undefined,
      nome: tituloPeca,
      tipo: tipoModelo,
      tipoFormatado:
        tipoModelo === 'peticao'
          ? 'Petição Inicial'
          : tipoModelo === 'contrato'
            ? 'Contrato'
            : tipoModelo === 'recurso'
              ? 'Recurso'
              : 'Procuração',
      conteudo: `${comarcaVara}\n\n${partes}\n\nRESUMO:\n${resumoVisual}\n\nFATOS:\n${dosFatos}\n\nDIREITO:\n${fundamentacao}\n\nPEDIDOS:\n${pedidos}`,
    })

    setTimeout(() => {
      setSalvando(false)
      setMensagemSucesso('Peça salva com sucesso no Meu Acervo!')
      setTimeout(() => setMensagemSucesso(null), 4000)
    }, 400)
  }

  const handleExportDocx = () => {
    const el = document.getElementById('preview-peca-a4')
    if (el) {
      exportToDocx(tituloPeca, el.innerHTML)
    }
  }

  const handleExportPdf = () => {
    exportToPdf(tituloPeca, 'preview-peca-a4')
  }

  const adicionarElementoVisual = (tipo: string) => {
    const novo = {
      id: 'elem-' + Date.now(),
      tipo,
      titulo: `${tipo} do Caso Concreto`,
      descricao: `Elemento estruturado inserido na peça para facilitar a cognição visual da tese.`,
    }
    setItensVisuais([...itensVisuais, novo])
  }

  const removerElementoVisual = (id: string) => {
    setItensVisuais(itensVisuais.filter((item) => item.id !== id))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Barra superior de ações */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-widest text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Visual Law Studio
            </span>
            <span className="text-xs text-slate-500">
              Fluxo: Gerador de Documentos com IA &rarr; Formatação Inteligente &rarr; Meu Acervo
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mt-1">
            Formatação Inteligente
          </h1>
          <p className="text-xs text-slate-600">
            Ajuste a estrutura, fontes, cores e elementos visuais à esquerda enquanto acompanha a
            pré-visualização em tempo real à direita.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            onClick={handleSalvarAcervo}
            disabled={salvando}
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs flex items-center gap-1.5 shadow-sm"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{salvando ? 'Salvando...' : 'Salvar no Meu Acervo'}</span>
          </Button>

          <Button
            onClick={handleExportDocx}
            variant="outline"
            className="text-xs flex items-center gap-1.5 border-slate-300"
          >
            <Download className="w-3.5 h-3.5 text-blue-700" />
            <span>Baixar DOCX</span>
          </Button>

          <Button
            onClick={handleExportPdf}
            variant="outline"
            className="text-xs flex items-center gap-1.5 border-slate-300"
          >
            <Printer className="w-3.5 h-3.5 text-slate-700" />
            <span>Imprimir / Salvar PDF</span>
          </Button>
        </div>
      </div>

      {mensagemSucesso && (
        <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>{mensagemSucesso}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs underline text-emerald-800 hover:bg-emerald-100/60 p-0 h-auto"
            onClick={() => navigate('/meu-acervo')}
          >
            Ver no Meu Acervo &rarr;
          </Button>
        </div>
      )}

      {/* Dois Painéis: Configurações à esquerda (w-full lg:w-5/12) e Editor / Preview à direita (w-full lg:w-7/12) (Critério 2) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* PAINEL ESQUERDO: CONFIGURAÇÕES E DADOS DA PEÇA */}
        <div className="lg:col-span-5 space-y-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-slate-700" />
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Configurações da Peça
              </h2>
            </div>
            <span className="text-[11px] text-slate-400">Painel de Edição</span>
          </div>

          <div className="space-y-3">
            <div>
              <Label className="text-xs font-semibold text-slate-700">Título do Projeto</Label>
              <Input
                value={tituloPeca}
                onChange={(e) => setTituloPeca(e.target.value)}
                className="text-xs mt-1"
                placeholder="Ex.: Petição Inicial com Visual Law"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs font-semibold text-slate-700">Tipo de Documento</Label>
                <select
                  value={tipoModelo}
                  onChange={(e) => setTipoModelo(e.target.value as any)}
                  className="w-full text-xs rounded-md border border-slate-200 p-2 mt-1 bg-white"
                >
                  <option value="peticao">Petição Inicial</option>
                  <option value="contrato">Contrato</option>
                  <option value="procuracao">Procuração</option>
                  <option value="recurso">Recurso de Apelação</option>
                </select>
              </div>

              <div>
                <Label className="text-xs font-semibold text-slate-700">Família Tipográfica</Label>
                <select
                  value={estiloFonte}
                  onChange={(e) => setEstiloFonte(e.target.value as any)}
                  className="w-full text-xs rounded-md border border-slate-200 p-2 mt-1 bg-white"
                >
                  <option value="sans">Moderna (Sans-Serif)</option>
                  <option value="serif">Tradicional (Serifada)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <div>
                <Label className="text-xs font-semibold text-slate-700">Cor de Destaque</Label>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="color"
                    value={corPrimaria}
                    onChange={(e) => setCorPrimaria(e.target.value)}
                    className="w-8 h-8 rounded border border-slate-200 cursor-pointer p-0"
                  />
                  <span className="text-xs font-mono text-slate-600 uppercase">{corPrimaria}</span>
                </div>
              </div>

              <div>
                <Label className="text-xs font-semibold text-slate-700">Fundo dos Quadros</Label>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="color"
                    value={corSecundaria}
                    onChange={(e) => setCorSecundaria(e.target.value)}
                    className="w-8 h-8 rounded border border-slate-200 cursor-pointer p-0"
                  />
                  <span className="text-xs font-mono text-slate-600 uppercase">
                    {corSecundaria}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-2">
              <Label className="text-xs font-bold text-slate-800">
                Camadas Visuais Habilitadas
              </Label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                  <input
                    type="checkbox"
                    checked={mostrarCabecalho}
                    onChange={(e) => setMostrarCabecalho(e.target.checked)}
                    className="rounded text-slate-900"
                  />
                  <span>Cabeçalho com Logo</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                  <input
                    type="checkbox"
                    checked={mostrarQuadroResumo}
                    onChange={(e) => setMostrarQuadroResumo(e.target.checked)}
                    className="rounded text-slate-900"
                  />
                  <span>Quadro de Síntese Fática</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                  <input
                    type="checkbox"
                    checked={exibirQrCodeExemplo}
                    onChange={(e) => setExibirQrCodeExemplo(e.target.checked)}
                    className="rounded text-slate-900"
                  />
                  <span>QR Code de Sustentação</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                  <input
                    type="checkbox"
                    checked={mostrarAlertaLegal}
                    onChange={(e) => setMostrarAlertaLegal(e.target.checked)}
                    className="rounded text-slate-900"
                  />
                  <span>Nota Ética de Rodapé</span>
                </label>
              </div>
            </div>
          </div>

          {/* Inserir Elementos Criados em outras Ferramentas */}
          <div className="pt-3 border-t border-slate-100 space-y-2.5">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-bold text-slate-800">
                Inserir Elementos Visuais na Peça
              </Label>
              <span className="text-[10px] text-slate-400">Integração Visual Law</span>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => adicionarElementoVisual('Linha do Tempo')}
                className="text-[11px] justify-start h-8 px-2"
              >
                <Workflow className="w-3.5 h-3.5 mr-1.5 text-blue-600" />+ Linha do Tempo
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => adicionarElementoVisual('Fluxograma')}
                className="text-[11px] justify-start h-8 px-2"
              >
                <Columns className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />+ Fluxograma
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => adicionarElementoVisual('Tabela')}
                className="text-[11px] justify-start h-8 px-2"
              >
                <TableIcon className="w-3.5 h-3.5 mr-1.5 text-purple-600" />+ Tabela de Pedidos
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => adicionarElementoVisual('Gráfico')}
                className="text-[11px] justify-start h-8 px-2"
              >
                <BarChart2 className="w-3.5 h-3.5 mr-1.5 text-amber-600" />+ Gráfico Estatístico
              </Button>
            </div>

            {itensVisuais.length > 0 && (
              <div className="space-y-1.5 pt-1">
                {itensVisuais.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                  >
                    <div>
                      <span className="font-semibold text-slate-800">{item.tipo}:</span>{' '}
                      <span className="text-slate-600">{item.titulo}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removerElementoVisual(item.id)}
                      className="text-slate-400 hover:text-red-600"
                      title="Remover da peça"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Campos de texto com ditado por voz */}
          <div className="pt-3 border-t border-slate-100 space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <Label className="text-xs font-semibold text-slate-700">
                  Resumo Visual / Fatos Chave
                </Label>
                <VoiceDictation
                  onTranscript={(t) => setResumoVisual((prev) => prev + '\n• ' + t)}
                />
              </div>
              <textarea
                value={resumoVisual}
                onChange={(e) => setResumoVisual(e.target.value)}
                rows={3}
                className="w-full text-xs rounded-md border border-slate-200 p-2 font-mono text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-400"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <Label className="text-xs font-semibold text-slate-700">Dos Fatos em Síntese</Label>
                <VoiceDictation onTranscript={(t) => setDosFatos((prev) => prev + ' ' + t)} />
              </div>
              <textarea
                value={dosFatos}
                onChange={(e) => setDosFatos(e.target.value)}
                rows={3}
                className="w-full text-xs rounded-md border border-slate-200 p-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-400"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <Label className="text-xs font-semibold text-slate-700">
                  Do Direito e Jurisprudência
                </Label>
                <VoiceDictation onTranscript={(t) => setFundamentacao((prev) => prev + ' ' + t)} />
              </div>
              <textarea
                value={fundamentacao}
                onChange={(e) => setFundamentacao(e.target.value)}
                rows={3}
                className="w-full text-xs rounded-md border border-slate-200 p-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-400"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <Label className="text-xs font-semibold text-slate-700">
                  Dos Pedidos e Requerimentos
                </Label>
                <VoiceDictation onTranscript={(t) => setPedidos((prev) => prev + '\n' + t)} />
              </div>
              <textarea
                value={pedidos}
                onChange={(e) => setPedidos(e.target.value)}
                rows={3}
                className="w-full text-xs rounded-md border border-slate-200 p-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-400"
              />
            </div>
          </div>

          <MiaBubble
            size="sm"
            message="No Visual Law, caixas de resumo fático no início da peça aumentam em até 70% a velocidade de apreensão do magistrado durante a triagem inicial."
          />
        </div>

        {/* PAINEL DIREITO: PRÉ-VISUALIZAÇÃO A4 VISUAL LAW EM TEMPO REAL */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Pré-Visualização A4 (Padrão Judiciário)
            </span>
            <span className="text-[11px] text-slate-400">
              Escala 100% • Layout Preservado na Impressão/DOCX
            </span>
          </div>

          <div className="bg-slate-100 p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-inner flex justify-center">
            {/* Folha A4 simulada */}
            <div
              id="preview-peca-a4"
              className={`w-full max-w-[210mm] min-h-[297mm] bg-white p-8 sm:p-12 shadow-md rounded-sm text-slate-900 border border-slate-200/80 ${
                estiloFonte === 'serif' ? 'font-serif' : 'font-sans'
              }`}
              style={{
                lineHeight: '1.6',
              }}
            >
              {/* Cabeçalho Visual Law */}
              {mostrarCabecalho && (
                <div
                  className="pb-4 mb-6 border-b-2 flex items-start justify-between gap-4"
                  style={{ borderColor: corPrimaria }}
                >
                  <div>
                    <p className="text-xs uppercase font-bold tracking-widest text-slate-500">
                      Nogueira &amp; Ferreira Sociedade de Advogados
                    </p>
                    <p className="text-xs text-slate-400">
                      OAB/SP 000.000 • Advocacia Cível Estratégica
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className="text-[10px] uppercase font-bold px-2 py-0.5 rounded text-white"
                      style={{ backgroundColor: corPrimaria }}
                    >
                      Petição Estruturada
                    </span>
                  </div>
                </div>
              )}

              {/* Endereçamento */}
              <div className="text-center sm:text-left mb-6 font-bold text-xs uppercase tracking-wide text-slate-800">
                {comarcaVara}
              </div>

              {/* Qualificação e Partes */}
              <div
                className="p-3 mb-6 rounded-md text-xs font-semibold border-l-4"
                style={{
                  backgroundColor: corSecundaria,
                  borderColor: corPrimaria,
                }}
              >
                {partes}
              </div>

              {/* Título da Peça */}
              <h2
                className="text-lg sm:text-xl font-bold uppercase text-center mb-6 tracking-tight"
                style={{ color: corPrimaria }}
              >
                {tituloPeca}
              </h2>

              {/* Quadro de Síntese Visual Fática (Visual Law) */}
              {mostrarQuadroResumo && (
                <div
                  className="p-4 mb-6 rounded-lg border-2"
                  style={{
                    backgroundColor: corSecundaria,
                    borderColor: corPrimaria,
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                      style={{ color: corPrimaria }}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Síntese Visual do Pedido
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">Cognição Rápida</span>
                  </div>
                  <div className="text-xs text-slate-800 whitespace-pre-line leading-relaxed font-sans">
                    {resumoVisual}
                  </div>
                </div>
              )}

              {/* Elementos Visuais Dinâmicos Inseridos */}
              {itensVisuais.map((item) => (
                <div
                  key={item.id}
                  className="p-4 mb-6 rounded-lg border border-slate-200 bg-slate-50/80"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded text-white"
                      style={{ backgroundColor: corPrimaria }}
                    >
                      {item.tipo}
                    </span>
                    <span className="text-xs font-bold text-slate-800">{item.titulo}</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-sans">
                    {item.descricao}
                  </p>
                </div>
              ))}

              {/* I. Dos Fatos */}
              <div className="mb-6 space-y-2">
                <h3
                  className="text-sm font-bold uppercase tracking-wide border-b pb-1"
                  style={{ color: corPrimaria, borderColor: '#E2E8F0' }}
                >
                  I. Dos Fatos
                </h3>
                <p className="text-xs text-slate-800 text-justify leading-relaxed whitespace-pre-line">
                  {dosFatos}
                </p>
              </div>

              {/* II. Do Direito */}
              <div className="mb-6 space-y-2">
                <h3
                  className="text-sm font-bold uppercase tracking-wide border-b pb-1"
                  style={{ color: corPrimaria, borderColor: '#E2E8F0' }}
                >
                  II. Da Fundamentação Jurídica
                </h3>
                <p className="text-xs text-slate-800 text-justify leading-relaxed whitespace-pre-line">
                  {fundamentacao}
                </p>
              </div>

              {/* QR Code Interativo no Documento */}
              {exibirQrCodeExemplo && (
                <div className="my-6 p-4 rounded-lg border border-dashed border-slate-300 bg-slate-50 flex items-center gap-4">
                  <div className="w-16 h-16 bg-white p-1 rounded border border-slate-200 flex-shrink-0 flex items-center justify-center">
                    <QrCode className="w-12 h-12 text-slate-900" />
                  </div>
                  <div className="text-xs space-y-0.5">
                    <p className="font-bold text-slate-900">
                      Sustentação Oral e Provas em Vídeo (QR Code)
                    </p>
                    <p className="text-slate-600 text-[11px] leading-tight">
                      Aponte a câmera do seu smartphone para visualizar o despacho em vídeo de 90
                      segundos gravado pelo patrono da causa.
                    </p>
                  </div>
                </div>
              )}

              {/* III. Dos Pedidos */}
              <div className="mb-8 space-y-2">
                <h3
                  className="text-sm font-bold uppercase tracking-wide border-b pb-1"
                  style={{ color: corPrimaria, borderColor: '#E2E8F0' }}
                >
                  III. Dos Pedidos
                </h3>
                <div className="text-xs text-slate-800 leading-relaxed whitespace-pre-line bg-slate-50/50 p-3 rounded border border-slate-200">
                  {pedidos}
                </div>
              </div>

              {/* Fechamento */}
              <div className="text-center sm:text-right text-xs text-slate-700 space-y-1 pt-4 border-t border-slate-200">
                <p>Termos em que, pede deferimento.</p>
                <p>São Paulo/SP, {new Date().toLocaleDateString('pt-BR')}.</p>
                <p className="font-bold text-slate-900 pt-2">
                  Dra. Camila Nogueira • OAB/SP 000.000
                </p>
              </div>

              {/* Rodapé e aviso legal */}
              {mostrarAlertaLegal && (
                <div className="mt-8 pt-4 border-t border-slate-100 text-[10px] text-slate-400 text-center">
                  Documento diagramado com MiaJus - Visual Law. Valide os fatos e dados antes do
                  protocolo judicial.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <LegalAIAviso />
    </div>
  )
}
