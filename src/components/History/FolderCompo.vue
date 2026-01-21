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
    background: var(--ocm-app-bg); /* themed background */
    border-radius: 16px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    border: 1px solid var(--ocm-app-border);
    color: var(--ocm-color);
  }
  
  .folder-card:hover {
    background: var(--ocm-active-bg);
  }
  
  .folder-icon {
    width: 56px;
    height: 56px;
    background: var(--ocm-brand-color); /* brand */
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .folder-icon-svg {
    width: 28px;
    height: 28px;
    color: #000; /* brand icon contrast */
  }
  
  .folder-title {
    font-size: 16px;
    color: var(--ocm-color);
    font-weight: 700;
  }
  
  .folder-total {
    font-size: 14px;
    opacity: 0.75;
  }
  
  /* Dark mode: this app uses body.ocm_dark_skin (not `.dark`) */
  :global(body.ocm_dark_skin) .folder-icon-svg {
    color: #000; /* keep strong contrast on brand color */
  }
  </style>
  