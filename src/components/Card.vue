<script>
export default {
	data() {
		return {
		  
		}
	},
	props: {
		cardProject: {
			type: Object,
			required: true
		}
	}
}
</script>

<template>
  <!-- Card Bootstrap -->
  <div class="card">
    <img :src="cardProject.image_url" class="card-img-top" alt="card.name">
    <div class="card-body m-0 p-2">
      <h5 class="card-title playing-card">{{ cardProject.name }}</h5>
      <p class="playing-card-archetipe">{{ cardProject.authors }}</p>
    </div>
  </div>
</template>

<style scoped>
</style>