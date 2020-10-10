<template>
	<div>
		<div>
			<router-link to="/test">index</router-link>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
import router from './routes';

export default {
	router,
}
</script>