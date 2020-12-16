<template>
	<div class="container">
		<nav class="snb">
			<ul>
				<li><router-link to="/js">js1</router-link></li>
				<li><router-link to="/js/covid">covid</router-link></li>
			</ul>
		</nav>
		<router-view name="sub"></router-view>
	</div>
</template>