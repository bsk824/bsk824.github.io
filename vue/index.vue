<template>
	<div id="wrap">
		<Header />
		<router-view></router-view>
	</div>
</template>

<script>
import Header from './components/common/header';

export default {
	components: {Header},
	created: function() {
		window.addEventListener('keydown', function(){
			if(event.code === 'F5') {
				console.log('새로고침 안됌!')
				event.preventDefault();
			}
		});
	}
}

</script>

<style lang="scss">
@import './src/scss/style.scss';
</style>