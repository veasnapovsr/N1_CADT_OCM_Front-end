<script setup>
  import { folders } from '@/data/folder'
  import { Folder } from 'lucide-vue-next'
  </script>
  
  <template>
    <div
      class="grid justify-start gap-6
             grid-cols-[repeat(auto-fill,minmax(240px,260px))]"
    >
      <div
        v-for="folder in folders"
        :key="folder.id"
        class="folder-card transition cursor-pointer flex flex-col gap-1"
      >
        <div class="folder-icon">
          <Folder class="folder-icon-svg" />
        </div>
  
        <div class="folder-title">
          {{ folder.title }}
        </div>
  
        <div class="folder-total">
          {{ folder.total }}
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .folder-card {
    background: #e5e7eb; /* light gray background */
    border-radius: 16px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  
  .folder-card:hover {
    background: #d1d5db; /* light gray on hover */
  }
  
  .folder-icon {
    width: 56px;
    height: 56px;
    background: #fcd34d; /* yellow background for the icon */
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .folder-icon-svg {
    width: 28px;
    height: 28px;
    color: #4b5563; /* gray-600 color for the icon */
  }
  
  .folder-title {
    font-size: 16px;
    color: #111827; /* gray-900 for dark text */
  }
  
  .folder-total {
    font-size: 14px;
    color: #6b7280; /* gray-500 for secondary text */
  }
  
  /* Dark mode overrides when .dark is present on html/body */
  :global(.dark) .folder-card {
    background: #1f2937; /* dark gray background */
    color: #f3f4f6; /* light text for dark mode */
  }
  
  :global(.dark) .folder-card:hover {
    background: #374151; /* darker gray on hover */
  }
  
  :global(.dark) .folder-icon {
    background: #374151; /* dark background for the icon */
  }
  
  :global(.dark) .folder-icon-svg {
    color: #e5e7eb; /* light gray for the icon in dark mode */
  }
  
  :global(.dark) .folder-title {
    color: #f3f4f6; /* light text for the title */
  }
  
  :global(.dark) .folder-total {
    color: #9ca3af; /* medium gray for the total text */
  }
  </style>
  