import React, { createContext, useContext, useState } from 'react';

const SurveyContext = createContext();

export function SurveyProvider({ children }) {
  const [surveys, setSurveys] = useState([]);
  const [currentSurvey, setCurrentSurvey] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [pastedNotes, setPastedNotes] = useState('');

  function addSurvey(survey) {
    setSurveys(prev => [survey, ...prev]);
  }

  function deleteSurvey(id) {
    setSurveys(prev => prev.filter(s => s.id !== id));
  }

  function getTodaysCount() {
    const today = new Date().toDateString();
    return surveys.filter(s => new Date(s.date).toDateString() === today).length;
  }

  return (
    <SurveyContext.Provider
      value={{
        surveys,
        currentSurvey,
        setCurrentSurvey,
        capturedPhoto,
        setCapturedPhoto,
        selectedContact,
        setSelectedContact,
        currentLocation,
        setCurrentLocation,
        pastedNotes,
        setPastedNotes,
        addSurvey,
        deleteSurvey,
        getTodaysCount,
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
}

export function useSurvey() {
  const context = useContext(SurveyContext);
  if (!context) {
    return {
      surveys: [],
      currentSurvey: null,
      setCurrentSurvey: () => {},
      capturedPhoto: null,
      setCapturedPhoto: () => {},
      selectedContact: null,
      setSelectedContact: () => {},
      currentLocation: null,
      setCurrentLocation: () => {},
      pastedNotes: '',
      setPastedNotes: () => {},
      addSurvey: () => {},
      deleteSurvey: () => {},
      getTodaysCount: () => 0,
    };
  }
  return context;
}
