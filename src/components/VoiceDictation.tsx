import React, { useState, useEffect } from 'react'
import { Mic, MicOff, AlertCircle } from 'lucide-react'

interface VoiceDictationProps {
  onTranscript: (text: string) => void
  currentValue?: string
  className?: string
  buttonText?: string
}

/**
 * Microfone para ditar texto nos campos com permissão, indicador ativo
 * e correção de transcrição (Web Speech API).
 */
export const VoiceDictation: React.FC<VoiceDictationProps> = ({
  onTranscript,
  className = '',
  buttonText,
}) => {
  const [isListening, setIsListening] = useState(false)
  const [isSupported, setIsSupported] = useState(true)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [recognitionInstance, setRecognitionInstance] = useState<any>(null)

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) {
      setIsSupported(false)
      return
    }

    try {
      const recognition = new SpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = 'pt-BR'

      recognition.onstart = () => {
        setIsListening(true)
        setErrorMsg(null)
      }

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        if (transcript) {
          onTranscript(transcript)
        }
        setIsListening(false)
      }

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error)
        setIsListening(false)
        if (event.error === 'not-allowed') {
          setErrorMsg('Permissão de microfone negada. Autorize no navegador.')
        } else {
          setErrorMsg('Não foi possível capturar o áudio.')
        }
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      setRecognitionInstance(recognition)
    } catch (e) {
      console.warn('Erro ao inicializar reconhecimento de voz:', e)
      setIsSupported(false)
    }
  }, [onTranscript])

  const toggleListening = () => {
    if (!recognitionInstance) {
      setErrorMsg('Reconhecimento de fala não suportado neste navegador.')
      return
    }

    if (isListening) {
      recognitionInstance.stop()
    } else {
      setErrorMsg(null)
      try {
        recognitionInstance.start()
      } catch (err) {
        console.warn(err)
      }
    }
  }

  if (!isSupported) {
    return null
  }

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <button
        type="button"
        onClick={toggleListening}
        title={isListening ? 'Clique para parar ditado por voz' : 'Ditar texto por voz (Português)'}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md border transition-all ${
          isListening
            ? 'bg-red-50 text-red-700 border-red-300 animate-pulse ring-2 ring-red-400'
            : 'bg-[#F4EFF9] hover:bg-[#E9DCF5] text-[#1A1523] border-[#A88FBF] shadow-sm'
        }`}
      >
        {isListening ? (
          <>
            <MicOff className="w-3.5 h-3.5 text-red-600" />
            <span className="font-semibold text-red-700">Gravando...</span>
          </>
        ) : (
          <>
            <Mic className="w-3.5 h-3.5 text-slate-500" />
            <span>{buttonText || 'Ditar'}</span>
          </>
        )}
      </button>

      {errorMsg && (
        <span className="inline-flex items-center gap-1 text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
          <AlertCircle className="w-3 h-3" />
          {errorMsg}
        </span>
      )}
    </div>
  )
}
