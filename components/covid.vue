<template>
	<section>
		<h2>{{result}}</h2>
		<div class="search">
			<input type="text" v-model="dateStart" maxlength="8" placeholder="예) 20201201" @keyup.enter="getData">
			<input type="text" v-model="dateEnd" maxlength="8" placeholder="예) 20201202" @keyup.enter="getData">
			<button @click="getData">click</button>
		</div>
		<div v-for="(row, idx) in filtered" :key="idx">
			<p>기준일 : {{row.stateDt}}</p>
			<p>기준시간 : {{row.stateTime}}</p>
			<p>확진자 수 : {{row.decideCnt}}</p>
			<p>추가된 확진자 수 : {{row.new}}</p>
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
			dateStart : null,
			dateEnd : null,
			list : null,
			filtered : null,
			today : null
		}
	},
	methods: {
		sort() {
			let totalList = this.list;
			let dateStart = Number(this.dateStart);
			let dateEnd = Number(this.dateEnd);
			if(dateEnd == 0) dateEnd = this.today;
			this.filtered = totalList.filter(function(item, idx){
				let list;
				if(item.stateDt >= dateStart && item.stateDt <= dateEnd) {
					list = item;
					if(totalList[idx-1] != undefined) {
						item['new'] = totalList[idx-1].decideCnt - totalList[idx].decideCnt;
					}
				}
				return list;
			});
		},
		getData() {
			if(this.list === null) {
				let today = new Date();
				let year = String(today.getFullYear());
				let month = String(today.getMonth() + 1);
				let date = String(today.getDate());
				if(date < 10) date = '0'+date;
				this.today = Number(year + month + date);
				this.$axios.get('http://localhost:8080/covid/?start=20200101&end='+this.today)
				.then((res) => {
					this.list = res.data.response.body.items.item;
					this.sort();
				})
				.then((err) => {
					console.log(err);
				});
			} else {
				this.sort();
			}
			
		}
	}
}
</script>

<style lang="scss">
</style>