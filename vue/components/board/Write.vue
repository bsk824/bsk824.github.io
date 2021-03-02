<template>
	<form action="">
		<input type="text" v-model="subject" ref="subject">
		<textarea name="" id="" cols="30" rows="10" style="width:100%;"></textarea>
		<button type="button" @click="fnAddProc">등록</button>
	</form>
</template>

<script>
export default {
	data() {
		return {
			board_code : 'news',
			subject : '',
			cont: '',
			id: 'admin',
			form:'',
		}
	},
	methods : {
		fnAddProc() {
			this.form = {
				board_code: this.board_code,
				subject: this.subject,
				cont: this.cont,
				id: this.id,
			}
			this.$axios.post('http://localhost:3000/api/board/', this.form)
			.then(res=>{
				if(res.data.success) {
					alert('ok');
				} else {
					alert('no');
				}
			})
			.catch(err=>{
				console.log(err);
			})
		}
	}
}
</script>

<style>

</style>