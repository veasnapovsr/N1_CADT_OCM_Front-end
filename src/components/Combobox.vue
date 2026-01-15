<script setup>
import { ref, nextTick } from 'vue'

import { Button } from '@/components/ui/button'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
  CommandGroup,
} from '@/components/ui/command'

const open = ref(false)
const value = ref('')

function onSelect(payload) {
  const val =
    typeof payload === 'string'
      ? payload
      : (payload?.detail?.value ?? payload?.target?.value ?? '')

  value.value = val

  nextTick(() => {
    open.value = false
  })
}
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        class="w-[260px] justify-between text-left"
      >
        <span class="truncate">
          {{
            value === 'report' ? 'Report'
            : value === 'letter' ? 'Letter'
            : value === 'memo' ? 'Memo'
            : 'Select document type'
          }}
        </span>
      </Button>
    </PopoverTrigger>

    <PopoverContent
      forceMount
      :teleport="true"
      align="start"
      class="z-[9999] w-[260px] p-0 rounded-xl border bg-white shadow-md"
    >
      <Command>
        <CommandInput
          placeholder="Search document type…"
          class="[&>svg]:hidden [&>input]:h-9 [&>input]:px-3 [&>input]:text-sm"
        />

        <CommandList class="max-h-60 overflow-y-auto">
          <CommandEmpty class="px-4 py-2 text-sm text-gray-500">
            No result found
          </CommandEmpty>

          <CommandGroup>
            <CommandItem value="report" @select="onSelect" class="px-4 py-2 text-sm cursor-pointer">
              Report
            </CommandItem>

            <CommandItem value="letter" @select="onSelect" class="px-4 py-2 text-sm cursor-pointer">
              Letter
            </CommandItem>

            <CommandItem value="memo" @select="onSelect" class="px-4 py-2 text-sm cursor-pointer">
              Memo
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
