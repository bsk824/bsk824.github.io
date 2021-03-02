<template>
	<main>
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

		<hr>

		<div>
			모바일 디자인 가로 <input type="text" v-model="moCal" @keydown.enter="cal('typeMo')" style="width:100px;">px<br>
			320화면 {{this.moCal1}}%<br>
			360화면 {{this.moCal2}}%<br>
			375화면 {{this.moCal3}}%<br>
			412화면 {{this.moCal4}}%<br>
			414화면 {{this.moCal5}}%<br>
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
			moCal: null,
			moCal1: null,
			moCal2: null,
			moCal3: null,
			moCal4: null,
			moCal5: null,
			screen: window.screen.width,
			ratio: window.devicePixelRatio,
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
			} else if(type == 'typeMo') {
				let cal = this.moCal / 62.5;
				this.moCal1 = 320 / cal;
				this.moCal2 = 360 / cal;
				this.moCal3 = 375 / cal;
				this.moCal4 = 412 / cal;
				this.moCal5 = 414 / cal;
			}
		}
	},
	destroyed: function() {
	}
}
</script>