<template>
	<main>
		<p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
		<p>가나다라마바사아자차카타파하</p>

		<hr>

		<div>
			<p>일부값 / 전체값 * 100 = %</p>
			<input type="text" v-model="cal1_1" @keydown.enter="cal('type1')" style="width:100px;"> 에서
			<input type="text" v-model="cal1_2" @keydown.enter="cal('type1')" style="width:100px;"> 의 %는
			<strong v-if="cal1_3">{{this.cal1_3}}%</strong>
		</div>

		<div style="margin-top: 20px;">
			<p>일부값 / (% / 100) = 전체값</p>
			<input type="text" v-model="cal2_1" @keydown.enter="cal('type2')" style="width:100px;"> 이(가)
			<input type="text" v-model="cal2_2" @keydown.enter="cal('type2')" style="width:100px;">% 인 전체값은
			<strong v-if="cal2_3">{{this.cal2_3}}</strong>
		</div>
		
		<div style="margin-top: 20px;">
			<p>전체값 * % / 100 = 일부값</p>
			<input type="text" v-model="cal3_1" @keydown.enter="cal('type3')" style="width:100px;"> 의
			<input type="text" v-model="cal3_2" @keydown.enter="cal('type3')" style="width:100px;">% 는
			<strong v-if="cal3_3">{{this.cal3_3}}</strong>
		</div>

	</main>
</template>

<script>
export default {
	data() {
		return {
			cal1_1: null,
			cal1_2: null,
			cal1_3: null,
			cal2_1: null,
			cal2_2: null,
			cal2_3: null,
			cal3_1: null,
			cal3_2: null,
			cal3_3: null,
		}
	},
	methods: {
		numberCheck(val) {
			if((48 >= event.keyCode && event.keyCode <= 57) && (96 >= event.keyCode && event.keyCode <= 105)) {
				return val;
			} else {
				return val.replace(/[^0-9]/g,'');
			}
		},
		numberWithCommas(val) {
			var parts = val.toString().split("."); 
			return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
		},
		cal(type) {
			if(type == 'type1') {
				let cal = this.cal1_2 / this.cal1_1 * 100;
				this.cal1_3 = this.numberWithCommas(cal);
			} else if(type == 'type2') {
				let cal = this.cal2_1 / (this.cal2_2 / 100);
				this.cal2_3 = this.numberWithCommas(cal);
			} else if(type == 'type3') {
				let cal = this.cal3_1 * this.cal3_2 / 100;
				this.cal3_3 = this.numberWithCommas(cal);
			}
		}
	},
	destroyed: function() {
	}
}
</script>

<style lang="scss">
	main {
		padding: 90px 20px 20px;
		font-size: 18px;
	}
</style>