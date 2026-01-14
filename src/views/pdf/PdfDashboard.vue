<script setup>
import { dashboardStats } from '@/data/Flowstatuscheck'
import DashboardStatCard from '@/components/DashboardStatCard.vue'
</script>

<div class="ocm_bfw ocm_stat">
  <DashboardStatCard
    v-for="(stat, i) in dashboardStats"
    :key="i"
    :value="stat.value"
    :title="stat.title"
    :statusClass="stat.statusClass"
  >
    <!-- your SVG stays here -->
  </DashboardStatCard>
</div>
