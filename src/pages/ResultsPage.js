import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

export default function ResultsPage({ simData }) {
  const { t } = useLanguage();

  // Only show final events with results
  const finalEvents = Object.values(simData)
    .filter((d) => d.event.isFinal && d.rounds.some((r) => r.entries.some((e) => e.result)))
    .sort((a, b) => a.event.id - b.event.id);

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">{t('finalSummary')}</h2>

      {finalEvents.length === 0 && (
        <div className="text-center py-12 text-gray-400 text-sm">No final results yet</div>
      )}

      {finalEvents.map((eventData) => {
        // Collect all entries across rounds, sorted by result
        const allEntries = eventData.rounds
          .flatMap((r) => r.entries)
          .filter((e) => e.result)
          .sort((a, b) => a.result - b.result)
          .map((e, i) => ({ ...e, overallRank: i + 1 }));

        return (
          <div key={eventData.event.id} className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
            <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200">
              <span className="font-semibold text-gray-800">
                {t('event')} {eventData.event.id} - {eventData.event.name}
              </span>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left text-gray-600">
                  <th className="px-4 py-2 w-16 font-medium">{t('rank')}</th>
                  <th className="px-4 py-2 font-medium">{t('swimmer')}</th>
                  <th className="px-4 py-2 font-medium">{t('team')}</th>
                  <th className="px-4 py-2 w-24 font-medium text-right">{t('time')}</th>
                </tr>
              </thead>
              <tbody>
                {allEntries.map((entry, idx) => (
                  <tr
                    key={idx}
                    className={`border-b border-gray-100 ${
                      entry.overallRank <= 3 ? 'bg-yellow-50' : ''
                    }`}
                  >
                    <td className="px-4 py-2 font-semibold text-gray-700">{entry.overallRank}</td>
                    <td className="px-4 py-2 text-gray-800">{entry.name}</td>
                    <td className="px-4 py-2 text-gray-600">{entry.school}</td>
                    <td className="px-4 py-2 text-right font-bold text-gray-900">
                      {entry.result.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
