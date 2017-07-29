<template>
	<div>
		<vheader></vheader>
		<router-view></router-view>
		<vfooter></vfooter>
	</div>
	
</template>

<script type="text/javascript">
	import vheader from './Header'
	import vfooter from './footer'
	export default{
		components: {
			vheader,
			vfooter
		}
	}
</script>

<style type="text/css">
	
</style>