<template>
	<section>
		<h2>{{result}}</h2>
		<div class="search">
			<input type="text" v-model="dateStart" maxlength="8" placeholder="예) 20201201">
			<input type="text" v-model="dateEnd" maxlength="8" placeholder="예) 20201202">
			<button @click="getData()">click</button>
		</div>
		<div v-for="(row, idx) in list" :key="idx">
			<p>기준일 : {{row.stateDt}}</p>
			<p>기준시간 : {{row.stateTime}}</p>
			<p>확진자 : {{row.decideCnt}}</p>
			<p>확진자 수 : {{row.decideCnt}}</p>
			<p>격리해제 수 : {{row.clearCnt}}</p>
			<p>검사진행 수 : {{row.examCnt}}</p>
			<p>사망자 수 : {{row.deathCnt}}</p>
			<p>치료중 환자 수 : {{row.careCnt}}</p>
			<p>결과 음성 수 : {{row.resutlNegCnt}}</p>
			<p>누적 검사 수 : {{row.accExamCnt}}</p>
			<p>누적 검사 완료 수 : {{row.accExamCompCnt}}</p>
			<p>누적 확진률 : {{row.accDefRate}}</p>
		</div>
	</section>
</template>

<script>
export default {
	data() {
		return {
			result: 'covid',
			dateStart : '',
			dateEnd : '',
			list : ''
		}
	},
	methods: {
		getData() {
			this.$axios.get('http://localhost:8080/data/?start='+this.dateStart+'&end='+this.dateEnd)
			.then((res) => {
				if(res.data.response.body.items.item.length) {
					this.list = res.data.response.body.items.item
				} else {
					this.list = [res.data.response.body.items.item];
				}
			})
			.then((err) => {
				console.log(err);
			})
		}
	}
}
</script>

<style lang="scss">
	#wrap {
		h1 {font-size: 30px;}
	}
</style>