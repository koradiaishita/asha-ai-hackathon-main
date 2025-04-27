import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Mic, 
  Stop, 
  Pause, 
  PlayArrow, 
  Refresh, 
  Send,
  MicNone
} from '@mui/icons-material';

// Define SpeechRecognition interface since TypeScript doesn't include it natively
interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
}

// Add to Window interface
declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognition;
    webkitSpeechRecognition?: new () => SpeechRecognition;
  }
}

interface VoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (text: string) => void;
}

export function VoiceModal({ isOpen, onClose, onSubmit }: VoiceModalProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [timer, setTimer] = useState(0);
  const recognition = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      recognition.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      if (recognition.current) {
        recognition.current.continuous = true;
        recognition.current.interimResults = true;
        recognition.current.lang = 'en-US';

        recognition.current.onresult = (event) => {
          const current = event.resultIndex;
          const transcriptResult = event.results[current][0].transcript;
          setTranscript(transcriptResult);
        };
      }
    }

    return () => {
      if (recognition.current) {
        recognition.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, isPaused]);

  const startRecording = () => {
    if (recognition.current) {
      recognition.current.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (recognition.current) {
      recognition.current.stop();
      setIsRecording(false);
    }
  };

  const togglePause = () => {
    if (recognition.current) {
      if (isPaused) {
        recognition.current.start();
      } else {
        recognition.current.stop();
      }
      setIsPaused(!isPaused);
    }
  };

  const resetRecording = () => {
    stopRecording();
    setTranscript('');
    setTimer(0);
  };

  const handleSubmit = () => {
    if (transcript) {
      onSubmit(transcript);
      onClose(); // We only close the voice modal, not the chat widget
      resetRecording();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="voice-modal-overlay" onClick={onClose}>
      <motion.div 
        className="voice-modal-content"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="voice-modal-header">
          <MicNone className="voice-modal-icon" style={{ fontSize: '28px', color: 'var(--primary)' }} />
          <h2 className="voice-modal-title">Voice Recording</h2>
        </div>
        
        <div className="voice-timer">
          {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
        </div>
        
        <div className="voice-transcript">
          {transcript || 'Start speaking...'}
        </div>
        
        <div className="voice-controls">
          {!isRecording ? (
            <button className="voice-button" onClick={startRecording}>
              <Mic />
            </button>
          ) : (
            <>
              <button className="voice-button" onClick={stopRecording}>
                <Stop />
              </button>
              <button className="voice-button" onClick={togglePause}>
                {isPaused ? <PlayArrow /> : <Pause />}
              </button>
            </>
          )}
          <button className="voice-button reset" onClick={resetRecording}>
            <Refresh />
          </button>
          <button 
            className="voice-button send"
            onClick={handleSubmit}
            disabled={!transcript}
            style={{ opacity: transcript ? 1 : 0.5 }}
          >
            <Send />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
