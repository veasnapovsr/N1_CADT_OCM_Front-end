<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import { DateFormatter, getLocalTimeZone, today } from '@internationalized/date'
import { ref } from 'vue'

import { CalendarIcon } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const date = ref<DateValue | null>(null)
const defaultPlaceholder = today(getLocalTimeZone())

const df = new DateFormatter('en-US', {
  dateStyle: 'medium',
})
</script>

<template>
  <div class="items">
    <Popover v-slot="{ close }">
      <PopoverTrigger as-child>
        <Button
          variant="outline"
          class="w-full h-[35px] justify-start text-left font-normal text-[15px]"
        >
          <CalendarIcon class="mr-2 h-4 w-4" />
          {{ date ? df.format(date.toDate(getLocalTimeZone())) : 'ជ្រើសរើសកាលបរិច្ឆេទ' }}
        </Button>
      </PopoverTrigger>

      <PopoverContent class="w-auto p-0" align="start">
        <Calendar
          v-model="date"
          :default-placeholder="defaultPlaceholder"
          initial-focus
          @update:model-value="close"
        />
      </PopoverContent>
    </Popover>
  </div>
</template>
