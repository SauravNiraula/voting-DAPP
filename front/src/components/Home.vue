<template>
  <div class="home-main flex flex-col gap-10">
    <div>
      <h2 class="text-2xl text-green-700">
        Welcome to vote portal
      </h2>
      <p class="text-xl">
        Here you can find all the candidates standing for this election and please give vote to your favourite candidate.
      </p>
    </div> 
    <div>
      <h2 class="text-2xl text-green-700" >What's your role ?</h2>
      <div class="mt-2 flex gap-5">
        <router-link to="admin">
          <button class="bg-green-700 text-white p-3 rounded">Enter as an admin</button>
        </router-link>
        <router-link to="voter">
          <button class="border-2 p-3 rounded border-green-700 text-green-700">Enter as a voter</button>
        </router-link>
      </div>
    </div> 
  </div>
</template>

<script setup>

</script>

<style scoped>
</style>
