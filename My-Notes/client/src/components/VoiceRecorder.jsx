import { useState, useRef } from 'react';
import { Mic, Square } from 'lucide-react';

export default function VoiceRecorder({ onRecord, onTranscript }) {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const recognitionRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          onRecord(reader.result);
        };
        chunksRef.current = [];
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);

      // Start speech recognition
      if ('webkitSpeechRecognition' in window) {
        recognitionRef.current = new window.webkitSpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        
        recognitionRef.current.onresult = (event) => {
          let finalTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            }
          }
          if (finalTranscript) onTranscript(finalTranscript);
        };
        
        recognitionRef.current.start();
      }

    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Microphone access is required for voice notes.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    }
  };

  return (
    <button
      onClick={isRecording ? stopRecording : startRecording}
      className={`p-2 rounded-full transition-colors ${
        isRecording 
          ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 animate-pulse' 
          : 'text-gray-500 hover:bg-black/5 dark:hover:bg-white/10'
      }`}
      title={isRecording ? "Stop recording" : "Record voice note"}
    >
      {isRecording ? <Square size={18} /> : <Mic size={18} />}
    </button>
  );
}
