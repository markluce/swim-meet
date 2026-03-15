// Chinese translations for all content: names, schools, event names
// Rule: In Chinese mode, show "English 中文"

// Swimmer names → Chinese
export const nameZh = {
  'Marry Huang': '黃瑪莉',
  'Sophia Lin': '林蘇菲',
  'Emily Chen': '陳艾蜜莉',
  'Chloe Wang': '王克洛伊',
  'Olivia Wu': '吳奧莉薇',
  'Ava Chang': '張艾娃',
  'Mia Tsai': '蔡米亞',
  'Isabella Liu': '劉伊莎貝拉',
  'Grace Lee': '李乖瑞絲',
  'Hannah Hsu': '許漢娜',
  'Lily Yang': '楊莉莉',
  'Zoe Cheng': '鄭乙喬',
  'Tom Chen': '陳大明',
  'James Lin': '林杰明',
  'Ethan Wang': '王伊森',
  'Lucas Wu': '吳盧卡斯',
  'Noah Chang': '張諾亞',
  'Liam Tsai': '蔡連恩',
  'Oliver Liu': '劉奧立佛',
  'William Lee': '李威廉',
  'Benjamin Hsu': '許乙敏',
  'Henry Yang': '楊亨利',
  'Daniel Cheng': '鄭丹尼爾',
  'Jack Kuo': '郭傑克',
};

// School names → Full name + Chinese
export const schoolZh = {
  'KSS': 'Kuei Shan School 葳格國際學校',
  'MAK': 'Morrison Academy Kaohsiung 馬禮遜美國學校高雄',
  'TES': 'Taipei European School 台北歐洲學校',
  'DIS': 'Dominican International School 道明國際學校',
  'AST': 'American School Taichung 台中美國學校',
};

// School full names (English)
export const schoolFullName = {
  'KSS': 'Kuei Shan School',
  'MAK': 'Morrison Academy Kaohsiung',
  'TES': 'Taipei European School',
  'DIS': 'Dominican International School',
  'AST': 'American School Taichung',
};

// School color mapping
export const schoolColors = {
  'KSS': { bg: '#1E40AF', text: '#FFFFFF' },  // Blue
  'MAK': { bg: '#DC2626', text: '#FFFFFF' },  // Red
  'TES': { bg: '#059669', text: '#FFFFFF' },  // Green
  'DIS': { bg: '#7C3AED', text: '#FFFFFF' },  // Purple
  'AST': { bg: '#D97706', text: '#FFFFFF' },  // Amber
};

// Event name keyword → Chinese mapping
const eventKeywordZh = {
  'Finals': '決賽',
  'Girls': '女子',
  'Boys': '男子',
  'Mixed': '混合',
  'ES': '小學',
  'MS': '中學',
  'Butterfly': '蝶式',
  'Backstroke': '仰式',
  'Breaststroke': '蛙式',
  'Freestyle': '自由式',
  'IM': '混合式',
  'Relay': '接力',
};

// Translate event name: "Boys ES IM 100M" → "Boys ES IM 100M 男子小學混合式100公尺"
export function eventNameZh(name) {
  let zh = name;
  // Replace keywords with Chinese
  Object.entries(eventKeywordZh).forEach(([en, cn]) => {
    zh = zh.replace(new RegExp(`\\b${en}\\b`, 'g'), cn);
  });
  // Convert distance: "25M" → "25公尺"
  zh = zh.replace(/(\d+)M/g, '$1公尺');
  return zh;
}

// Helper: get localized display string
// In Chinese mode: "English 中文"
// In English mode: "English"
export function localize(enText, lang, zhMap) {
  if (lang !== 'zh') return enText;
  const zhText = typeof zhMap === 'function' ? zhMap(enText) : zhMap[enText];
  if (!zhText) return enText;
  return `${enText} ${zhText}`;
}
