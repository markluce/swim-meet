import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { nameZh, schoolZh, eventNameZh, localize } from '../i18n/contentZh';
import { allEvents } from '../data/events';

export default function AwardsPage({ simData }) {
  const { t, lang } = useLanguage();

  // Only show Session 2 final events
  const session2Finals = allEvents.filter((ev) => ev.session === 2 && ev.isFinal);

  // Build awards for each Session 2 final event
  const awards = session2Finals.map((ev) => {
    const eventData = simData[ev.id];
    if (!eventData) return { event: ev, first: null, second: null, third: null };

    const allEntries = eventData.rounds
      .flatMap((r) => r.entries)
      .filter((e) => e.result)
      .sort((a, b) => a.result - b.result);

    return {
      event: ev,
      first: allEntries[0] || null,
      second: allEntries[1] || null,
      third: allEntries[2] || null,
    };
  });

  // Check if any event has results
  const hasAnyResults = awards.some((a) => a.first || a.second || a.third);

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">{t('awardList')}</h2>
      <p className="text-sm text-gray-500 mb-6">
        {lang === 'zh' ? 'Session 2 決賽前三名' : 'Session 2 Finals — Top 3'}
      </p>

      {!hasAnyResults && (
        <div className="text-center py-12 text-gray-400 text-sm">
          {lang === 'zh' ? '尚無獎項資料' : 'No awards yet'}
        </div>
      )}

      {hasAnyResults && (
        <div className="space-y-3">
          {awards.map((award) => {
            const hasResults = award.first || award.second || award.third;
            return (
              <div
                key={award.event.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                {/* Event header */}
                <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200">
                  <span className="font-semibold text-gray-800">
                    {t('event')} {award.event.id} — {localize(award.event.name, lang, eventNameZh)}
                  </span>
                </div>

                {hasResults ? (
                  <div className="divide-y divide-gray-100">
                    {/* Gold - First Place */}
                    <div className="flex items-center px-4 py-3" style={{ backgroundColor: '#fef9c310' }}>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: '#FFD700', color: '#7c6200' }}>
                        1
                      </div>
                      <div className="ml-3 flex-1">
                        <span className="font-semibold text-gray-900">
                          {award.first ? localize(award.first.name, lang, nameZh) : '--'}
                        </span>
                        <span className="ml-2 text-sm text-gray-500">
                          {award.first ? localize(award.first.school, lang, schoolZh) : '--'}
                        </span>
                      </div>
                      <div className="font-bold text-gray-900">
                        {award.first ? award.first.result.toFixed(2) : '--'}
                      </div>
                    </div>

                    {/* Silver - Second Place */}
                    <div className="flex items-center px-4 py-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: '#C0C0C0', color: '#4a4a4a' }}>
                        2
                      </div>
                      <div className="ml-3 flex-1">
                        <span className="font-semibold text-gray-900">
                          {award.second ? localize(award.second.name, lang, nameZh) : '--'}
                        </span>
                        <span className="ml-2 text-sm text-gray-500">
                          {award.second ? localize(award.second.school, lang, schoolZh) : '--'}
                        </span>
                      </div>
                      <div className="font-bold text-gray-900">
                        {award.second ? award.second.result.toFixed(2) : '--'}
                      </div>
                    </div>

                    {/* Copper - Third Place */}
                    <div className="flex items-center px-4 py-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: '#CD7F32', color: '#fff' }}>
                        3
                      </div>
                      <div className="ml-3 flex-1">
                        <span className="font-semibold text-gray-900">
                          {award.third ? localize(award.third.name, lang, nameZh) : '--'}
                        </span>
                        <span className="ml-2 text-sm text-gray-500">
                          {award.third ? localize(award.third.school, lang, schoolZh) : '--'}
                        </span>
                      </div>
                      <div className="font-bold text-gray-900">
                        {award.third ? award.third.result.toFixed(2) : '--'}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="px-4 py-4 text-gray-400 text-sm">
                    {lang === 'zh' ? '尚無成績' : 'No results yet'}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
