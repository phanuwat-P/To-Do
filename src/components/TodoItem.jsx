import { useEffect, useRef } from 'react'
import { Check, Trash2 } from 'lucide-react'
import { PRI } from '../constants'

export default function TodoItem({
  todo,
  editing,
  editText,
  setEditText,
  onToggle,
  onRemove,
  onCycle,
  onStartEdit,
  onSave,
  onCancel,
}) {
  const inputRef = useRef(null)
  const p = PRI[todo.pri]

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [editing])

  return (
    <div className={'todo-row' + (todo.leaving ? ' leaving' : '')}>
      <div>
        <div className={'flex items-center gap-3 bg-white rounded-xl shadow-md border-l-4 px-3 py-3 sm:px-4 ' + p.bar}>
          <button
            onClick={() => onToggle(todo.id)}
            aria-pressed={todo.done}
            aria-label={todo.done ? 'ทำเครื่องหมายว่ายังไม่เสร็จ' : 'ทำเครื่องหมายว่าเสร็จแล้ว'}
            className={
              'shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ' +
              (todo.done
                ? 'bg-blue-600 border-blue-600 text-white'
                : 'border-slate-300 text-transparent hover:border-blue-500')
            }
          >
            <Check size={14} strokeWidth={3} />
          </button>

          <div className="flex-1 min-w-0">
            {editing ? (
              <input
                ref={inputRef}
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') onSave()
                  if (e.key === 'Escape') onCancel()
                }}
                onBlur={onSave}
                className="w-full rounded-md border border-blue-400 px-2 py-1 text-base bg-white"
              />
            ) : (
              <span
                onDoubleClick={() => onStartEdit(todo)}
                title="ดับเบิลคลิกเพื่อแก้ไข"
                className={
                  'block break-words cursor-text select-none ' +
                  (todo.done ? 'line-through text-slate-400' : 'text-slate-800')
                }
              >
                {todo.text}
              </span>
            )}
          </div>

          <button
            onClick={() => onCycle(todo.id)}
            title="กดเพื่อเปลี่ยนความสำคัญ"
            className={'shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ring-1 ring-inset ' + p.badge}
          >
            {p.label}
          </button>

          <button
            onClick={() => onRemove(todo.id)}
            aria-label="ลบงาน"
            className="shrink-0 p-2 -mr-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
