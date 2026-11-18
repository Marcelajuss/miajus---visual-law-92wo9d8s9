// Store local no navegador para MiaJus - Visual Law
// Não há banco de dados conectado: dados de exemplo e salvamento no localStorage sem simular persistência real

export interface AcervoItem {
  id: string
  nome: string
  tipo:
    | 'peticao'
    | 'contrato'
    | 'procuracao'
    | 'recurso'
    | 'fluxograma'
    | 'linha_tempo'
    | 'tabela'
    | 'grafico'
    | 'qr_code'
  tipoFormatado: string
  dataCriacao: string
  conteudo: string
  autor?: string
  versao?: string
}

export interface NotaItem {
  id: string
  titulo: string
  texto: string
  cor: string
  assunto: string
  dataCriacao: string
  anexos?: string[]
}

export interface CompromissoItem {
  id: string
  titulo: string
  data: string
  horario: string
  categoria: 'Prazo Fatal' | 'Audiência' | 'Reunião' | 'Diligência' | 'Protocolo'
  cor: string
  lembrete: string
  processo?: string
}

const STORAGE_ACERVO_KEY = 'miajus_meu_acervo_v1'
const STORAGE_NOTAS_KEY = 'miajus_bloco_notas_v1'
const STORAGE_AGENDA_KEY = 'miajus_agenda_v1'

const ACERVO_INICIAL: AcervoItem[] = [
  {
    id: 'proj-1',
    nome: 'Petição Inicial com Visual Law - Indenizatória Cível',
    tipo: 'peticao',
    tipoFormatado: 'Petição Inicial',
    dataCriacao: '15/03/2025',
    autor: 'Dra. Camila Nogueira',
    versao: '1.2',
    conteudo: `EXCELENTÍSSIMO SENHOR DOUTOR JUIZ DE DIREITO DA 3ª VARA CÍVEL DA COMARCA DE SÃO PAULO/SP

[RESUMO VISUAL DOS FATOS]
• Fato Gerador: Inscrição indevida nos órgãos de proteção ao crédito ocorrida em 12/01/2025.
• Danos Comprovados: Perda de contratação de financiamento imobiliário e abalo de crédito.
• Valor Pleiteado: R$ 18.000,00 a título de reparação extrapatrimonial.

I. DOS FATOS EM SÍNTESE
A parte Autora sempre manteve rigorosa pontualidade em seus compromissos...`,
  },
  {
    id: 'proj-2',
    nome: 'Contrato de Prestação de Serviços Jurídicos com QR Code e Linha do Tempo',
    tipo: 'contrato',
    tipoFormatado: 'Contrato',
    dataCriacao: '12/03/2025',
    autor: 'Dr. Lucas Ferreira',
    versao: '2.0',
    conteudo: `CONTRATO DE HONORÁRIOS E CONSULTORIA JURÍDICA

CLÁUSULA PRIMEIRA - DO OBJETO E ETAPAS
Este instrumento regula o patrocínio das causas trabalhistas do CONTRATANTE com acompanhamento em tempo real por QR Code de rastreio.`,
  },
  {
    id: 'proj-3',
    nome: 'Recurso de Apelação - Linha do Tempo de Prescrição Quinquenal',
    tipo: 'recurso',
    tipoFormatado: 'Recurso de Apelação',
    dataCriacao: '10/03/2025',
    autor: 'Dra. Camila Nogueira',
    versao: '1.0',
    conteudo: `EGRÉGIO TRIBUNAL DE JUSTIÇA DO ESTADO DE SÃO PAULO

SÍNTESE CRONOLÓGICA DA PRESCRIÇÃO
Demonstra-se de forma inequívoca o transcurso de mais de 5 anos entre o fato gerador e a propositura da demanda originária.`,
  },
  {
    id: 'proj-4',
    nome: 'Procuração Ad Judicia Et Extra com QR Code de Validação',
    tipo: 'procuracao',
    tipoFormatado: 'Procuração',
    dataCriacao: '08/03/2025',
    autor: 'MiaJus Visual Law',
    versao: '1.1',
    conteudo: `INSTRUMENTO PARTICULAR DE PROCURAÇÃO

OUTORGANTE: Qualificação completa em destaque.
OUTORGADOS: Nogueira & Ferreira Sociedade de Advogados.
PODERES: Gerais para o foro e específicos com assinatura digital certificada.`,
  },
  {
    id: 'proj-5',
    nome: 'Fluxograma de Cobrança Extrajudicial e Protesto de Título',
    tipo: 'fluxograma',
    tipoFormatado: 'Fluxograma',
    dataCriacao: '05/03/2025',
    autor: 'Equipe de Recuperação de Crédito',
    versao: '1.0',
    conteudo: `Etapas estruturadas: Notificação Prévia (5 dias) -> Tentativa de Acordo Amigável -> Envio ao Cartório de Protesto -> Execução de Título Judicial.`,
  },
  {
    id: 'proj-6',
    nome: 'Tabela de Danos Morais Arbitrados pelo TJSP em Casos Análogos',
    tipo: 'tabela',
    tipoFormatado: 'Tabela',
    dataCriacao: '01/03/2025',
    autor: 'Dr. Lucas Ferreira',
    versao: '1.0',
    conteudo: `Comparativo de 12 acórdãos recentes com média de condenação em R$ 15.000,00.`,
  },
]

const NOTAS_INICIAIS: NotaItem[] = [
  {
    id: 'nota-1',
    titulo: 'Padrão de Cores e Tipografia para Petições Cíveis',
    texto:
      'Utilizar lilás (#8B6FB8) para caixas de destaques fáticos e cinza neutro (#4B5563) para notas de rodapé e citações doutrinárias. Fontes recomendadas: sans-serif limpa para visual e serif clássica para fundamentação.',
    cor: '#F4EFF9',
    assunto: 'Design Visual Law',
    dataCriacao: '14/03/2025',
    anexos: ['guia_visual_law_2025.pdf'],
  },
  {
    id: 'nota-2',
    titulo: 'Checklist de Elementos Visuais antes do Protocolo',
    texto:
      '1. Verificar contraste para impressão em preto e branco.\n2. Testar legibilidade de QR Codes com smartphone.\n3. Conferir se títulos e resumos não excedem 3 linhas.\n4. Incluir aviso legal da fonte de dados.',
    cor: '#FEF3C7',
    assunto: 'Qualidade Técnica',
    dataCriacao: '11/03/2025',
  },
  {
    id: 'nota-3',
    titulo: 'Resumo da Tese: Desvio Produtivo do Consumidor',
    texto:
      'Tese consolidada no STJ (Tema do tempo vital). Fundamentar com a perda de tempo útil tentando solucionar falha evidente do serviço bancário sem êxito.',
    cor: '#ECFDF5',
    assunto: 'Direito do Consumidor',
    dataCriacao: '09/03/2025',
  },
]

const AGENDA_INICIAL: CompromissoItem[] = [
  {
    id: 'agenda-1',
    titulo: 'Prazo Fatal: Réplica à Contestação - Proc. 1029384-55.2024.8.26.0100',
    data: '2025-03-24',
    horario: '18:00',
    categoria: 'Prazo Fatal',
    cor: '#EF4444',
    lembrete: 'Notificar cliente e juntar comprovante às 15:00',
    processo: '1029384-55.2024.8.26.0100 (3ª Vara Cível SP)',
  },
  {
    id: 'agenda-2',
    titulo: 'Audiência de Instrução e Julgamento Virtual (1ª Vara do Trabalho)',
    data: '2025-03-26',
    horario: '14:30',
    categoria: 'Audiência',
    cor: '#8B6FB8',
    lembrete: 'Testar link Zoom 30 minutos antes e alinhar testemunhas',
    processo: '0001244-89.2024.5.02.0001',
  },
  {
    id: 'agenda-3',
    titulo: 'Reunião de Apresentação de Peça em Visual Law com Diretoria do Cliente',
    data: '2025-03-28',
    horario: '10:00',
    categoria: 'Reunião',
    cor: '#A88FBF',
    lembrete: 'Projetar pré-visualização e QR Code interativo',
    processo: 'Consultoria Preventiva',
  },
  {
    id: 'agenda-4',
    titulo: 'Diligência Presencial: Despacho com Magistrado',
    data: '2025-03-31',
    horario: '15:00',
    categoria: 'Diligência',
    cor: '#C9A8E0',
    lembrete: 'Levar 1 cópia impressa colorida do resumo Visual Law',
    processo: '2019283-11.2024.8.26.0000 (Agravo)',
  },
]

// Helpers de Acervo
export function getAcervo(): AcervoItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_ACERVO_KEY)
    if (!raw) {
      localStorage.setItem(STORAGE_ACERVO_KEY, JSON.stringify(ACERVO_INICIAL))
      return ACERVO_INICIAL
    }
    return JSON.parse(raw)
  } catch {
    return ACERVO_INICIAL
  }
}

export function salvarAcervoItem(
  item: Omit<AcervoItem, 'id' | 'dataCriacao'> & { id?: string },
): AcervoItem {
  const itens = getAcervo()
  const hoje = new Date().toLocaleDateString('pt-BR')
  let novoItem: AcervoItem

  if (item.id) {
    const index = itens.findIndex((i) => i.id === item.id)
    if (index >= 0) {
      novoItem = {
        ...itens[index],
        ...item,
        id: item.id,
        dataCriacao: itens[index].dataCriacao || hoje,
      }
      itens[index] = novoItem
    } else {
      novoItem = {
        ...item,
        id: item.id,
        dataCriacao: hoje,
      }
      itens.unshift(novoItem)
    }
  } else {
    novoItem = {
      ...item,
      id: 'proj-' + Date.now(),
      dataCriacao: hoje,
    }
    itens.unshift(novoItem)
  }

  try {
    localStorage.setItem(STORAGE_ACERVO_KEY, JSON.stringify(itens))
  } catch (e) {
    console.warn('Erro ao salvar no localStorage:', e)
  }
  return novoItem
}

export function excluirAcervoItem(id: string): void {
  const itens = getAcervo().filter((i) => i.id !== id)
  try {
    localStorage.setItem(STORAGE_ACERVO_KEY, JSON.stringify(itens))
  } catch (e) {
    console.warn('Erro ao excluir no localStorage:', e)
  }
}

export function duplicarAcervoItem(id: string): AcervoItem | null {
  const itens = getAcervo()
  const item = itens.find((i) => i.id === id)
  if (!item) return null

  const copia: AcervoItem = {
    ...item,
    id: 'proj-' + Date.now(),
    nome: `${item.nome} (Cópia)`,
    dataCriacao: new Date().toLocaleDateString('pt-BR'),
  }
  itens.unshift(copia)
  try {
    localStorage.setItem(STORAGE_ACERVO_KEY, JSON.stringify(itens))
  } catch (e) {
    console.warn(e)
  }
  return copia
}

// Helpers de Notas
export function getNotas(): NotaItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_NOTAS_KEY)
    if (!raw) {
      localStorage.setItem(STORAGE_NOTAS_KEY, JSON.stringify(NOTAS_INICIAIS))
      return NOTAS_INICIAIS
    }
    return JSON.parse(raw)
  } catch {
    return NOTAS_INICIAIS
  }
}

export function salvarNota(item: Omit<NotaItem, 'id' | 'dataCriacao'> & { id?: string }): NotaItem {
  const notas = getNotas()
  const hoje = new Date().toLocaleDateString('pt-BR')
  let novaNota: NotaItem

  if (item.id) {
    const idx = notas.findIndex((n) => n.id === item.id)
    if (idx >= 0) {
      novaNota = { ...notas[idx], ...item, id: item.id }
      notas[idx] = novaNota
    } else {
      novaNota = { ...item, id: item.id, dataCriacao: hoje }
      notas.unshift(novaNota)
    }
  } else {
    novaNota = { ...item, id: 'nota-' + Date.now(), dataCriacao: hoje }
    notas.unshift(novaNota)
  }

  try {
    localStorage.setItem(STORAGE_NOTAS_KEY, JSON.stringify(notas))
  } catch (e) {
    console.warn(e)
  }
  return novaNota
}

export function excluirNota(id: string): void {
  const notas = getNotas().filter((n) => n.id !== id)
  try {
    localStorage.setItem(STORAGE_NOTAS_KEY, JSON.stringify(notas))
  } catch (e) {
    console.warn(e)
  }
}

// Helpers de Agenda
export function getAgenda(): CompromissoItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_AGENDA_KEY)
    if (!raw) {
      localStorage.setItem(STORAGE_AGENDA_KEY, JSON.stringify(AGENDA_INICIAL))
      return AGENDA_INICIAL
    }
    return JSON.parse(raw)
  } catch {
    return AGENDA_INICIAL
  }
}

export function salvarCompromisso(
  item: Omit<CompromissoItem, 'id'> & { id?: string },
): CompromissoItem {
  const agenda = getAgenda()
  let novo: CompromissoItem

  if (item.id) {
    const idx = agenda.findIndex((a) => a.id === item.id)
    if (idx >= 0) {
      novo = { ...agenda[idx], ...item, id: item.id }
      agenda[idx] = novo
    } else {
      novo = { ...item, id: item.id }
      agenda.push(novo)
    }
  } else {
    novo = { ...item, id: 'agenda-' + Date.now() }
    agenda.push(novo)
  }

  try {
    localStorage.setItem(STORAGE_AGENDA_KEY, JSON.stringify(agenda))
  } catch (e) {
    console.warn(e)
  }
  return novo
}

export function excluirCompromisso(id: string): void {
  const agenda = getAgenda().filter((a) => a.id !== id)
  try {
    localStorage.setItem(STORAGE_AGENDA_KEY, JSON.stringify(agenda))
  } catch (e) {
    console.warn(e)
  }
}
