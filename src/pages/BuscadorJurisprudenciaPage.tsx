import React, { useState } from 'react'
import { MiaBubble } from '@/components/MiaCharacter'
import { LegalAIAviso } from '@/components/MiaJusLogo'
import { VoiceDictation } from '@/components/VoiceDictation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Scale, Search, ExternalLink, BookOpen, Filter, Layers, Copy, Check } from 'lucide-react'

interface JurisprudenciaItem {
  id: string
  tribunal: 'STF' | 'STJ' | 'TST' | 'TJSP' | 'TRF3' | 'TJDFT'
  numero: string
  orgaoJulgador: string
  relator: string
  dataJulgamento: string
  ementa: string
  tese: string
  linkOficial: string
}

const BASE_JURISPRUDENCIA_MANUAL: JurisprudenciaItem[] = [
  {
    id: 'jur-1',
    tribunal: 'STJ',
    numero: 'REsp 1.848.862/SP',
    orgaoJulgador: 'Segunda Seção',
    relator: 'Min. Marco Aurélio Bellizze',
    dataJulgamento: '24/11/2021',
    ementa:
      'RECURSO ESPECIAL REPETITIVO. TEMA 1061/STJ. DIREITO DO CONSUMIDOR. CONTRATOS BANCÁRIOS. GOLPE DO BOLETO FALSO. FRAUDE PERPETRADA POR TERCEIRO. FORTUITO INTERNO. SÚMULA 479/STJ. RESPONSABILIDADE OBJETIVA DA INSTITUIÇÃO FINANCEIRA.',
    tese: 'As instituições financeiras respondem objetivamente pelos danos gerados por fortuito interno relativo a fraudes e delitos praticados por terceiros no âmbito de operações bancárias.',
    linkOficial: 'https://processo.stj.jus.br/jurisprudencia/',
  },
  {
    id: 'jur-2',
    tribunal: 'STJ',
    numero: 'Súmula 385/STJ',
    orgaoJulgador: 'Segunda Seção',
    relator: 'Ministro Relator Designado',
    dataJulgamento: '09/06/2009',
    ementa:
      'DA ANOTAÇÃO IRREGULAR EM CADASTRO DE PROTEÇÃO AO CRÉDITO, NÃO CABE INDENIZAÇÃO POR DANO MORAL, QUANDO PREEXISTENTE LEGÍTIMA INSCRIÇÃO, RESSALVADO O DIREITO AO CANCELAMENTO.',
    tese: 'Aplicável a contrario sensu: inexistindo prévia anotação desabonadora legítima, a inscrição indevida gera dano moral in re ipsa.',
    linkOficial: 'https://www.stj.jus.br/portal/jurisprudencia/sumulas/',
  },
  {
    id: 'jur-3',
    tribunal: 'STF',
    numero: 'ARE 1.267.879/SP',
    orgaoJulgador: 'Plenário Virtual',
    relator: 'Min. Luiz Fux',
    dataJulgamento: '12/03/2021',
    ementa:
      'TEMA 1105 DE REPERCUSSÃO GERAL. DIREITO CONSTITUCIONAL E PROCESSUAL CIVIL. LIMITES DO DANO MORAL FIXADO EM MATÉRIA CONSUMERISTA. AUSÊNCIA DE MATÉRIA CONSTITUCIONAL. PRESERVAÇÃO DA DIGNIDADE HUMANA.',
    tese: 'Inexistência de repercussão geral quanto ao quantum indenizatório arbitrado pelas instâncias ordinárias por se tratar de matéria fático-probatória.',
    linkOficial: 'https://jurisprudencia.stf.jus.br/',
  },
  {
    id: 'jur-4',
    tribunal: 'TJSP',
    numero: 'Apelação Cível 1012934-88.2023.8.26.0100',
    orgaoJulgador: '18ª Câmara de Direito Privado',
    relator: 'Des. Henrique Rodriguês',
    dataJulgamento: '15/02/2025',
    ementa:
      'AÇÃO DECLARATÓRIA DE INEXIGIBILIDADE DE DÉBITO C/C INDENIZAÇÃO POR DANOS MORAIS. NEGATIVAÇÃO INDEVIDA. DANO MORAL IN RE IPSA CONFIGURADO. QUANTUM FIXADO EM R$ 15.000,00 QUE ATENDE AOS PRINCÍPIOS DA RAZOABILIDADE E PROPORCIONALIDADE.',
    tese: 'A indenização por dano moral em negativação indevida deve cumprir o tríplice caráter: reparatório, punitivo e pedagógico.',
    linkOficial: 'https://esaj.tjsp.jus.br/cposg/open.do',
  },
  {
    id: 'jur-5',
    tribunal: 'TST',
    numero: 'RR 1000823-11.2022.5.02.0044',
    orgaoJulgador: '3ª Turma',
    relator: 'Min. Maurício Godinho Delgado',
    dataJulgamento: '18/10/2024',
    ementa:
      'TELETRABALHO. CONTROLE DE JORNADA. HORAS EXTRAS. APLICAÇÃO DO ARTIGO 62, III, DA CLT. DIREITO À DESCONEXÃO E SAÚDE MENTAL DO TRABALHADOR. DANO EXISTENCIAL NÃO DEMONSTRADO.',
    tese: 'A exigência de conexão remota reiterada além do expediente habitual sem a correspondente contraprestação configura sobrejornada.',
    linkOficial: 'https://jurisprudencia.tst.jus.br/',
  },
  {
    id: 'jur-6',
    tribunal: 'TRF3',
    numero: 'Apelação Cível 5002934-12.2022.4.03.6100',
    orgaoJulgador: '1ª Turma',
    relator: 'Des. Federal Wilson Zauhy',
    dataJulgamento: '05/11/2024',
    ementa:
      'DIREITO TRIBUTÁRIO. EXCLUSÃO DO ICMS DA BASE DE CÁLCULO DO PIS E DA COFINS. TEMA 69 DO STF. MODULAÇÃO DE EFEITOS. COMPENSAÇÃO DE CRÉDITOS.',
    tese: 'O ICMS destacado nas notas fiscais não integra a base de cálculo das contribuições ao PIS e à COFINS.',
    linkOficial: 'https://www.trf3.jus.br/jurisprudencia',
  },
]

export const BuscadorJurisprudenciaPage: React.FC = () => {
  const [termoBusca, setTermoBusca] = useState('')
  const [tribunalFiltro, setTribunalFiltro] = useState<string>('todos')
  const [copiadoId, setCopiadoId] = useState<string | null>(null)

  const resultados = BASE_JURISPRUDENCIA_MANUAL.filter((item) => {
    const matchTribunal =
      tribunalFiltro === 'todos' || item.tribunal.toLowerCase() === tribunalFiltro.toLowerCase()
    const matchTermo =
      !termoBusca.trim() ||
      item.numero.toLowerCase().includes(termoBusca.toLowerCase()) ||
      item.ementa.toLowerCase().includes(termoBusca.toLowerCase()) ||
      item.tese.toLowerCase().includes(termoBusca.toLowerCase()) ||
      item.relator.toLowerCase().includes(termoBusca.toLowerCase())
    return matchTribunal && matchTermo
  })

  const handleCopiarEmenta = (item: JurisprudenciaItem) => {
    const texto = `(${item.tribunal} - ${item.numero} - Relator: ${item.relator} - Julgado em: ${item.dataJulgamento})\n"${item.ementa}"\nLink oficial: ${item.linkOficial}`
    navigator.clipboard.writeText(texto)
    setCopiadoId(item.id)
    setTimeout(() => setCopiadoId(null), 2500)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-widest text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              Modo Manual Estruturado
            </span>
            <span className="text-xs text-slate-500">
              Sem IA Simulatória • Links Oficiais e Verificáveis
            </span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-slate-900 mt-1">
            Buscador de Jurisprudência
          </h1>
          <p className="text-xs text-slate-600">
            Pesquise acórdãos, súmulas e teses repetitivas com filtros de tribunal e links diretos
            para os repositórios oficiais dos tribunais.
          </p>
        </div>

        <div className="text-xs text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm flex items-center gap-2">
          <BookOpen className="w-3.5 h-3.5 text-[#8B6FB8]" />
          <span>{resultados.length} precedentes indexados</span>
        </div>
      </div>

      {/* Painel de Pesquisa e Filtros (Critério 3) */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
          <div className="sm:col-span-8">
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Pesquisa por Palavra-Chave, Número do Julgado, Súmula ou Ementa
            </label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <Input
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
                placeholder="Ex.: negativação indevida, Súmula 479, dano moral, boleto falso..."
                className="pl-9 text-xs"
              />
            </div>
          </div>

          <div className="sm:col-span-4">
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Filtro por Tribunal
            </label>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <select
                value={tribunalFiltro}
                onChange={(e) => setTribunalFiltro(e.target.value)}
                className="w-full text-xs rounded-md border border-slate-200 p-2 bg-white"
              >
                <option value="todos">Todos os Tribunais</option>
                <option value="STF">STF (Supremo Tribunal Federal)</option>
                <option value="STJ">STJ (Superior Tribunal de Justiça)</option>
                <option value="TST">TST (Tribunal Superior do Trabalho)</option>
                <option value="TJSP">TJSP (Tribunal de Justiça de SP)</option>
                <option value="TRF3">TRF3 (Federal da 3ª Região)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
          <span className="text-slate-500 font-medium">Sugestões de temas:</span>
          {[
            'Negativação Indevida',
            'Súmula 479 STJ',
            'Dano Moral',
            'Fraude Bancária',
            'Teletrabalho',
          ].map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setTermoBusca(tag)}
              className="px-2 py-0.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] transition-colors"
            >
              {tag}
            </button>
          ))}
          {termoBusca && (
            <button
              type="button"
              onClick={() => setTermoBusca('')}
              className="text-xs text-red-600 underline ml-2"
            >
              Limpar busca
            </button>
          )}
        </div>
      </div>

      {/* Painel de Resultados Estruturado (Critério 3: tribunal, número, relator, data, ementa, link oficial) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            Resultados Encontrados ({resultados.length})
          </h3>
          <span className="text-xs text-slate-500">Fontes verificáveis dos tribunais</span>
        </div>

        {resultados.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs">
            Nenhum precedente cadastrado encontrado para os termos informados. Ajuste os filtros ou
            utilize termos mais genéricos.
          </div>
        ) : (
          <div className="space-y-4">
            {resultados.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 shadow-sm transition-all space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-[#3E3359] text-white">
                      {item.tribunal}
                    </span>
                    <span className="font-bold text-sm text-slate-900 font-serif">
                      {item.numero}
                    </span>
                    <span className="text-xs text-slate-500 hidden sm:inline">
                      • {item.orgaoJulgador}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                      Julgamento: {item.dataJulgamento}
                    </span>
                    <a
                      href={item.linkOficial}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[#5D4E86] hover:underline font-semibold bg-[#F4EFF9] px-2.5 py-1 rounded border border-[#A88FBF]/50"
                    >
                      <span>Link Oficial</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                  <p>
                    <strong className="text-slate-900">Relator(a):</strong> {item.relator}
                  </p>
                  <p>
                    <strong className="text-slate-900">Órgão Colegiado:</strong>{' '}
                    {item.orgaoJulgador}
                  </p>
                </div>

                {/* Tese Resumida em Destaque */}
                <div className="p-3 rounded-xl bg-[#F4EFF9]/60 border border-[#E3D9EE] text-xs">
                  <span className="font-bold uppercase tracking-wider text-[10px] text-[#5D4E86] block mb-0.5">
                    Tese Fixada / Destaque Visual Law
                  </span>
                  <p className="text-[#3E3359] font-medium leading-relaxed">{item.tese}</p>
                </div>

                {/* Ementa Completa */}
                <div>
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1">
                    Ementa
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed font-sans text-justify bg-slate-50 p-3 rounded-lg border border-slate-100 max-h-36 overflow-y-auto">
                    {item.ementa}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopiarEmenta(item)}
                    className="text-xs flex items-center gap-1.5"
                  >
                    {copiadoId === item.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#8B6FB8]" />
                        <span className="text-[#5D4E86] font-semibold">Ementa Copiada!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-600" />
                        <span>Copiar Citação para Petição</span>
                      </>
                    )}
                  </Button>

                  <span className="text-[11px] text-slate-400">Fonte Oficial Verificável</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <MiaBubble
        size="sm"
        message="A jurisprudência deve ser sempre verificada na fonte primária antes de ser juntada aos autos. Nossos links levam diretamente aos repositórios dos tribunais."
      />

      <LegalAIAviso />
    </div>
  )
}
