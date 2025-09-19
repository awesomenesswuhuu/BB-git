import React, { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import WelcomeScreen from "./components/WelcomeScreen.jsx";
import FaceScanner from "./components/FaceScanner.jsx";
import EmailCollection from "./components/EmailCollection.jsx";
import ChoiceScreen from "./components/ChoiceScreen.jsx";
import FoundationResults from "./components/FoundationResults.jsx";
import { db } from "./lib/base44.js";

export default function App() {
  const [step, setStep] = useState("welcome");
  const [sessionId, setSessionId] = useState(null);
  const [discount, setDiscount] = useState(0);

  useEffect(() => { db.resetRuntime(); }, []);

  const startNew = useCallback(() => {
    setSessionId(null); setDiscount(0); setStep("welcome"); db.clearFoundations();
  }, []);

  const onEmailCollected = useCallback((email) => {
    const sid = db.UserSession.create({ email, session_date: new Date().toISOString() });
    setSessionId(sid); setStep("choices");
  }, []);

  const handleDoneAnalysis = React.useCallback(() => setStep("results"), []);

  const page = (key, node) => (
    <motion.div key={key} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35 }}>
      {node}
    </motion.div>
  );

  return (
    <div className="min-h-screen w-full">
      <div className="max-w-md mx-auto p-4 sm:p-6">
        <AnimatePresence mode="wait">
          {step === "welcome" && page("welcome", <WelcomeScreen onStart={() => setStep("scan")} />)}
          {step === "scan" && page("scan", <FaceScanner onDone={() => setStep("email")} onBack={() => setStep("welcome")} />)}
          {step === "email" && page("email", <EmailCollection onSubmit={onEmailCollected} onBack={() => setStep("scan")} />)}
          {step === "choices" && page("choices",
            <ChoiceScreen sessionId={sessionId} onDoneAnalysis={handleDoneAnalysis} onExit={() => setStep("welcome")} onDiscount={(d) => setDiscount(d)} />
          )}
          {step === "results" && page("results", <FoundationResults sessionId={sessionId} discount={discount} onNew={startNew} />)}
        </AnimatePresence>
      </div>
    </div>
  );
}