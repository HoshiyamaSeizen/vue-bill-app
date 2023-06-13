<template>
	<router-view v-slot="{ Component, route }">
		<transition :name="route.meta.transition || 'slide-right'">
			<component :is="Component" :key="route.path"></component>
		</transition>
	</router-view>
</template>