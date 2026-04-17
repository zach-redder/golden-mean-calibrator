import { useState } from 'react';
import InputScreen from './components/InputScreen';
import ThinkingScreen from './components/ThinkingScreen';
import SpectrumScreen from './components/SpectrumScreen';
import { identifyVirtue, generateResponses } from './api/openai';

export default function App() {
  const [appState, setAppState] = useState('input');
  const [scenario, setScenario] = useState('');
  const [virtue, setVirtue] = useState(null);
  const [responses, setResponses] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit(scenarioText) {
    setScenario(scenarioText);
    setVirtue(null);
    setResponses(null);
    setError(null);
    setAppState('thinking');

    try {
      const virtueData = await identifyVirtue(scenarioText);
      setVirtue(virtueData);

      const characterResponses = await generateResponses(
        scenarioText,
        virtueData.virtue,
        virtueData.deficiency,
        virtueData.excess
      );
      setResponses(characterResponses);
      setAppState('spectrum');
    } catch (err) {
      setError(err.message || 'Something went wrong.');
      setAppState('input');
    }
  }

  function handleReset() {
    setAppState('input');
    setScenario('');
    setVirtue(null);
    setResponses(null);
    setError(null);
  }

  return (
    <>
      {appState === 'input' && (
        <InputScreen onSubmit={handleSubmit} error={error} />
      )}
      {appState === 'thinking' && (
        <ThinkingScreen virtue={virtue} />
      )}
      {appState === 'spectrum' && (
        <SpectrumScreen
          virtue={virtue}
          responses={responses}
          onReset={handleReset}
        />
      )}
    </>
  );
}
