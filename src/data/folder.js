// src/data/library.js

export const folders = [
  {
    id: 1,
    title: 'មន្រ្តីថ្នាក់ខ្ពស់',
    total: 'ឯកសារសរុប ៧ ឯកសារ'
  },
  {
    id: 2,
    title: 'មន្រ្តីថ្នាក់កណ្តាល',
    total: 'ឯកសារសរុប ៧ ឯកសារ'
  },
  {
    id: 3,
    title: 'មន្រ្តីថ្នាក់ក្រោម',
    total: 'ឯកសារសរុប ៧ ឯកសារ'
  }
]

export const documents = [
  {
    id: 1,
    folderId: 1, // 🔑 link to folder
    title: 'សេចក្ដីជូនដំណឹងអំពីការប្រជុំគណៈកម្មការ',
    size: '3.5MB',
    owner: 'អគ្គនាយក',
    department: 'នាយកដ្ឋានផែនការ',
    date: '១៩-០១-២០២៦',
    status: 'approved'
  },
  {
    id: 2,
    folderId: 2,
    title: 'សេចក្ដីរាយការណ៍សង្ខេបលទ្ធផលការងារ',
    size: '3.5MB',
    owner: 'អគ្គនាយករង',
    department: 'នាយកដ្ឋានហិរញ្ញវត្ថុ',
    date: '១៨-០១-២០២៦',
    status: 'rejected'
  },
  {
    id: 3,
    folderId: 1,
    title: 'ផែនការអភិវឌ្ឍធនធានមនុស្ស',
    size: '3.5MB',
    owner: 'អគ្គនាយក',
    department: 'នាយកដ្ឋានរដ្ឋបាល',
    date: '១៧-០១-២០២៦',
    status: 'approved'
  }
]
