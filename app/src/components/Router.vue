<script>
</script>

<template>
	<router-view v-slot="{ Component, route }">
        <transition :name="route.meta.transition || 'slide-right'">
            <component :is="Component" :key="route.path"></component>
        </transition>
    </router-view>
</template>

<style scoped lang="sass">
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active
    transition: transform 400ms ease-out, opacity 300ms ease-out
.slide-right-enter-from,
.slide-left-leave-to
    opacity: 0
    transform: translate(-80%, -50%)
.slide-left-enter-from,
.slide-right-leave-to
    opacity: 0
    transform: translate(-20%, -50%)
</style>