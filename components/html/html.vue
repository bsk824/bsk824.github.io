<template>
	<div class="container">
		<nav class="snb">
			<ul>
				<li><router-link to="/html">html1</router-link></li>
				<li><router-link to="/html/html2">html2</router-link></li>
			</ul>
		</nav>
		<router-view name="sub"></router-view>
	</div>
</template>