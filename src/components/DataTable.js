import React, { useState } from 'react';

export default function DataTable({ headers, rows, onUpdate, lang }) {
  const [editIdx, setEditIdx] = useState(null);
  const [editRow, setEditRow] = useState({});
  const [addMode, setAddMode] = useState(false);
  const [newRow, setNewRow] = useState({});

  const startEdit = (idx) => {
    setEditIdx(idx);
    setEditRow({ ...rows[idx] });
  };

  const saveEdit = () => {
    const updated = [...rows];
    updated[editIdx] = editRow;
    onUpdate(updated);
    setEditIdx(null);
  };

  const cancelEdit = () => {
    setEditIdx(null);
    setEditRow({});
  };

  const deleteRow = (idx) => {
    const updated = rows.filter((_, i) => i !== idx);
    onUpdate(updated);
    if (editIdx === idx) setEditIdx(null);
  };

  const startAdd = () => {
    const empty = {};
    headers.forEach((h) => { empty[h] = ''; });
    setNewRow(empty);
    setAddMode(true);
  };

  const saveAdd = () => {
    onUpdate([...rows, newRow]);
    setAddMode(false);
    setNewRow({});
  };

  const cancelAdd = () => {
    setAddMode(false);
    setNewRow({});
  };

  return (
    <div className="border border-gray-200 rounded-lg bg-white overflow-hidden mb-4">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
        <span className="text-sm font-medium text-gray-700">
          {lang === 'zh' ? `共 ${rows.length} 筆紀錄` : `${rows.length} records`}
        </span>
        <button
          onClick={startAdd}
          className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
        >
          {lang === 'zh' ? '+ 新增' : '+ Add'}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="border-b border-gray-200 px-2 py-1.5 text-left font-medium text-gray-500 w-16">#</th>
              {headers.map((h) => (
                <th key={h} className="border-b border-gray-200 px-2 py-1.5 text-left font-medium text-gray-700">
                  {h}
                </th>
              ))}
              <th className="border-b border-gray-200 px-2 py-1.5 text-center font-medium text-gray-500 w-24">
                {lang === 'zh' ? '操作' : 'Actions'}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50`}>
                <td className="border-b border-gray-100 px-2 py-1.5 text-gray-400 text-xs">{i + 1}</td>
                {headers.map((h) => (
                  <td key={h} className="border-b border-gray-100 px-2 py-1.5">
                    {editIdx === i ? (
                      <input
                        type="text"
                        value={editRow[h] || ''}
                        onChange={(e) => setEditRow({ ...editRow, [h]: e.target.value })}
                        className="w-full px-1 py-0.5 border border-blue-300 rounded text-sm focus:outline-none focus:border-blue-500"
                      />
                    ) : (
                      <span className="text-gray-700">{row[h]}</span>
                    )}
                  </td>
                ))}
                <td className="border-b border-gray-100 px-2 py-1.5 text-center">
                  {editIdx === i ? (
                    <span className="flex gap-1 justify-center">
                      <button onClick={saveEdit} className="text-xs text-green-600 hover:text-green-800 font-medium">
                        {lang === 'zh' ? '儲存' : 'Save'}
                      </button>
                      <button onClick={cancelEdit} className="text-xs text-gray-500 hover:text-gray-700">
                        {lang === 'zh' ? '取消' : 'Cancel'}
                      </button>
                    </span>
                  ) : (
                    <span className="flex gap-1 justify-center">
                      <button onClick={() => startEdit(i)} className="text-xs text-blue-600 hover:text-blue-800">
                        {lang === 'zh' ? '編輯' : 'Edit'}
                      </button>
                      <button onClick={() => deleteRow(i)} className="text-xs text-red-500 hover:text-red-700">
                        {lang === 'zh' ? '刪除' : 'Del'}
                      </button>
                    </span>
                  )}
                </td>
              </tr>
            ))}

            {/* Add new row */}
            {addMode && (
              <tr className="bg-green-50">
                <td className="border-b border-gray-100 px-2 py-1.5 text-green-600 text-xs font-bold">NEW</td>
                {headers.map((h) => (
                  <td key={h} className="border-b border-gray-100 px-2 py-1.5">
                    <input
                      type="text"
                      value={newRow[h] || ''}
                      onChange={(e) => setNewRow({ ...newRow, [h]: e.target.value })}
                      placeholder={h}
                      className="w-full px-1 py-0.5 border border-green-300 rounded text-sm focus:outline-none focus:border-green-500"
                    />
                  </td>
                ))}
                <td className="border-b border-gray-100 px-2 py-1.5 text-center">
                  <span className="flex gap-1 justify-center">
                    <button onClick={saveAdd} className="text-xs text-green-600 hover:text-green-800 font-medium">
                      {lang === 'zh' ? '新增' : 'Add'}
                    </button>
                    <button onClick={cancelAdd} className="text-xs text-gray-500 hover:text-gray-700">
                      {lang === 'zh' ? '取消' : 'Cancel'}
                    </button>
                  </span>
                </td>
              </tr>
            )}

            {rows.length === 0 && !addMode && (
              <tr>
                <td colSpan={headers.length + 2} className="px-4 py-6 text-center text-gray-400 text-sm">
                  {lang === 'zh' ? '尚無資料，請匯入 CSV 或手動新增' : 'No data. Import CSV or add manually.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
