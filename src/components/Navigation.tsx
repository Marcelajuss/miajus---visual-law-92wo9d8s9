import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MiaJusLogo } from './MiaJusLogo'
import { MiaCharacter } from './MiaCharacter'
import { Button } from '@/components/ui/button'
import {
  FolderArchive,
  Sparkles,
  Scale,
  Workflow,
  GitCommit,
  Table as TableIcon,
  BarChart3,
  QrCode,
  Shapes,
  StickyNote,
  CalendarDays,
  Menu,
  X,
  CreditCard,
  Mail,
  Home,
  Bot,
} from 'lucide-react'
import { SuporteWhatsApp } from './SuporteWhatsApp'

export const NavigationHeader: React.FC = () => {
  const [menuAberto, setMenuAberto] = useState(false)
  const location = useLocation()

  const linksPrincipais = [
    { label: 'Central', rota: '/', icone: Home },
    { label: 'Meu Acervo', rota: '/meu-acervo', icone: FolderArchive },
    { label: 'Formatação Inteligente', rota: '/formatacao-inteligente', icone: Sparkles },
    { label: 'Jurisprudência', rota: '/buscador-jurisprudencia', icone: Scale },
    { label: 'Fluxograma', rota: '/fluxograma', icone: Workflow },
    { label: 'Linha do Tempo', rota: '/linha-tempo', icone: GitCommit },
    { label: 'QR Code', rota: '/gerador-qr-code', icone: QrCode },
    { label: 'Ícones', rota: '/acervo-icones', icone: Shapes },
    { label: 'Notas', rota: '/bloco-notas', icone: StickyNote },
    { label: 'Agenda', rota: '/agenda', icone: CalendarDays },
  ]

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[#E3D9EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logotipo tipográfico oficial sem símbolos */}
          <div className="flex items-center gap-3">
            <MiaJusLogo size="md" />
          </div>

          {/* Links desktop */}
          <nav className="hidden xl:flex items-center gap-1 text-xs">
            {linksPrincipais.map((item) => {
              const Icon = item.icone
              const ativo = location.pathname === item.rota
              return (
                <Link
                  key={item.rota}
                  to={item.rota}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                    ativo
                      ? 'bg-accent-lilas font-semibold shadow-sm'
                      : 'text-slate-600 hover:text-[#1A1523] hover:bg-[#F4EFF9]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Ações à direita */}
          <div className="flex items-center gap-2">
            <Link
              to="/planos"
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg border border-[#A88FBF] bg-transparent text-[#1A1523] hover:bg-[#A88FBF]/10 transition-colors"
            >
              <CreditCard className="w-3.5 h-3.5 text-[#EC4899]" />
              <span>Planos e Tokens</span>
            </Link>

            <button
              type="button"
              onClick={() => setMenuAberto(!menuAberto)}
              className="xl:hidden p-2 rounded-lg text-slate-600 hover:text-[#1A1523] hover:bg-[#F4EFF9]"
              aria-label="Abrir menu de navegação"
            >
              {menuAberto ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile expansível */}
      {menuAberto && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 text-xs shadow-lg animate-fade-in">
          <div className="p-2 border-b border-slate-100 mb-2 flex items-center gap-2">
            <MiaCharacter size="sm" expression="happy" />
            <span className="font-semibold text-slate-800">Menu Oficial MiaJus</span>
          </div>

          <div className="grid grid-cols-2 gap-1">
            {linksPrincipais.map((item) => {
              const Icon = item.icone
              const ativo = location.pathname === item.rota
              return (
                <Link
                  key={item.rota}
                  to={item.rota}
                  onClick={() => setMenuAberto(false)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium ${
                    ativo ? 'bg-accent-lilas font-bold' : 'text-slate-700 hover:bg-[#F4EFF9]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 mt-2 flex flex-col gap-1">
            <Link
              to="/planos"
              onClick={() => setMenuAberto(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50"
            >
              <CreditCard className="w-4 h-4 text-[#EC4899]" />
              <span>Planos, Tokens e Histórico</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export const MainFooter: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white text-xs text-slate-500 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <MiaJusLogo size="sm" linkToHome={false} />
          </div>

          <div className="bloco-identidade flex flex-wrap items-center gap-4 text-xs px-3 py-1.5 rounded-lg">
            <SuporteWhatsApp size="sm" />
            <a
              href="mailto:suporte@miajus.adv.br"
              className="inline-flex items-center gap-1.5 hover:opacity-80 transition-opacity"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>suporte@miajus.adv.br</span>
            </a>
          </div>
        </div>

        {/* Aviso Ético Oficial Obrigatório (item 7) */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center text-slate-500 text-[11px] leading-relaxed">
          <strong>Aviso Ético e Legal:</strong> A inteligência artificial pode cometer erros. Revise
          e valide os documentos e informações antes de utilizá-los. Plataforma desenvolvida para
          auxílio visual de operadores do Direito.
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400 pt-2 border-t border-slate-100">
          <p>© {new Date().getFullYear()} MiaJus - Visual Law. Todos os direitos reservados.</p>
          <p>Ambiente seguro e estruturado em conformidade com as diretrizes do CNJ e OAB.</p>
        </div>
      </div>
    </footer>
  )
}
