<script>
import axios from 'axios';
import Card from '../components/Card.vue';

export default {
	name: 'AppMain',
	data() {
		return {
		  projectsList: [],
			apiUrl: 'http://127.0.0.1:8000/api/projects',
		}
	},
	methods: {
		getProjectList() {
      axios.get(this.apiUrl)
        .then(response => {
          // handle success
					console.log(response.data);
					this.projectsList = response.data.results;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    },
	},
	components: {
		Card,
	},
	created() {
		this.getProjectList();
	}
}
</script>

<template>
	<!-- Main -->
  <main class="">
		<h1 class="text-center py-5">Projects</h1>
    <div class="card-container container-md">
      <!-- Contatori di card -->
      <div class="filter-counter-box row d-block p-4">
        <div>Completed projects: <span class="counter-pillow"><span class="pillow-text">{{ projectsList.length }}</span></span></div> <!-- counter for projects -->
      </div>
      <!-- Row di cols -->
      <div class="row g-3 mt-5">
        <!-- Cols -->
        <div class="col-2 card-col" :class="{ 'offset-1': index % 5 === 0 }" v-for="(project, index) in projectsList" :key="index">
          <Card :cardProject="project"	/>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
.counter-pillow {
    padding: 3px 10px;
    margin-left: 5px;
    background-color: #ffae4b;
    border-radius: 15px;
		
    color: rgb(var(--bs-dark-rgb));

		.pillow-text {
			vertical-align: 5%;
		}
  }
</style>