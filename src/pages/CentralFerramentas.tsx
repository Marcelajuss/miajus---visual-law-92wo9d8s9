import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FERRAMENTAS_OFICIAIS, ToolDefinition } from '@/lib/toolsData'
import { MiaCharacter } from '@/components/MiaCharacter'
import { LegalAIAviso } from '@/components/MiaJusLogo'
import { AIStatusModal } from '@/components/AIStatusModal'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Sparkles, ShieldAlert, Layers } from 'lucide-react'

export const CentralFerramentas: React.FC = () => {
  const navigate = useNavigate()
  const [selectedIaTool, setSelectedIaTool] = useState<ToolDefinition | null>(null)

  // O cartão destacado horizontal com a Mia: Gerador de Documentos com IA
  const destaqueTool = FERRAMENTAS_OFICIAIS.find((t) => t.id === 'gerador-documentos-ia')
  const outrasFerramentas = FERRAMENTAS_OFICIAIS.filter((t) => t.id !== 'gerador-documentos-ia')

  const handleCardClick = (tool: ToolDefinition) => {
    // Se a ferramenta exige IA e não está implementada nesta v1, abrimos modal explicativo
    if (tool.exigeIa && !tool.iaImplementada && tool.id !== 'gerador-documentos-ia') {
      setSelectedIaTool(tool)
      return
    }
    navigate(tool.rota)
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Boas-vindas e introdução discreta */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
            Central de Ferramentas
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Ambiente integrado para concepção, diagramação e organização de peças jurídicas em
            Visual Law com foco na clareza e persuasão judiciária.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-100/80 px-3 py-1.5 rounded-lg border border-slate-200 self-start md:self-auto">
          <Layers className="w-3.5 h-3.5 text-slate-600" />
          <span>Versão 1.0 • Modo Manual Estruturado</span>
        </div>
      </div>

      {/* Cartão horizontal destacado: Gerador de Documentos com IA com a Mia (Critério 1) */}
      {destaqueTool && (
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
            {/* Personagem Mia em destaque */}
            <div className="flex flex-col items-center flex-shrink-0">
              <MiaCharacter size="lg" expression="happy" className="bg-white/10 rounded-2xl p-1" />
              <span className="text-[11px] font-medium text-amber-300 mt-1.5 tracking-wider uppercase">
                Mia • Assistente
              </span>
            </div>

            <div className="flex-1 text-center sm:text-left space-y-3">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-300/30">
                  Fluxo Prioritário
                </span>
                <span className="text-xs text-slate-300">
                  Gerador de Documentos com IA &rarr; Formatação Inteligente &rarr; Meu Acervo
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-white">
                {destaqueTool.nome}
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
                Crie petições, contratos e recursos já estruturados nos preceitos do Visual Law. No
                momento, o fluxo funciona no <strong>modo manual guiado</strong> na Formatação
                Inteligente. A geração automática por IA será habilitada assim que a chave do modelo
                de linguagem for integrada.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <Button
                  onClick={() => navigate('/formatacao-inteligente?modo=novo')}
                  className="bg-white text-slate-900 hover:bg-slate-100 font-semibold text-xs px-4 py-2 rounded-lg shadow"
                >
                  <Sparkles className="w-4 h-4 mr-2 text-amber-600" />
                  Iniciar Peça na Formatação Inteligente
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setSelectedIaTool(destaqueTool)}
                  className="bg-transparent text-slate-200 border-slate-600 hover:bg-white/10 text-xs px-3 py-2 rounded-lg"
                >
                  Status da Conexão IA
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grade de cartões das 13 ferramentas restantes (total 14 oficiais) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-800 tracking-tight">
            Ferramentas Disponíveis
          </h3>
          <span className="text-xs text-slate-500">
            {outrasFerramentas.length + (destaqueTool ? 1 : 0)} ferramentas mapeadas
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {outrasFerramentas.map((tool) => {
            const Icon = tool.icone
            return (
              <div
                key={tool.id}
                onClick={() => handleCardClick(tool)}
                className="group relative flex flex-col justify-between p-5 rounded-xl border border-slate-200/90 bg-white hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer select-none"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex items-center gap-1.5">
                      {/* Selo IA: conforme item (2), o selo "IA" só aparece se iaImplementada === true */}
                      {tool.iaImplementada ? (
                        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-200 text-[10px] uppercase font-bold tracking-wider">
                          IA Ativa
                        </Badge>
                      ) : tool.exigeIa ? (
                        <Badge
                          variant="outline"
                          className="text-slate-500 border-slate-300 text-[10px] bg-slate-50 font-medium"
                        >
                          Aguardando IA
                        </Badge>
                      ) : null}
                    </div>
                  </div>

                  <h4 className="text-base font-serif font-bold text-slate-900 group-hover:text-slate-950 transition-colors">
                    {tool.nome}
                  </h4>

                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {tool.descricaoCurta}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700 group-hover:text-slate-900">
                  <span>
                    {tool.exigeIa && !tool.iaImplementada
                      ? 'Ver Detalhes do Recurso'
                      : 'Abrir Ferramenta'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Aviso legal discreto sobre IA */}
      <LegalAIAviso />

      {/* Modal explicativo para ferramentas que aguardam IA */}
      {selectedIaTool && (
        <AIStatusModal
          open={!!selectedIaTool}
          onOpenChange={(open) => !open && setSelectedIaTool(null)}
          toolName={selectedIaTool.nome}
          toolDescription={selectedIaTool.descricaoCurta}
          fallbackRoute="/formatacao-inteligente"
          fallbackLabel="Acessar Formatação Inteligente (Modo Manual)"
        />
      )}
    </div>
  )
}
