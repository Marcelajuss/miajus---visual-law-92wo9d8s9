import React, { useState } from 'react'
import {
  FolderArchive,
  Eye,
  FileText,
  FileCheck2,
  Shapes,
  QrCode,
  Scale,
  Sparkles,
  GitCommit,
  Workflow,
  Table as TableIcon,
  BarChart3,
  StickyNote,
  CalendarDays,
  Bot,
} from 'lucide-react'

export interface ToolDefinition {
  id: string
  nome: string // Nome oficial da ferramenta
  categoria: 'principal' | 'redacao' | 'visuais' | 'pesquisa' | 'organizacao'
  descricaoCurta: string
  icone: React.ComponentType<{ className?: string }>
  rota: string
  exigeIa: boolean
  iaImplementada: boolean // Nesta v1: false para ferramentas que dependem de IA externa
  destaque?: boolean
}

/**
 * 14 ferramentas oficiais conforme especificação estrita:
 * 1. Meu Acervo
 * 2. Inteligência Visual
 * 3. Texto Otimizado
 * 4. Resumo de Documentos Jurídicos
 * 5. Acervo de Ícones
 * 6. Gerador de QR Code
 * 7. Buscador de Jurisprudência
 * 8. Formatação Inteligente
 * 9. Linha do Tempo
 * 10. Fluxograma
 * 11. Tabela
 * 12. Gráfico
 * 13. Bloco de Notas Inteligente
 * 14. Agenda e Calendário Inteligente
 * E cartão especial: Gerador de Documentos com IA
 */
export const FERRAMENTAS_OFICIAIS: ToolDefinition[] = [
  {
    id: 'gerador-documentos-ia',
    nome: 'Gerador de Documentos com IA',
    categoria: 'principal',
    descricaoCurta:
      'Geração estruturada de minutas, petições e contratos em Visual Law. O fluxo prioritário integrará: Gerador de Documentos com IA → Formatação Inteligente → Meu Acervo.',
    icone: Bot,
    rota: '/formatacao-inteligente?modo=novo',
    exigeIa: true,
    iaImplementada: false, // Regra (2): sem IA conectada, selo IA falso NÃO deve ser exibido
    destaque: true,
  },
  {
    id: 'meu-acervo',
    nome: 'Meu Acervo',
    categoria: 'organizacao',
    descricaoCurta:
      'Gestão completa dos seus projetos e peças salvas, com pesquisa, renomear, duplicar e exportação.',
    icone: FolderArchive,
    rota: '/meu-acervo',
    exigeIa: false,
    iaImplementada: false,
  },
  {
    id: 'formatacao-inteligente',
    nome: 'Formatação Inteligente',
    categoria: 'redacao',
    descricaoCurta:
      'Editor em dois painéis para peças em Visual Law com cabeçalhos, destaques fáticos e pré-visualização A4.',
    icone: Sparkles,
    rota: '/formatacao-inteligente',
    exigeIa: false,
    iaImplementada: false,
  },
  {
    id: 'buscador-jurisprudencia',
    nome: 'Buscador de Jurisprudência',
    categoria: 'pesquisa',
    descricaoCurta:
      'Consulta manual e estruturada com filtros por tribunal (STF, STJ, TST, TJSP) e links oficiais verificáveis.',
    icone: Scale,
    rota: '/buscador-jurisprudencia',
    exigeIa: false,
    iaImplementada: false,
  },
  {
    id: 'fluxograma',
    nome: 'Fluxograma',
    categoria: 'visuais',
    descricaoCurta:
      'Criação e reordenação de etapas processuais, decisões e procedimentos com exportação e inserção na peça.',
    icone: Workflow,
    rota: '/fluxograma',
    exigeIa: false,
    iaImplementada: false,
  },
  {
    id: 'linha-tempo',
    nome: 'Linha do Tempo',
    categoria: 'visuais',
    descricaoCurta:
      'Cronologia de fatos, marcos temporais e prazos prescricionais organizada em painel visual personalizável.',
    icone: GitCommit,
    rota: '/linha-tempo',
    exigeIa: false,
    iaImplementada: false,
  },
  {
    id: 'tabela',
    nome: 'Tabela',
    categoria: 'visuais',
    descricaoCurta:
      'Tabelas comparativas de pedidos, liquidação de valores e teses jurídicas com formatação limpa.',
    icone: TableIcon,
    rota: '/tabela',
    exigeIa: false,
    iaImplementada: false,
  },
  {
    id: 'grafico',
    nome: 'Gráfico',
    categoria: 'visuais',
    descricaoCurta:
      'Editor visual de gráficos em barras e linhas para demonstrar evolução de valores e índices estatísticos.',
    icone: BarChart3,
    rota: '/grafico',
    exigeIa: false,
    iaImplementada: false,
  },
  {
    id: 'gerador-qr-code',
    nome: 'Gerador de QR Code',
    categoria: 'visuais',
    descricaoCurta:
      'Criação de QR Code funcional e legível para vídeos de sustentação, provas digitais e sites oficiais.',
    icone: QrCode,
    rota: '/gerador-qr-code',
    exigeIa: false,
    iaImplementada: false,
  },
  {
    id: 'acervo-icones',
    nome: 'Acervo de Ícones',
    categoria: 'visuais',
    descricaoCurta:
      'Biblioteca de ícones jurídicos essenciais (balança, martelo, contrato, aviso, prazos) com download PNG/SVG.',
    icone: Shapes,
    rota: '/acervo-icones',
    exigeIa: false,
    iaImplementada: false,
  },
  {
    id: 'bloco-notas-inteligente',
    nome: 'Bloco de Notas Inteligente',
    categoria: 'organizacao',
    descricaoCurta:
      'Anotações coloridas de audiências, teses e tesouros de petição com busca instantânea e anexos.',
    icone: StickyNote,
    rota: '/bloco-notas',
    exigeIa: false,
    iaImplementada: false,
  },
  {
    id: 'agenda-calendario-inteligente',
    nome: 'Agenda e Calendário Inteligente',
    categoria: 'organizacao',
    descricaoCurta:
      'Controle de prazos fatais, audiências virtuais e compromissos com visão diária, semanal e mensal.',
    icone: CalendarDays,
    rota: '/agenda',
    exigeIa: false,
    iaImplementada: false,
  },
  {
    id: 'inteligencia-visual',
    nome: 'Inteligência Visual',
    categoria: 'visuais',
    descricaoCurta:
      'Módulo de sugestões de diagramação e paletas de cores harmônicas para petições modernas.',
    icone: Eye,
    rota: '/inteligencia-visual',
    exigeIa: true,
    iaImplementada: false, // Avisa ativação futura
  },
  {
    id: 'texto-otimizado',
    nome: 'Texto Otimizado',
    categoria: 'redacao',
    descricaoCurta:
      'Simplificação de linguagem jurídica complexa para Plain English/Linguagem Cidadã acessível.',
    icone: FileText,
    rota: '/texto-otimizado',
    exigeIa: true,
    iaImplementada: false, // Avisa ativação futura
  },
  {
    id: 'resumo-documentos-juridicos',
    nome: 'Resumo de Documentos Jurídicos',
    categoria: 'redacao',
    descricaoCurta:
      'Síntese em tópicos executivos de laudos periciais, decisões extensas e contratos densos.',
    icone: FileCheck2,
    rota: '/resumo-documentos',
    exigeIa: true,
    iaImplementada: false, // Avisa ativação futura
  },
]
