<template>
	<div id="wrap">
		<h1>{{result}}</h1>
		<button @click="onChg">click</button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			result: 'hello',
		}
	},
	methods: {
		onChg() {
			this.result = 'aa';
		}
	}
}
</script>

<style lang="scss">
	#wrap {
		background:blue;
		h1 {font-size: 30px;}
	}
</style>