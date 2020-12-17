<template>
	<div class="container">
		<nav class="snb">
			<ul>
				<li><router-link to="/vue">vue1</router-link></li>
				<li><router-link to="/vue/vue2">vue2</router-link></li>
			</ul>
		</nav>
		<router-view name="sub"></router-view>
	</div>
</template>