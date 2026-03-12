import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

export default function AwardsPage({ simData }) {
  const { t } = useLanguage();

  // Only show final events with results
  const finalEvents = Object.values(simData)
    .filter((d) => d.event.isFinal && d.rounds.some((r) => r.entries.some((e) => e.result)))
    .sort((a, b) => a.event.id - b.event.id);

  // Get top 3 for each event
  const awards = finalEvents.map((eventData) => {
    const allEntries = eventData.rounds
      .flatMap((r) => r.entries)
      .filter((e) => e.result)
      .sort((a, b) => a.result - b.result);

    return {
      eventId: eventData.event.id,
      eventName: eventData.event.name,
      first: allEntries[0] || null,
      second: allEntries[1] || null,
      third: allEntries[2] || null,
    };
  });

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">{t('awardList')}</h2>

      {awards.length === 0 && (
        <div className="text-center py-12 text-gray-400 text-sm">No awards yet</div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-3 py-2.5 text-left font-medium text-gray-600 w-12">{t('event')}</th>
                <th className="px-3 py-2.5 text-left font-medium text-gray-600"></th>
                <th className="px-3 py-2.5 text-center font-medium text-amber-600" colSpan={2}>
                  {t('firstPlace')}
                </th>
                <th className="px-3 py-2.5 text-center font-medium text-gray-500" colSpan={2}>
                  {t('secondPlace')}
                </th>
                <th className="px-3 py-2.5 text-center font-medium text-orange-700" colSpan={2}>
                  {t('thirdPlace')}
                </th>
              </tr>
              <tr className="border-b border-gray-200 bg-gray-50 text-xs text-gray-500">
                <th className="px-3 py-1"></th>
                <th className="px-3 py-1"></th>
                <th className="px-3 py-1 text-center">{t('name')}</th>
                <th className="px-3 py-1 text-center">{t('school')}</th>
                <th className="px-3 py-1 text-center">{t('name')}</th>
                <th className="px-3 py-1 text-center">{t('school')}</th>
                <th className="px-3 py-1 text-center">{t('name')}</th>
                <th className="px-3 py-1 text-center">{t('school')}</th>
              </tr>
            </thead>
            <tbody>
              {awards.map((award) => (
                <tr key={award.eventId} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-3 py-2.5 font-semibold text-gray-700">{award.eventId}</td>
                  <td className="px-3 py-2.5 text-gray-600 text-xs">{award.eventName}</td>
                  <td className="px-3 py-2.5 text-center font-medium text-gray-800">
                    {award.first?.name || '--'}
                  </td>
                  <td className="px-3 py-2.5 text-center text-gray-500 text-xs">
                    {award.first?.school || '--'}
                  </td>
                  <td className="px-3 py-2.5 text-center font-medium text-gray-800">
                    {award.second?.name || '--'}
                  </td>
                  <td className="px-3 py-2.5 text-center text-gray-500 text-xs">
                    {award.second?.school || '--'}
                  </td>
                  <td className="px-3 py-2.5 text-center font-medium text-gray-800">
                    {award.third?.name || '--'}
                  </td>
                  <td className="px-3 py-2.5 text-center text-gray-500 text-xs">
                    {award.third?.school || '--'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
