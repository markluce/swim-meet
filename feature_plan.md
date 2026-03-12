# Swim Meet Live 2025-2026 功能規劃書

## 專案概述

建置一個游泳比賽即時成績網站「Swim Meet Live 2025-2026」，支援小學(ES)及中學(MS)賽事，提供報名管理、賽程編排、即時成績顯示及獎項統計功能。

---

## 第一階段：報名與資料管理

### 1.1 選手報名系統
- 分為小學(ES)及中學(MS)兩種報名表，格式一致
- 每位選手最多可報名 **兩項** 個人賽事
- 報名欄位：選手姓名、所屬隊伍(學校)、性別、第一項比賽項目、參考最佳成績、第二項比賽項目、參考最佳成績
- 支援匯入 Excel/CSV 格式報名資料

### 1.2 比賽項目列表

| 分組 | 項目編號 | 比賽項目 |
|------|--------|--------|
| ES 小學 | 1 | 自由式 25m（個人） |
| ES 小學 | 2 | 仰式 25m（個人） |
| ES 小學 | 3 | 蛙式 25m（個人） |
| ES 小學 | 4 | 蝶式 25m（個人） |
| MS 中學 | 5 | 自由式 50m（個人） |
| MS 中學 | 6 | 仰式 50m（個人） |
| MS 中學 | 7 | 蛙式 50m（個人） |
| MS 中學 | 8 | 蝶式 50m（個人） |

---

## 第二階段：賽程編排

### 2.1 賽程場次設定
- 比賽分為 **上午場 Session 1** 及 **下午場 Session 2**
- Session 1：預賽（含接力賽決賽），共約 23 場 Event
- Session 2：個人決賽（含混合接力決賽），共約 22 場 Event
- 賽程可 **新增、調整、修改**

### 2.2 Session 1 賽程表（預賽 + 接力決賽）

| Event | 項目 |
|-------|------|
| 1 | Girls ES Butterfly 25M |
| 2 | Boys ES Butterfly 25M |
| 3 | Girls MS Butterfly 50M |
| 4 | Boys MS Butterfly 50M |
| 5 | Girls ES Backstroke 25M |
| 6 | Boys ES Backstroke 25M |
| 7 | Girls MS Backstroke 50M |
| 8 | Boys MS Backstroke 50M |
| 9 | Girls ES Breaststroke 25M |
| 10 | Boys ES Breaststroke 25M |
| 11 | Girls MS Breaststroke 50M |
| 12 | Boys MS Breaststroke 50M |
| 13 | Girls ES Freestyle 25M |
| 14 | Boys ES Freestyle 25M |
| 15 | Girls MS Freestyle 50M |
| 16 | Boys MS Freestyle 50M |
| 17 | Girls ES IM 100M |
| 18 | Boys ES IM 100M |
| 19 | Girls MS IM 200M |
| 20 | Boys MS IM 200M |
| 21 | Finals Girls ES Freestyle Relay 25M |
| 22 | Finals Boys ES Freestyle Relay 25M / Finals Girls MS Freestyle Relay 50M |
| 23 | Finals Boys MS Freestyle Relay 50M |

### 2.3 Session 2 賽程表（決賽）

| Event | 項目 |
|-------|------|
| 24 | Finals Girls ES Butterfly 25M |
| 25 | Finals Boys ES Butterfly 25M |
| 26 | Finals Girls MS Butterfly 50M |
| 27 | Finals Boys MS Butterfly 50M |
| 28 | Finals Girls ES Backstroke 25M |
| 29 | Finals Boys ES Backstroke 25M |
| 30 | Finals Girls MS Backstroke 50M |
| 31 | Finals Boys MS Backstroke 50M |
| 32 | Finals Girls ES Breaststroke 25M |
| 33 | Finals Boys ES Breaststroke 25M |
| 34 | Finals Girls MS Breaststroke 50M |
| 35 | Finals Boys MS Breaststroke 50M |
| 36 | Finals Girls ES Freestyle 25M |
| 37 | Finals Boys ES Freestyle 25M |
| 38 | Finals Girls MS Freestyle 50M |
| 39 | Finals Boys MS Freestyle 50M |
| 40 | Finals Girls ES IM 100M |
| 41 | Finals Boys ES IM 100M |
| 42 | Finals Girls MS IM 200M |
| 43 | Finals Boys MS IM 200M |
| 44 | Finals Mixed ES Freestyle Relay 25M |
| 45 | Finals Mixed MS Freestyle Relay 25M |

### 2.4 水道編排規則
- 6 條水道，依選手參考成績排名分配水道
- 未提供參考成績者排在有提供成績的選手後面
- 水道分配對照表：

| 排名 | 水道 |
|------|------|
| 第 1 名 | 第 4 道 |
| 第 2 名 | 第 3 道 |
| 第 3 名 | 第 5 道 |
| 第 4 名 | 第 2 道 |
| 第 5 名 | 第 6 道 |
| 第 6 名 | 第 1 道 |

### 2.5 Round（組別）編排
- 依報名人數，每 6 人一組（6 條水道）
- 各 Event 可能有 1 個以上的 Round
- 顯示格式：Round 1/2、2/2（共 2 組）；1/3、2/3、3/3（共 3 組）

---

## 第三階段：即時成績網站

### 3.1 網站標題與基本配置
- 標題：**Swim Meet Live 2025-2026**
- 副標題：Real-time tracking powered by CIFS Ingestion
- 顯示最後更新時間（Updated: HH:MM:SS PM）
- 提供管理後台入口（Admin Portal）

### 3.2 即時賽程成績頁面
- Session 1 / Session 2 切換頁籤
- 每場 Event 顯示卡片格式：
  - 標題列：`Event: 001, Round: 1/2, Girls ES Butterfly 25M`
  - 表格欄位：Lane | Swimmer | Team | Refer | Rank | Result
- 比賽間隔約 2~4 分鐘，從 Event 01 至 Event 45
- 成績即時更新顯示

### 3.3 決賽成績總覽頁面（Final Summary）
- 各賽程決賽完整排名表
- 欄位：Rank | Event 名稱 | 選手姓名 | Team | Time
- 顯示所有參賽者名次及成績

### 3.4 獎項列表頁面（Award List）
- 各賽程決賽前三名排名
- 欄位：Event | First Place (Name, School) | Second Place (Name, School) | Third Place (Name, School)

---

## 第四階段：成績擷取程式（Python）

### 4.1 SMB 檔案擷取
- 使用 Python 開發程式，每分鐘透過 **網路芳鄰（SMB）** 連線至比賽計分電腦
- 讀取 Windows 磁碟槽內的 `LSTRslt.txt` 檔案

### 4.2 LSTRslt.txt 檔案格式解析
```
event = 1       → Event 01
heat = 0        → Round 1/2（heat 編號）
lap = 25        → 25m（若為 0 則為無效比賽，忽略）
lane = 1        → 第 1 道
rank = 1        → 第一名
result = 22.66  → 成績 22.66 秒
```

### 4.3 資料處理邏輯
- 每分鐘輪詢一次 LSTRslt.txt
- 解析新成績並透過 API 寫入後端資料庫
- 前端自動刷新顯示最新成績
- `lap = 0` 的紀錄視為無效，自動忽略

---

## 技術架構

### 前端
- **框架**：React 18+
- **路由**：React Router
- **樣式**：Tailwind CSS
- **狀態管理**：React Context / useState
- **即時更新**：WebSocket 或定時輪詢（Polling）

### 後端（未來擴充）
- **框架**：Node.js + Express 或 Python FastAPI
- **資料庫**：SQLite（輕量）或 PostgreSQL
- **API**：RESTful API 提供賽程、成績資料

### 成績擷取
- **語言**：Python 3
- **SMB 連線**：`smbclient` 或 `pysmb` 套件
- **排程**：每 60 秒輪詢一次

---

## 開發里程碑

| 階段 | 內容 | 優先順序 |
|------|------|----------|
| P0 | React 前端原型 — 即時賽程成績頁面 UI | 最高 |
| P1 | 報名資料匯入與管理介面 | 高 |
| P2 | 賽程編排系統（含水道自動分配） | 高 |
| P3 | 決賽成績總覽 & 獎項列表頁面 | 中 |
| P4 | Python SMB 成績擷取程式 | 中 |
| P5 | 後端 API & 資料庫整合 | 中 |
| P6 | WebSocket 即時推播 | 低 |
| P7 | 管理後台（Admin Portal） | 低 |

---

## 頁面結構

```
/ (首頁)
├── /live          → 即時成績頁面（Session 1 / Session 2 切換）
├── /results       → 決賽成績總覽（Final Summary）
├── /awards        → 獎項列表（Award List，前三名）
└── /admin         → 管理後台
    ├── /admin/events    → 賽程管理（新增/修改/刪除）
    ├── /admin/swimmers  → 選手報名管理
    └── /admin/lanes     → 水道編排
```
