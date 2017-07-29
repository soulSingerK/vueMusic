<template>
	
	<div class="hd">
		<!-- -->
		<ul class="hd-sets">
			<li class="hd-set hd-left">
				<a href="javascript:void 0" @click>
					<svg class="icon" aria-hidden="true">
					  <use xlink:href="#icon-sanheng1"></use>
					</svg> 
				</a>
			</li>
			<li class="hd-set hd-center">
				<router-link :to="item.href" v-for="(item,index) in iconSrc" >
					<svg class="icon" aria-hidden="true" :class="{selected: index == current}" @click="current=index">
					  <use :xlink:href="item.icon"></use>
					</svg>
				</router-link>
				<!-- <router-link to="/localMusic" :class="{selected: current}">
					<svg class="icon" aria-hidden="true"  @click="selected($event)">
					  <use xlink:href="#icon-music"></use>
					</svg> 
				</router-link>
				
				<router-link to="/live">
					<svg class="icon" aria-hidden="true">
					  <use xlink:href="#icon-wangyiyunyinlezizhi"></use>
					</svg> 
				</router-link>
				<router-link to="/my">
					<svg class="icon" aria-hidden="true">
					  <use xlink:href="#icon-shuangren"></use>
					</svg> 
				</router-link> -->
			</li>
			<li class="hd-set hd-right">
				<a href="javascript:void 0">
					<svg class="icon" aria-hidden="true">
					  <use xlink:href="#icon-sousuo"></use>
					</svg> 
				</a>
			</li>
		</ul>
	</div>
	
</template>

<script type="text/javascript">
	export default{
		name: 'header',
		data: function(){
			return {
				current: 0,
				iconSrc: [
				{
					icon: '#icon-music',
					href:'/localMusic'
				},{
					icon: '#icon-wangyiyunyinlezizhi',
					href: '/live'
				},{
					icon: '#icon-shuangren',
					href: '/my'
				}
				]
			}

		},
		methods: {
			selected: function(e){
				console.log(e)
			}
		}

	}
</script>

<style type="text/css">
	.hd{
		height: 1.41rem;
		background-color: #d33a31;
		
	}
	.hd-sets{
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-between;
	}
	.hd-set{
		float: left;
	}
	.hd-set a{
		line-height: 1.41rem;

	}
	.hd-left a{
		font-size: 0.6rem;
		color: #fff;
		margin-left: 0.426667rem;
	}
	.hd-center a{
		font-size: 0.666667rem;
		color: #e7928c;
		margin: 0 0.4rem;
	}
	.hd-right a{
		font-size: 0.533333rem;
		color: #fff;
		margin-right: 0.4rem;
	}
	.selected{
		color: #fff!important;
	}
</style>