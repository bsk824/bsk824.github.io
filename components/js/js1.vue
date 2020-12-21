<template>
	<section class="contents">
		<div>
			<input type="text" v-model="dataName" placeholder="이름">
			<input type="text" v-model="dataVal" placeholder="값">
			<button type="button" @click="dataAdd">추가</button>
		</div>
		<div v-for="(row, idx) in  list" :key="idx">
			<span>{{row.name}}</span>
			<span>{{row.val}}</span>
		</div>
	</section>
</template>

<script>
export default {
	data() {
		return {
			list : [
				{name: 'name1', val : 300},
				{name: 'name2', val : 500},
				{name: 'name3', val : 1000},
				{name: 'name4', val : 100},
			],
			dataName: null,
			dataVal: null,
			total : null
		}
	},
	methods: {
		contSort(prev, next) {
			if(prev.val == next.val) {
				return 0;
			}
			return prev.val < next.val ? 1 : -1;
		},
		dataAdd() {
			this.list.push({name: this.dataName, val: this.dataVal});
			this.list.sort(this.contSort);
		}
	},
	created: function() {
		this.list.sort(this.contSort);
	}
}
</script>