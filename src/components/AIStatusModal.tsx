import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { MiaCharacter } from './MiaCharacter'
import { Cpu, CheckCircle2, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface AIStatusModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  toolName: string
  toolDescription: string
  fallbackRoute?: string
  fallbackLabel?: string
}

/**
 * Modal explicativo para ferramentas que exigem IA:
 * Conforme item (2) e (5): "NÃO há serviço de IA conectado — as que exigem IA e ainda não a têm
 * devem indicar que o recurso será ativado quando um serviço de IA for conectado, sem botões decorativos sem função."
 */
export const AIStatusModal: React.FC<AIStatusModalProps> = ({
  open,
  onOpenChange,
  toolName,
  toolDescription,
  fallbackRoute = '/formatacao-inteligente',
  fallbackLabel = 'Ir para Formatação Inteligente (Modo Manual)',
}) => {
  const navigate = useNavigate()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white border-slate-200">
        <DialogHeader className="flex flex-col items-center text-center pb-2">
          <MiaCharacter size="md" expression="guiding" className="mb-2" />
          <DialogTitle className="text-lg font-bold text-slate-900">{toolName}</DialogTitle>
          <DialogDescription className="text-sm text-slate-600 mt-1">
            {toolDescription}
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-xl border border-[#E3D9EE] bg-[#F4EFF9]/80 p-4 text-xs text-slate-700 space-y-2.5">
          <div className="flex items-center gap-2 font-semibold text-[#3E3359]">
            <Cpu className="w-4 h-4 text-[#8B6FB8]" />
            <span>Status do Recurso: Ativação Pendente</span>
          </div>
          <p className="leading-relaxed">
            Esta funcionalidade está estruturada e será ativada automaticamente assim que um serviço
            de inteligência artificial for conectado à plataforma pelo administrador.
          </p>
          <div className="pt-2 border-t border-[#E3D9EE] space-y-1.5">
            <p className="font-semibold text-[#5D4E86] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#8B6FB8]" />
              O que você já pode fazer agora no modo manual:
            </p>
            <ul className="list-disc list-inside text-slate-600 pl-1 space-y-0.5">
              <li>
                Criar e formatar peças visuais na <strong>Formatação Inteligente</strong>
              </li>
              <li>
                Montar <strong>Fluxogramas</strong>, <strong>Linhas do Tempo</strong>,{' '}
                <strong>Tabelas</strong> e <strong>Gráficos</strong>
              </li>
              <li>
                Gerar <strong>QR Codes</strong> funcionais e pesquisar no{' '}
                <strong>Buscador de Jurisprudência</strong>
              </li>
              <li>
                Organizar tudo no <strong>Meu Acervo</strong> localmente
              </li>
            </ul>
          </div>
        </div>

        <div className="rounded-lg bg-slate-50 border border-slate-200 px-3 py-2 text-[11px] text-slate-500">
          <strong>Aviso Ético:</strong> A inteligência artificial pode cometer erros. Revise e
          valide os documentos e informações antes de utilizá-los.
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            className="w-full sm:w-auto text-xs"
            onClick={() => onOpenChange(false)}
          >
            Fechar
          </Button>
          <Button
            type="button"
            className="w-full sm:w-auto text-xs bg-[#1A1523] hover:bg-[#2D2A32] text-white flex items-center justify-center gap-1.5"
            onClick={() => {
              onOpenChange(false)
              navigate(fallbackRoute)
            }}
          >
            <span>{fallbackLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
