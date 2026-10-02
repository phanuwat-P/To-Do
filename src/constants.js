export const PRIORITIES = ['low', 'medium', 'high']

export const PRI = {
  low: {
    label: 'ต่ำ',
    badge: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    dot: 'bg-emerald-500',
    bar: 'border-l-emerald-400',
  },
  medium: {
    label: 'ปานกลาง',
    badge: 'bg-amber-50 text-amber-700 ring-amber-200',
    dot: 'bg-amber-500',
    bar: 'border-l-amber-400',
  },
  high: {
    label: 'สูง',
    badge: 'bg-rose-50 text-rose-700 ring-rose-200',
    dot: 'bg-rose-500',
    bar: 'border-l-rose-400',
  },
}

export const FILTERS = [
  ['all', 'ทั้งหมด'],
  ['active', 'ยังไม่เสร็จ'],
  ['done', 'เสร็จแล้ว'],
]

export const SEED = [
  { id: 1, text: 'ส่งรายงานโครงงาน', done: false, pri: 'high' },
  { id: 2, text: 'ซื้อของเข้าบ้าน', done: false, pri: 'medium' },
  { id: 3, text: 'อ่านหนังสือก่อนนอน', done: true, pri: 'low' },
]

export const LEAVE_MS = 280
