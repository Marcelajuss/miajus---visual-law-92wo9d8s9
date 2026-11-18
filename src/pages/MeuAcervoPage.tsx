import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  getAcervo,
  excluirAcervoItem,
  duplicarAcervoItem,
  salvarAcervoItem,
  AcervoItem,
} from '@/lib/storage'
import { exportToDocx } from '@/lib/exportUtils'
import { MiaBubble } from '@/components/MiaCharacter'
import { LegalAIAviso } from '@/components/MiaJusLogo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  FolderArchive,
  Search,
  Plus,
  Edit3,
  Copy,
  Trash2,
  Download,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Filter,
  FileText,
  Workflow,
  GitCommit,
  Table as TableIcon,
  BarChart3,
  QrCode,
} from 'lucide-react'

export const MeuAcervoPage: React.FC = () => {
  const navigate = useNavigate()
  const [itens, setItens] = useState<AcervoItem[]>([])
  const [busca, setBusca] = useState('')
  const [filtroTipo, setFiltroTipo] = useState<string>('todos')
  const [paginaAtual, setPaginaAtual] = useState(1)
  const ITENS_POR_PAGINA = 5

  // Modal de renomear
  const [itemRenomear, setItemRenomear] = useState<AcervoItem | null>(null)
  const [novoNome, setNovoNome] = useState('')

  // Modal de confirmação de exclusão
  const [itemExcluir, setItemExcluir] = useState<AcervoItem | null>(null)

  const carregarItens = () => {
    setItens(getAcervo())
  }

  useEffect(() => {
    carregarItens()
  }, [])

  // Filtragem
  const itensFiltrados = itens.filter((i) => {
    const matchTipo = filtroTipo === 'todos' || i.tipo === filtroTipo
    const matchBusca =
      !busca.trim() ||
      i.nome.toLowerCase().includes(busca.toLowerCase()) ||
      i.tipoFormatado.toLowerCase().includes(busca.toLowerCase())
    return matchTipo && matchBusca
  })

  // Paginação
  const totalPaginas = Math.ceil(itensFiltrados.length / ITENS_POR_PAGINA) || 1
  const itensPaginados = itensFiltrados.slice(
    (paginaAtual - 1) * ITENS_POR_PAGINA,
    paginaAtual * ITENS_POR_PAGINA,
  )

  const handleAbrir = (item: AcervoItem) => {
    if (['peticao', 'contrato', 'procuracao', 'recurso'].includes(item.tipo)) {
      navigate(`/formatacao-inteligente?id=${item.id}`)
    } else if (item.tipo === 'fluxograma') {
      navigate('/fluxograma')
    } else if (item.tipo === 'linha_tempo') {
      navigate('/linha-tempo')
    } else if (item.tipo === 'tabela') {
      navigate('/tabela')
    } else if (item.tipo === 'grafico') {
      navigate('/grafico')
    } else if (item.tipo === 'qr_code') {
      navigate('/gerador-qr-code')
    } else {
      navigate(`/formatacao-inteligente?id=${item.id}`)
    }
  }

  const handleDuplicar = (id: string) => {
    duplicarAcervoItem(id)
    carregarItens()
  }

  const handleConfirmarExcluir = () => {
    if (itemExcluir) {
      excluirAcervoItem(itemExcluir.id)
      setItemExcluir(null)
      carregarItens()
    }
  }

  const handleSalvarRenomear = () => {
    if (itemRenomear && novoNome.trim()) {
      salvarAcervoItem({
        ...itemRenomear,
        nome: novoNome.trim(),
      })
      setItemRenomear(null)
      setNovoNome('')
      carregarItens()
    }
  }

  const handleBaixar = (item: AcervoItem) => {
    exportToDocx(
      item.nome,
      `<p><strong>${item.nome}</strong></p><pre style="white-space:pre-wrap;">${item.conteudo}</pre>`,
    )
  }

  const getIconeTipo = (tipo: string) => {
    switch (tipo) {
      case 'fluxograma':
        return Workflow
      case 'linha_tempo':
        return GitCommit
      case 'tabela':
        return TableIcon
      case 'grafico':
        return BarChart3
      case 'qr_code':
        return QrCode
      default:
        return FileText
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
            Repositório Local do Navegador
          </span>
          <h1 className="text-2xl font-serif font-bold text-slate-900 mt-1">Meu Acervo</h1>
          <p className="text-xs text-slate-600">
            Central de projetos, petições, fluxogramas e tabelas salvas com ações completas de
            gestão.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => navigate('/formatacao-inteligente?modo=novo')}
            className="bg-grad-primario bg-grad-primario-hover text-white text-xs flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Novo Projeto Visual Law</span>
          </Button>
        </div>
      </div>

      {/* Barra de Pesquisa e Filtros (Critério 4) */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <Input
            value={busca}
            onChange={(e) => {
              setBusca(e.target.value)
              setPaginaAtual(1)
            }}
            placeholder="Pesquisar projetos salvos..."
            className="pl-9 text-xs"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <select
            value={filtroTipo}
            onChange={(e) => {
              setFiltroTipo(e.target.value)
              setPaginaAtual(1)
            }}
            className="text-xs rounded-md border border-slate-200 p-2 bg-white w-full sm:w-48"
          >
            <option value="todos">Todos os Tipos</option>
            <option value="peticao">Petição Inicial</option>
            <option value="contrato">Contrato</option>
            <option value="recurso">Recurso de Apelação</option>
            <option value="procuracao">Procuração</option>
            <option value="fluxograma">Fluxograma</option>
            <option value="linha_tempo">Linha do Tempo</option>
            <option value="tabela">Tabela</option>
            <option value="grafico">Gráfico</option>
            <option value="qr_code">QR Code</option>
          </select>
        </div>
      </div>

      {/* Tabela de Projetos Salvos com Ações e Paginação (Critério 4) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                <th className="p-3.5">Nome do Projeto</th>
                <th className="p-3.5">Tipo do Modelo</th>
                <th className="p-3.5">Data de Criação</th>
                <th className="p-3.5">Versão / Autor</th>
                <th className="p-3.5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {itensPaginados.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">
                    Nenhum projeto encontrado no seu acervo para esta consulta.
                  </td>
                </tr>
              ) : (
                itensPaginados.map((item) => {
                  const Icon = getIconeTipo(item.tipo)
                  return (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900 max-w-xs sm:max-w-md">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-slate-500 flex-shrink-0" />
                          <span className="truncate" title={item.nome}>
                            {item.nome}
                          </span>
                        </div>
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                          {item.tipoFormatado}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-500 font-mono">{item.dataCriacao}</td>
                      <td className="p-3.5 text-slate-500">
                        {item.versao ? `v${item.versao}` : 'v1.0'} • {item.autor || 'Você'}
                      </td>
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleAbrir(item)}
                            className="h-7 px-2 text-xs text-[#5D4E86] hover:text-[#3E3359]"
                            title="Abrir / Editar"
                          >
                            Abrir
                          </Button>

                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setItemRenomear(item)
                              setNovoNome(item.nome)
                            }}
                            className="h-7 px-2 text-xs text-slate-600 hover:text-slate-900"
                            title="Renomear"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </Button>

                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDuplicar(item.id)}
                            className="h-7 px-2 text-xs text-slate-600 hover:text-slate-900"
                            title="Duplicar"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </Button>

                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleBaixar(item)}
                            className="h-7 px-2 text-xs text-slate-600 hover:text-slate-900"
                            title="Baixar DOCX"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </Button>

                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setItemExcluir(item)}
                            className="h-7 px-2 text-xs text-slate-400 hover:text-red-600"
                            title="Excluir"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Rodapé da Tabela com Paginação */}
        <div className="p-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-600">
          <span>
            Mostrando {itensPaginados.length} de {itensFiltrados.length} projetos
          </span>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={paginaAtual <= 1}
              onClick={() => setPaginaAtual((p) => Math.max(1, p - 1))}
              className="h-7 px-2 text-xs"
            >
              <ChevronLeft className="w-3.5 h-3.5 mr-1" />
              Anterior
            </Button>
            <span className="font-semibold text-slate-900">
              Página {paginaAtual} de {totalPaginas}
            </span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={paginaAtual >= totalPaginas}
              onClick={() => setPaginaAtual((p) => Math.min(totalPaginas, p + 1))}
              className="h-7 px-2 text-xs"
            >
              Próxima
              <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </div>
      </div>

      <MiaBubble
        size="sm"
        message="Nesta versão v1, seus arquivos ficam salvos com segurança no armazenamento local do seu navegador. Mantenha cópias exportadas em DOCX e PDF das suas peças principais."
      />

      <LegalAIAviso />

      {/* Modal Renomear */}
      {itemRenomear && (
        <Dialog open={!!itemRenomear} onOpenChange={(open) => !open && setItemRenomear(null)}>
          <DialogContent className="sm:max-w-md bg-white">
            <DialogHeader>
              <DialogTitle className="text-base font-serif font-bold text-slate-900">
                Renomear Projeto
              </DialogTitle>
            </DialogHeader>
            <div className="py-2">
              <Input
                value={novoNome}
                onChange={(e) => setNovoNome(e.target.value)}
                placeholder="Novo nome do projeto..."
                className="text-xs"
              />
            </div>
            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => setItemRenomear(null)}
              >
                Cancelar
              </Button>
              <Button
                size="sm"
                className="text-xs bg-grad-primario bg-grad-primario-hover text-white"
                onClick={handleSalvarRenomear}
              >
                Salvar Novo Nome
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Modal Excluir */}
      {itemExcluir && (
        <Dialog open={!!itemExcluir} onOpenChange={(open) => !open && setItemExcluir(null)}>
          <DialogContent className="sm:max-w-md bg-white">
            <DialogHeader>
              <DialogTitle className="text-base font-serif font-bold text-red-900">
                Confirmar Exclusão
              </DialogTitle>
            </DialogHeader>
            <p className="text-xs text-slate-600 py-2">
              Tem certeza de que deseja excluir o projeto <strong>"{itemExcluir.nome}"</strong>?
              Esta ação não pode ser desfeita no navegador.
            </p>
            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => setItemExcluir(null)}
              >
                Cancelar
              </Button>
              <Button
                size="sm"
                className="text-xs bg-red-600 hover:bg-red-700 text-white"
                onClick={handleConfirmarExcluir}
              >
                Excluir Definitivamente
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
