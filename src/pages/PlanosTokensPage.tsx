import React from 'react'
import { MiaJusLogo } from '@/components/MiaJusLogo'
import { MiaCharacter } from '@/components/MiaCharacter'
import { Button } from '@/components/ui/button'
import { Check, Coins, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const PlanosTokensPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Cabeçalho */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs uppercase font-bold tracking-widest text-[#8B6FB8] bg-[#F4EFF9] px-2.5 py-1 rounded border border-[#E3D9EE]">
          Estrutura Visual da Plataforma
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
          Planos, Tokens e Histórico de Consumo
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Esta tela apresenta a estrutura visual de precificação e cotas de uso do MiaJus - Visual
          Law. Nesta versão v1, não há cobrança real nem débito financeiro.
        </p>
      </div>

      {/* Saldo de Tokens e Histórico Simulado */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Saldo Atual de Tokens</span>
            <Coins className="w-4 h-4 text-[#EC4899]" />
          </div>
          <p className="text-2xl font-serif font-bold text-slate-900">50.000</p>
          <p className="text-[11px] text-slate-500">Cota inicial de avaliação da v1</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Consumo Mensal</span>
            <Sparkles className="w-4 h-4 text-[#EC4899]" />
          </div>
          <p className="text-2xl font-serif font-bold text-slate-900">1.250</p>
          <p className="text-[11px] text-slate-500">Peças diagramadas no modo manual</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Status da Conta</span>
            <ShieldCheck className="w-4 h-4 text-[#EC4899]" />
          </div>
          <p className="text-2xl font-serif font-bold text-[#5D4E86]">Ativa (v1)</p>
          <p className="text-[11px] text-slate-500">
            Acesso irrestrito a todas as ferramentas manuais
          </p>
        </div>
      </div>

      {/* Grade de Planos Visuais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {/* Plano Básico */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-xs uppercase font-bold text-slate-500">Iniciante</span>
            <h3 className="text-xl font-serif font-bold text-slate-900">Individual</h3>
            <p className="text-2xl font-bold text-slate-900">
              R$ 89 <span className="text-xs font-normal text-slate-500">/mês (visual)</span>
            </p>
            <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#EC4899]" />
                Formatação Inteligente Visual Law
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#EC4899]" />
                Fluxogramas e Linhas do Tempo ilimitados
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#EC4899]" />
                Exportação em DOCX e PDF
              </li>
            </ul>
          </div>
          <Button variant="outline" className="w-full text-xs" disabled>
            Plano Estrutural (Sem Cobrança)
          </Button>
        </div>

        {/* Plano Pro (Destaque) */}
        <div
          className="p-6 rounded-2xl bg-grad-suave text-[#1A1523] shadow-md space-y-4 flex flex-col justify-between relative"
          style={{ borderWidth: 2, borderStyle: 'solid', borderColor: 'var(--iris-pink)' }}
        >
          <span className="absolute -top-3 right-6 bg-[#1A1523] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
            Mais Recomendado
          </span>
          <div className="space-y-3">
            <span className="text-xs uppercase font-bold text-[#1A1523]">Escritórios</span>
            <h3 className="text-xl font-serif font-bold text-[#1A1523]">Visual Law Pro</h3>
            <p className="text-2xl font-bold text-[#1A1523]">
              R$ 189 <span className="text-xs font-normal text-[#1A1523]">/mês (visual)</span>
            </p>
            <ul className="text-xs text-[#1A1523] space-y-2 pt-2 border-t border-[#A88FBF]">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#1A1523]" />
                Tudo do plano Individual
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#1A1523]" />
                QR Code com personalização de marca
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#1A1523]" />
                Acervo de Ícones completo
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#1A1523]" />
                Suporte prioritário via WhatsApp
              </li>
            </ul>
          </div>
          <Button className="bg-accent-lilas w-full text-xs font-semibold" disabled>
            Plano Ativo na Versão 1.0
          </Button>
        </div>

        {/* Plano Banca */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-xs uppercase font-bold text-slate-500">Corporativo</span>
            <h3 className="text-xl font-serif font-bold text-slate-900">Banca Jurídica</h3>
            <p className="text-2xl font-bold text-slate-900">
              R$ 389 <span className="text-xs font-normal text-slate-500">/mês (visual)</span>
            </p>
            <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#EC4899]" />
                Multi-usuários para o escritório
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#EC4899]" />
                Identidade visual institucional exclusiva
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#EC4899]" />
                Biblioteca compartilhada de modelos
              </li>
            </ul>
          </div>
          <Button variant="outline" className="w-full text-xs" disabled>
            Plano Estrutural (Sem Cobrança)
          </Button>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 text-center">
        <strong>Nota explicativa:</strong> Conforme definido na especificação do projeto, planos,
        tokens e histórico de consumo aparecem apenas como estrutura visual nesta versão v1, sem
        cobrança real.
      </div>
    </div>
  )
}
