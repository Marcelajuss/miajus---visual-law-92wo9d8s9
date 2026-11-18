import React, { useState } from 'react'
import { MiaBubble } from '@/components/MiaCharacter'
import { LegalAIAviso } from '@/components/MiaJusLogo'
import { VoiceDictation } from '@/components/VoiceDictation'
import { AIStatusModal } from '@/components/AIStatusModal'
import { Button } from '@/components/ui/button'
import {
  Eye,
  FileText,
  FileCheck2,
  Cpu,
  ArrowRight,
  Palette,
  Sparkles,
  Layers,
  CheckCircle2,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface PendingIaPageProps {
  toolId: 'inteligencia-visual' | 'texto-otimizado' | 'resumo-documentos-juridicos'
  nome: string
  descricao: string
  exemploEntrada: string
  exemploSaida: string
}

export const PendingIaToolPage: React.FC<PendingIaPageProps> = ({
  toolId,
  nome,
  descricao,
  exemploEntrada,
  exemploSaida,
}) => {
  const navigate = useNavigate()
  const [modalAberto, setModalAberto] = useState(false)
  const [textoManual, setTextoManual] = useState(exemploEntrada)

  const IconMap = {
    'inteligencia-visual': Eye,
    'texto-otimizado': FileText,
    'resumo-documentos-juridicos': FileCheck2,
  }

  const ToolIcon = IconMap[toolId]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-widest text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              Módulo Estruturado
            </span>
            <span className="text-xs text-[#5D4E86] bg-[#F4EFF9] px-2 py-0.5 rounded border border-[#A88FBF]/40 font-medium">
              Aguardando Conexão de IA
            </span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-slate-900 mt-1">{nome}</h1>
          <p className="text-xs text-slate-600">{descricao}</p>
        </div>

        <Button
          onClick={() => setModalAberto(true)}
          variant="outline"
          className="text-xs flex items-center gap-1.5"
        >
          <Cpu className="w-3.5 h-3.5 text-[#8B6FB8]" />
          <span>Status da Conexão</span>
        </Button>
      </div>

      {/* Caixa de aviso de ativação futura sem botões decorativos */}
      <div className="p-4 rounded-xl bg-[#F4EFF9]/80 border border-[#E3D9EE] text-xs text-[#3E3359] space-y-2">
        <div className="flex items-center gap-2 font-bold text-[#3E3359]">
          <Cpu className="w-4 h-4 text-[#8B6FB8]" />
          <span>Recurso Estruturado no Plano v1</span>
        </div>
        <p className="leading-relaxed text-slate-700">
          Esta ferramenta exige conexão direta com um serviço de Inteligência Artificial para operar
          automaticamente. Nesta versão, nenhum resultado simulado é gerado como se fosse
          verdadeiro. Você pode redigir ou colar seu texto manualmente abaixo e migrá-lo diretamente
          para a <strong>Formatação Inteligente</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Entrada Manual */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Texto Jurídico para Análise Manual
            </label>
            <VoiceDictation onTranscript={(t) => setTextoManual((p) => p + ' ' + t)} />
          </div>

          <textarea
            value={textoManual}
            onChange={(e) => setTextoManual(e.target.value)}
            rows={10}
            className="w-full text-xs rounded-xl border border-slate-200 p-3 text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-400"
            placeholder="Cole a ementa, laudo pericial ou trecho contratual..."
          />

          <div className="pt-2 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">Modo de Edição Manual</span>
            <Button
              onClick={() => navigate('/formatacao-inteligente')}
              className="text-xs flex items-center gap-1.5"
            >
              <span>Aplicar na Formatação Inteligente</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        {/* Demonstração da Estrutura Visual Law Esperada */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-800 block">
            Padrão Estrutural de Saída (Visual Law)
          </span>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 whitespace-pre-line leading-relaxed font-sans">
            {exemploSaida}
          </div>

          <div className="p-3 rounded-lg bg-[#F4EFF9] border border-[#A88FBF]/40 text-[11px] text-[#3E3359]">
            <strong>Orientações de Plain English:</strong> Substitua expressões prolixas ("ad
            instar", "data venia", "in continenti") por linguagem direta, facilitando a decisão do
            juiz e a compreensão da parte.
          </div>
        </div>
      </div>

      <MiaBubble
        size="sm"
        message="A clareza do texto é a alma do Visual Law. Frases de até 25 palavras e divisão em tópicos numerados duplicam a retenção da leitura pelo juízo."
      />

      <LegalAIAviso />

      <AIStatusModal
        open={modalAberto}
        onOpenChange={setModalAberto}
        toolName={nome}
        toolDescription={descricao}
      />
    </div>
  )
}
