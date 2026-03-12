import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

export default function EventCard({ eventId, eventName, roundNum, totalRounds, entries }) {
  const { t } = useLanguage();
  const eventIdStr = String(eventId).padStart(3, '0');

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
      {/* Header bar */}
      <div className="bg-amber-50 border-l-4 border-amber-400 px-4 py-2.5">
        <span className="font-semibold text-gray-800">
          {t('event')}: {eventIdStr}, {t('round')}: {roundNum}/{totalRounds}, {eventName}
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-gray-600">
              <th className="px-4 py-2.5 w-16 font-medium">{t('lane')}</th>
              <th className="px-4 py-2.5 font-medium">{t('swimmer')}</th>
              <th className="px-4 py-2.5 font-medium">{t('team')}</th>
              <th className="px-4 py-2.5 w-20 font-medium text-right">{t('refer')}</th>
              <th className="px-4 py-2.5 w-16 font-medium text-center">{t('rank')}</th>
              <th className="px-4 py-2.5 w-20 font-medium text-right">{t('result')}</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, idx) => (
              <tr
                key={idx}
                className={`border-b border-gray-100 ${
                  entry.rank === 1 ? 'bg-yellow-50' : ''
                } hover:bg-gray-50 transition-colors`}
              >
                <td className="px-4 py-2.5 text-gray-500">{entry.lane}</td>
                <td className="px-4 py-2.5 font-medium text-gray-800">{entry.name}</td>
                <td className="px-4 py-2.5">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                    <span className="text-gray-600">{entry.school}</span>
                  </span>
                </td>
                <td className="px-4 py-2.5 text-right text-gray-500">
                  {entry.referTime ? entry.referTime.toFixed(2) : t('noResult')}
                </td>
                <td className="px-4 py-2.5 text-center font-semibold text-gray-700">
                  {entry.rank || t('noResult')}
                </td>
                <td className="px-4 py-2.5 text-right font-bold text-gray-900">
                  {entry.result ? entry.result.toFixed(2) : t('noResult')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
