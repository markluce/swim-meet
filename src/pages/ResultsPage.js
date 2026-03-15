import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { nameZh, schoolZh, schoolColors, eventNameZh, localize } from '../i18n/contentZh';
import { allEvents } from '../data/events';

export default function ResultsPage({ simData }) {
  const { t, lang } = useLanguage();

  // Only show final events with results (detailed view)
  const finalEvents = Object.values(simData)
    .filter((d) => d.event.isFinal && d.rounds.some((r) => r.entries.some((e) => e.result)))
    .sort((a, b) => a.event.id - b.event.id);

  // All events summary data
  const allEventsSummary = allEvents.map((ev) => {
    const eventData = simData[ev.id];
    if (!eventData) return { event: ev, entries: [] };
    const entries = eventData.rounds
      .flatMap((r) => r.entries)
      .filter((e) => e.result)
      .sort((a, b) => a.result - b.result)
      .map((e, i) => ({ ...e, overallRank: i + 1 }));
    return { event: ev, entries };
  });

  return (
    <div>
      {/* Final Results Summary - all events */}
      <h2 className="text-xl font-bold text-gray-900 mb-6 print-section-title">
        {lang === 'zh' ? '決賽成績總覽' : 'Final Results Summary'}
      </h2>

      <div className="space-y-4 mb-8">
        {allEventsSummary.map((item) => (
          <div key={item.event.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-left text-gray-600">
                  <th className="px-4 py-2 w-16 font-medium">{t('rank')}</th>
                  <th className="px-4 py-2 font-medium">
                    {`${t('event')} ${item.event.id} - ${localize(item.event.name, lang, eventNameZh)}`}
                  </th>
                  <th className="px-4 py-2 font-medium">School</th>
                  <th className="px-4 py-2 w-24 font-medium text-right">{t('time')}</th>
                </tr>
              </thead>
              <tbody>
                {item.entries.length > 0 ? (
                  item.entries.map((entry, idx) => (
                    <tr
                      key={idx}
                      className={`border-b border-gray-100 ${
                        entry.overallRank <= 3 ? 'bg-yellow-50' : ''
                      }`}
                    >
                      <td className="px-4 py-2 font-semibold text-gray-700">{entry.overallRank}</td>
                      <td className="px-4 py-2 text-gray-800">{localize(entry.name, lang, nameZh)}</td>
                      <td className="px-4 py-2">
                        {(() => {
                          const colors = schoolColors[entry.school] || { bg: '#6B7280', text: '#FFFFFF' };
                          return (
                            <span className="inline-block px-2 py-0.5 rounded text-xs font-bold" style={{ backgroundColor: colors.bg, color: colors.text }}>
                              {entry.school}
                            </span>
                          );
                        })()}
                      </td>
                      <td className="px-4 py-2 text-right font-bold text-gray-900">{entry.result.toFixed(2)}</td>
                    </tr>
                  ))
                ) : (
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-2 text-gray-400" colSpan={4}>
                      {lang === 'zh' ? '尚無成績' : 'No results yet'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* Detailed results per event */}
      <h2 className="text-xl font-bold text-gray-900 mb-6">{t('finalSummary')}</h2>

      {finalEvents.length === 0 && (
        <div className="text-center py-12 text-gray-400 text-sm">
          {lang === 'zh' ? '尚無決賽成績' : 'No final results yet'}
        </div>
      )}

      {finalEvents.map((eventData) => {
        const allEntries = eventData.rounds
          .flatMap((r) => r.entries)
          .filter((e) => e.result)
          .sort((a, b) => a.result - b.result)
          .map((e, i) => ({ ...e, overallRank: i + 1 }));

        return (
          <div key={eventData.event.id} className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
            <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200">
              <span className="font-semibold text-gray-800">
                {t('event')} {eventData.event.id} - {localize(eventData.event.name, lang, eventNameZh)}
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
                    <td className="px-4 py-2 text-gray-800">{localize(entry.name, lang, nameZh)}</td>
                    <td className="px-4 py-2 text-gray-600">{localize(entry.school, lang, schoolZh)}</td>
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
