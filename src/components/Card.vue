<script>
export default {
	data() {
		return {
		  
		}
	},
	methods: {
		getImagePath: function (imgPath) {
			return new URL(imgPath, 'http://localhost:8000/').href;
		},
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
    <img :src="getImagePath(`storage/${cardProject.img_url}`)" class="card-img-top" :alt="cardProject.name">
    <div class="card-body m-0 p-2">
      <h5 class="card-title playing-card">{{ cardProject.name }}</h5>
      <p class="playing-card-archetipe"><span class="card-data">Authors</span>: {{ cardProject.authors }}</p>
    </div>
  </div>
</template>

<style scoped>
.card {
	height: 220px;
}

.card-data {
	color: #5081b3;
}
</style>