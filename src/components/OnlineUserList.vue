<template>
    <div class="w-full max-w-sm bg-white rounded-xl shadow-sm border">
      <!-- Header -->
      <div class="px-4 py-3 border-b">
        <h2 class="text-lg font-semibold text-gray-800">
          Online Users
        </h2>
      </div>
  
      <!-- Scrollable List -->
      <div class="max-h-[420px] overflow-y-auto divide-y">
        <div
          v-for="user in users"
          :key="user.id"
          class="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition"
        >
          <!-- Left -->
          <div class="flex items-center gap-3">
            <img
              :src="user.avatar"
              alt="avatar"
              class="w-10 h-10 rounded-full object-cover"
            />
            <span class="font-medium text-gray-800">
              {{ user.name }}
            </span>
          </div>
  
          <!-- Online Dot -->
          <span
            class="w-3 h-3 rounded-full"
            :class="user.online ? 'bg-green-500' : 'bg-gray-300'"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const users = [
    {
      id: 1,
      name: 'Angkara Toldo',
      avatar: 'https://i.pravatar.cc/150?img=12',
      online: true,
    },
    {
      id: 2,
      name: 'Kyllian Rex',
      avatar: 'https://i.pravatar.cc/150?img=32',
      online: true,
    },
    {
      id: 3,
      name: 'Luca Rijal',
      avatar: 'https://i.pravatar.cc/150?img=45',
      online: true,
    },
    {
      id: 4,
      name: 'Cristiano Edgar',
      avatar: 'https://i.pravatar.cc/150?img=51',
      online: false,
    },
    {
      id: 5,
      name: 'Denny Pamungkas',
      avatar: 'https://i.pravatar.cc/150?img=64',
      online: true,
    },
    {
      id: 6,
      name: 'Cheryl Swift',
      avatar: 'https://i.pravatar.cc/150?img=70',
      online: true,
    },
    {
      id: 7,
      name: 'Danica Mahalini',
      avatar: 'https://i.pravatar.cc/150?img=77',
      online: false,
    },
    {
      id: 8,
      name: 'Lina Punk Oy Oy',
      avatar: 'https://i.pravatar.cc/150?img=81',
      online: true,
    },
  ]
  </script>
  