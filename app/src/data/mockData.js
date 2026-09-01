// Temporary mock data — replace with API calls to the local Express layer
// (see docs/api-contracts.md) once the backend is wired in.

export const customers = [
  {
    id: 'c1',
    name: 'Ramesh Patil',
    phone: '+91 98765 43210',
    pendingDue: 2600,
    lastActivity: 'Today, 2:14 PM',
    entries: [
      { id: 'e1', type: 'credit', amount: 500, item: null, date: 'Today, 2:14 PM' },
      { id: 'e2', type: 'payment', amount: 300, item: null, date: 'Yesterday, 6:40 PM' },
      { id: 'e3', type: 'credit', amount: 1200, item: 'Rice, Oil', date: '3 days ago' },
      { id: 'e4', type: 'credit', amount: 1200, item: null, date: '1 week ago' },
    ],
  },
  {
    id: 'c2',
    name: 'Suresh Yadav',
    phone: '+91 91234 56780',
    pendingDue: 0,
    lastActivity: 'Today, 12:30 PM',
    entries: [
      { id: 'e5', type: 'payment', amount: 1000, item: null, date: 'Today, 12:30 PM' },
      { id: 'e6', type: 'credit', amount: 1000, item: 'Groceries', date: '2 weeks ago' },
    ],
  },
  {
    id: 'c3',
    name: 'Anita Desai',
    phone: '+91 90909 12121',
    pendingDue: 850,
    lastActivity: 'Today, 11:45 AM',
    entries: [
      { id: 'e7', type: 'credit', amount: 250, item: null, date: 'Today, 11:45 AM' },
      { id: 'e8', type: 'credit', amount: 600, item: 'Milk, Bread', date: '5 days ago' },
    ],
  },
  {
    id: 'c4',
    name: 'Vinit Bari',
    phone: '+91 99887 76655',
    pendingDue: 4200,
    lastActivity: 'Yesterday, 4:05 PM',
    entries: [
      { id: 'e9', type: 'credit', amount: 4200, item: 'Cement, Tools', date: 'Yesterday, 4:05 PM' },
    ],
  },
  {
    id: 'c5',
    name: 'Pooja Sharma',
    phone: '+91 98123 45670',
    pendingDue: 0,
    lastActivity: '3 days ago',
    entries: [
      { id: 'e10', type: 'payment', amount: 700, item: null, date: '3 days ago' },
      { id: 'e11', type: 'credit', amount: 700, item: null, date: '2 weeks ago' },
    ],
  },
];

export const recentEntries = [
  { id: '1', name: 'Ramesh Patil', amount: 500, type: 'credit', time: '2:14 PM' },
  { id: '2', name: 'Cash Sale', amount: 180, type: 'debit', time: '1:52 PM' },
  { id: '3', name: 'Suresh Yadav', amount: 1000, type: 'payment', time: '12:30 PM' },
  { id: '4', name: 'Anita Desai', amount: 250, type: 'credit', time: '11:45 AM' },
];

export const summary = {
  todaySales: 3250,
  creditGiven: 1400,
  pendingDues: customers.reduce((sum, c) => sum + c.pendingDue, 0),
};

// Full transaction feed across all customers — powers the History screen.
// Built from the same `customers` data above so numbers stay consistent.
export const fullHistory = customers
  .flatMap((c) =>
    c.entries.map((e) => ({
      ...e,
      customerId: c.id,
      customerName: c.name,
    }))
  )
  .concat([
    { id: 'h1', type: 'debit', amount: 180, item: null, date: 'Today, 1:52 PM', customerId: null, customerName: 'Cash Sale' },
    { id: 'h2', type: 'debit', amount: 95, item: null, date: 'Today, 10:20 AM', customerId: null, customerName: 'Cash Sale' },
    { id: 'h3', type: 'debit', amount: 220, item: null, date: 'Yesterday, 5:10 PM', customerId: null, customerName: 'Cash Sale' },
  ]);

// Last 7 days of sales / credit / payments, in rupees — powers the Reports chart.
export const weeklyTrend = [
  { day: 'Mon', sales: 1800, credit: 900, payments: 400 },
  { day: 'Tue', sales: 2200, credit: 600, payments: 700 },
  { day: 'Wed', sales: 1500, credit: 1200, payments: 300 },
  { day: 'Thu', sales: 2600, credit: 500, payments: 900 },
  { day: 'Fri', sales: 3000, credit: 1400, payments: 600 },
  { day: 'Sat', sales: 3400, credit: 800, payments: 1100 },
  { day: 'Sun', sales: 3250, credit: 1400, payments: 1300 },
];

export const monthSummary = {
  totalSales: weeklyTrend.reduce((s, d) => s + d.sales, 0) * 4,
  totalCredit: weeklyTrend.reduce((s, d) => s + d.credit, 0) * 4,
  totalPayments: weeklyTrend.reduce((s, d) => s + d.payments, 0) * 4,
};

// Customers with pending dues, sorted by how overdue they are — powers Reminders.
export const reminderQueue = customers
  .filter((c) => c.pendingDue > 0)
  .map((c, i) => ({
    ...c,
    daysOverdue: [2, 9, 15, 30][i % 4],
  }))
  .sort((a, b) => b.daysOverdue - a.daysOverdue);
