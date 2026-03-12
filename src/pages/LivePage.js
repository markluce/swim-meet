import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import EventCard from '../components/EventCard';

export default function LivePage({ simData, activeSession }) {
  const { t } = useLanguage();
  const [session, setSession] = useState(activeSession || 1);

  // Filter events for current session that have results
  const sessionEvents = Object.values(simData)
    .filter((d) => d.event.session === session)
    .sort((a, b) => b.event.id - a.event.id); // newest first

  return (
    <div>
      {/* Session tabs */}
      <div className="flex gap-2 mb-6">
        {[1, 2].map((s) => (
          <button
            key={s}
            onClick={() => setSession(s)}
            className={`px-4 py-2 text-sm font-medium rounded-md border transition-colors ${
              session === s
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            {s === 1 ? t('session1') : t('session2')}
          </button>
        ))}
      </div>

      {/* Event cards */}
      {sessionEvents.length === 0 && (
        <div className="text-center py-12 text-gray-400 text-sm">
          {session === 1 ? t('session1') : t('session2')} — No results yet
        </div>
      )}

      {sessionEvents.map((eventData) =>
        eventData.rounds.map((round) => (
          <EventCard
            key={`${eventData.event.id}-${round.roundNum}`}
            eventId={eventData.event.id}
            eventName={eventData.event.name}
            roundNum={round.roundNum}
            totalRounds={round.totalRounds}
            entries={round.entries}
          />
        ))
      )}
    </div>
  );
}
