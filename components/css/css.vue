<template>
	<div>
		<nav class="snb">
			<router-link to="/css">css1</router-link>
			<router-link to="/css/css2">css2</router-link>
		</nav>
		<div>
			<router-view name="sub"></router-view>
		</div>
	</div>
</template>