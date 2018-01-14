<template><div>

	<h1> This whole project in in maintenance / construction</h1>
<div id="content">
<div class="one"> 1 </div>
<div class="two"> 2 </div>
<div class="three"> 3 </div>
<div class="four"> 4 </div>
<div class="five"> 5 </div>
<div class="six"> 6 </div>

</div>
</div>
</template>


<style>

#content {
	background-color: #fff;
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	grid-template-rows: repeat(5, minmax(150px, auto));
	grid-gap: 10px;
	width: 100%;
	max-width: 960px;
	margin: 0 auto;
}

#content div{
	background: #3bbced;
	padding: 30px;
}

#content div:nth-child(even){
	background: #777;
}

.one {
	grid-column: 1 / 3;
}

.two {
	grid-column: 3 / 7;
}

.three {
	grid-column: 1 / 4;
	grid-row: 2 / 4;
}

.four {
	grid-column: 4/ 7;
	grid-row: 2/4;
}

.five {
	grid-column: 3 / 7;
	/*grid-row: */
}

.six {
	grid-row: 4;
	grid-column: 1 / 3;
}

</style>


<script>
// import { mapGetters, mapActions } from 'vuex';

export default {};
</script>
