/** Stat card definitions. statusKey maps to backend getTotalByStatus records keys; 'all' = sum of all. value is fallback for views that don't sync with backend. */
export const flowStats = [
  { statusKey: 'pending', label: 'លំហូរឯកសារមិនទាន់អនុម័ត', class: 'status_wait', value: '០' },
  { statusKey: 'approved', label: 'លំហូរឯកសារអនុម័តរួច', class: 'status_accept', value: '០' },
  { statusKey: 'all', label: 'លំហូរឯកសារទាំងអស់', class: 'status_all', value: '០' },
  { statusKey: 'draft', label: 'លំហូរឯកសារព្រាង', class: 'status_draft', value: '០' },
  { statusKey: 'rejected', label: 'លំហូរឯកសារមិនយល់ព្រម', class: 'status_decline', value: '០' }
]
