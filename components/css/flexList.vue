<template>
	<section class="contents">
		<ul class="flexList">
			<li><div class="inner">1<br>1<br>1<br></div></li>
			<li><div class="inner">2</div></li>
			<li><div class="inner">3</div></li>
			<li><div class="inner">4</div></li>
			<li><div class="inner">5</div></li>
			<li><div class="inner">6</div></li>
			<li><div class="inner">7</div></li>
			<li><div class="inner">8</div></li>
			<li><div class="inner">9</div></li>
			<li><div class="inner">10<br>10</div></li>
		</ul>
	</section>
</template>

<style lang="scss">
.flexList {
	display: flex;
	flex-wrap: wrap;
	li {
		width: 20%;
		box-sizing: border-box;
		padding: 10px;
	}
	.inner {
		height: 100%;
		border: 1px solid;
	}
}
</style>