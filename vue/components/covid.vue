<template>
	<section>
		<div class="search">
			<datepicker :language="ko" :disabled-dates="disabledDates" format="yyyyMMdd" v-model="dateStart" placeholder="시작일"></datepicker>
			<datepicker :language="ko" :disabled-dates="disabledDates" format="yyyyMMdd" v-model="dateEnd" placeholder="마지막일"></datepicker>
			<button @click="getData">검색</button>
		</div>
		<div style="position: relative; width: 100%;">
			<canvas id="myChart"></canvas>
		</div>
		<div class="graph-wrap">
			<div class="day-graph" v-if="filtered">
				<div class="day-list" v-for="(row, idx) in filtered" :key="idx" :style="{height: row.per+'%'}">
					<p class="date">{{row.stateDt}}</p>
					<div class="bar">
						<p class="new-count">{{row.new}}</p>
					</div>
					<div class="day-layer">
						<p>기준시간 : {{row.stateTime}}</p>
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
				</div>
			</div>
		</div>

	</section>
</template>
<script>
import Datepicker from 'vuejs-datepicker';
import {ko} from 'vuejs-datepicker/dist/locale';
import Chart from 'chart.js';

export default {
	data() {
		return {
			ko: ko,
			dateStart : null,
			dateEnd : null,
			list : null,
			filtered : null,
			disabledDates: {
				to: new Date(2020, 0, 1),
				from: new Date(),
			},
			newPs: null,
		}
	},
	components: {
		Datepicker
	},
	methods: {
		formatPicker(val){
			var formatVal = null;
			var day = new Date(val);
			day.setDate(day.getDate() - 1);
			var year = String(day.getFullYear());
			var month = String(day.getMonth() + 1);
			var date = String(day.getDate());
			if(month < 10) month = '0'+month;
			if(date < 10) date = '0'+date;
			return formatVal = Number(year + month + date);
		},
		listFilter() {
			var start;
			var end;
			if(this.dateStart == null) {
				start = '20200101';
			} else {
				start = this.formatPicker(this.dateStart);
			}
			if(this.dateEnd == null) {
				end = this.formatPicker(new Date);
			} else {
				end = this.formatPicker(this.dateEnd);
			}

			var totalList = this.list;
			var newList = [];
			var dateList = [];
			var maxNum = 0;

			var sortList = totalList.filter(function(item, idx){
				var list;
				if(item.stateDt >= start && item.stateDt <= end) {
					list = item;
					item['new'] = 0;
					if(totalList[idx-1] != undefined) {
						item['new'] = totalList[idx-1].decideCnt - totalList[idx].decideCnt;
						if(idx > 0) {
							newList.push(item['new']);
						}
						dateList.push(totalList[idx].stateDt);
						if(item['new'] > maxNum) {
							maxNum = item['new'];
						}
					}
				}
				return list;
			});
			sortList.forEach(function(arr){
				arr['per'] = arr.new * 100 / maxNum;
			});
			this.filtered = sortList;
			this.newPs = newList;
			var ctx = document.getElementById('myChart');
			let chart = new Chart(ctx, {
				type: 'line',
				data: {
					labels: dateList,
					datasets: [{
						label: 'omg',
						data: this.newPs,
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
						],
						borderCapStyle: 'butt',
						borderJoinStyle: 'miter',
						borderColor: [
							'rgba(255, 99, 132, 1)',
						],
						borderWidth: 1,
						pointBackgroundColor: 'rgba(255,255,255)'
					}]
				},
				options: {
					tooltips: {
						mode: 'nearest'
					}
				}
			});
		},
		dateSort(prev, next) {
			if(prev.stateDt == next.stateDt) {
				return 0;
			}
			return prev.stateDt < next.stateDt ? 1 : -1;
		},
		getData() {
			if(this.list === null) {
				this.$axios.get('/data/covidDate.json')
				.then((res) => {
					const data = JSON.parse(res.data);
					this.list = data.response.body.items.item.sort(this.dateSort);
					this.listFilter();
				})
				.then((err) => {
					console.log(err);
				});
			} else {
				this.listFilter();
			}
		},
	}
}
</script>

<style lang="scss">
.vdp-datepicker {
	.vdp-datepicker__calendar {background: #000;}
	.vdp-datepicker__calendar header {color: #fff;}
	.vdp-datepicker__calendar header .prev:not(.disabled):hover,
	.vdp-datepicker__calendar header .next:not(.disabled):hover,
	.vdp-datepicker__calendar header .up:not(.disabled):hover {background: #000;}
	.vdp-datepicker__calendar header .prev:after {border-right-color: #ddd;}
	.vdp-datepicker__calendar header .next:after {border-left-color: #ddd;}
	.vdp-datepicker__calendar header .prev.disabled:after {border-right-color: #000;}
	.vdp-datepicker__calendar header .next.disabled:after {border-left-color: #000;}
}
.graph-wrap {
	overflow: auto;
	padding-bottom: 30px;
}
.day {
	&-graph {
		display: flex;
		margin-top: 100px;
		height: 200px;
		align-items: flex-end;
	}
	&-list {
		position: relative;
		display: flex;
		align-items: flex-end;
		border-bottom: 1px solid #d3d4d6;
		&:hover {
			.day-layer {display: block;}
		}
		.bar {
			position: absolute;
			top: 0; bottom: 0; left: 50%;
			width: 20px; margin-left: -10px;
			background: red;
		}
		.date {
			position: relative;
			bottom: -25px;
			margin: 0 10px;
			z-index: 2;
		}
		.new-count {
			position: absolute;
			top: -20px; left: 50%;
			transform: translateX(-50%);
		}
	}
	&-layer {
		position: absolute;
		display: none;
		white-space: nowrap;
			z-index: 2;
	}
}
</style>
