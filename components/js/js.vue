<template>
	<div>
		<nav class="snb">
			<router-link to="/js">js1</router-link>
			<router-link to="/js/covid">covid</router-link>
		</nav>
		<div>
			<router-view name="sub"></router-view>
		</div>
	</div>
</template>