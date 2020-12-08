<template>
	<div id="wrap">
		<Header />
		<router-view></router-view>
	</div>
</template>

<script>
import Header from './components/common/header';

export default {
	components: {
		Header
	}
}
</script>

<style lang="scss">
	#wrap {
		h1 {font-size: 30px;}
	}
</style>