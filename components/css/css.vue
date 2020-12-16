<template>
	<div class="container">
		<nav class="snb">
			<ul>
				<li><router-link to="/css">css1</router-link></li>
				<li><router-link to="/css/css2">css2</router-link></li>
			</ul>
		</nav>
		<router-view name="sub"></router-view>
	</div>
</template>