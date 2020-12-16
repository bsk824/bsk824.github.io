<template>
	<div>
		<nav class="snb">
			<router-link to="/html">html1</router-link>
			<router-link to="/html/html2">html2</router-link>
		</nav>
		<div>
			<router-view name="sub"></router-view>
		</div>
	</div>
</template>