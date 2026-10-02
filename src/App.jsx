import { useRef, useState } from 'react'
import { Plus } from 'lucide-react'
import TodoItem from './components/TodoItem'
import { FILTERS, LEAVE_MS, PRI, PRIORITIES, SEED } from './constants'

export default function App() {
  const [todos, setTodos] = useState(SEED)
  const [text, setText] = useState('')
  const [pri, setPri] = useState('medium')
  const [filter, setFilter] = useState('all')
  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState('')
  const nextId = useRef(SEED.length + 1)

  const add = () => {
    const v = text.trim()
    if (!v) return
    setTodos((ts) => [{ id: nextId.current++, text: v, done: false, pri }, ...ts])
    setText('')
  }

  const toggle = (id) =>
    setTodos((ts) => ts.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))

  const cycle = (id) =>
    setTodos((ts) =>
      ts.map((t) =>
        t.id === id ? { ...t, pri: PRIORITIES[(PRIORITIES.indexOf(t.pri) + 1) % PRIORITIES.length] } : t
      )
    )

  const remove = (id) => {
    setTodos((ts) => ts.map((t) => (t.id === id ? { ...t, leaving: true } : t)))
    setTimeout(() => setTodos((ts) => ts.filter((t) => t.id !== id)), LEAVE_MS)
  }

  const clearDone = () => {
    setTodos((ts) => ts.map((t) => (t.done ? { ...t, leaving: true } : t)))
    setTimeout(() => setTodos((ts) => ts.filter((t) => !t.done)), LEAVE_MS)
  }

  const startEdit = (t) => {
    setEditId(t.id)
    setEditText(t.text)
  }

  const save = () => {
    if (editId === null) return
    const v = editText.trim()
    if (v) setTodos((ts) => ts.map((t) => (t.id === editId ? { ...t, text: v } : t)))
    setEditId(null)
  }

  const cancel = () => setEditId(null)

  const remaining = todos.filter((t) => !t.done && !t.leaving).length
  const doneCount = todos.filter((t) => t.done).length
  const shown = todos.filter((t) =>
    filter === 'all' ? true : filter === 'active' ? !t.done : t.done
  )

  const emptyText =
    filter === 'done'
      ? 'ยังไม่มีงานที่เสร็จ'
      : filter === 'active'
      ? 'ไม่มีงานค้าง เยี่ยมมาก!'
      : 'ยังไม่มีงาน เพิ่มงานแรกได้เลย'

  return (
    <main className="max-w-xl mx-auto px-4 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-bold mb-1">รายการงานของฉัน</h1>
      <p className="text-slate-500 mb-6">จดสิ่งที่ต้องทำ แล้วติ๊กเมื่อเสร็จ</p>

      <section className="bg-white rounded-2xl shadow-lg p-4 sm:p-5 mb-6">
        <div className="flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && add()}
            placeholder="เพิ่มงานใหม่..."
            aria-label="งานใหม่"
            className="flex-1 min-w-0 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-base placeholder:text-slate-400"
          />
          <button
            onClick={add}
            className="shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 transition-colors"
          >
            <Plus size={18} />
            <span>เพิ่ม</span>
          </button>
        </div>

        <div className="flex items-center gap-2 mt-3 flex-wrap">
          <span className="text-sm text-slate-500">ความสำคัญ:</span>
          {PRIORITIES.map((k) => (
            <button
              key={k}
              onClick={() => setPri(k)}
              aria-pressed={pri === k}
              className={
                'inline-flex items-center gap-1.5 text-sm px-3 py-1 rounded-full ring-1 ring-inset transition-colors ' +
                (pri === k
                  ? PRI[k].badge + ' font-medium'
                  : 'bg-white text-slate-500 ring-slate-200 hover:bg-slate-50')
              }
            >
              <span className={'w-2 h-2 rounded-full ' + PRI[k].dot} />
              {PRI[k].label}
            </button>
          ))}
        </div>
      </section>

      <div className="flex gap-1 p-1 bg-slate-200/70 rounded-xl mb-4" role="tablist">
        {FILTERS.map(([k, label]) => (
          <button
            key={k}
            role="tab"
            aria-selected={filter === k}
            onClick={() => setFilter(k)}
            className={
              'flex-1 text-sm py-2 rounded-lg transition-all ' +
              (filter === k ? 'bg-white shadow font-medium text-slate-900' : 'text-slate-500 hover:text-slate-800')
            }
          >
            {label}
          </button>
        ))}
      </div>

      <div>
        {shown.length === 0 ? (
          <div className="text-center text-slate-400 py-10 bg-white/60 rounded-xl border border-dashed border-slate-300">
            {emptyText}
          </div>
        ) : (
          shown.map((t) => (
            <TodoItem
              key={t.id}
              todo={t}
              editing={editId === t.id}
              editText={editText}
              setEditText={setEditText}
              onToggle={toggle}
              onRemove={remove}
              onCycle={cycle}
              onStartEdit={startEdit}
              onSave={save}
              onCancel={cancel}
            />
          ))
        )}
      </div>

      <div className="flex items-center justify-between mt-4 text-sm text-slate-500">
        <span>เหลือ {remaining} งานที่ต้องทำ</span>
        {doneCount > 0 && (
          <button onClick={clearDone} className="text-rose-600 hover:text-rose-700 hover:underline">
            ล้างงานที่เสร็จแล้ว ({doneCount})
          </button>
        )}
      </div>

      <p className="text-xs text-slate-400 mt-6 text-center">
        ดับเบิลคลิกที่ข้อความเพื่อแก้ไข · กดป้ายความสำคัญเพื่อเปลี่ยนระดับ
      </p>
    </main>
  )
}
