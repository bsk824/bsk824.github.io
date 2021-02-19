<template>
	<div class="container">
		<nav class="snb">
			<ul>
				<li><router-link to="/vue/covid">covid</router-link></li>
				<li><router-link to="/vue/board/write">write</router-link></li>
			</ul>
		</nav>
		<router-view name="sub"></router-view>
	</div>
</template>