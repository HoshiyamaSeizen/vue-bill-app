<script>
</script>

<template>
    <TransitionGroup tag="ul" name="list" class="list">
        <slot></slot>
    </TransitionGroup>
</template>

<style lang="sass">
@import '../styles/_vars.sass'
.list
    display: block
    height: 75%
    list-style: none
    padding: 0
    overflow-x: hidden
    overflow-y: auto
.list-move,
.list-enter-active,
.list-leave-active
    transition: all 300ms ease-out
.list-enter-from,
.list-leave-to
    opacity: 0
    scale: 1 0
    transform: translateX(30px)
.list-item, li
    padding: 15px 25px
    margin: 10px 10px 0
    border: 2px solid lighten($color-main, 50%)
    border-radius: 8px
    font-size: 1.5em
    font-weight: 600
.list-btn
    cursor: pointer
    margin-bottom: 5px
    @include no-select
    &:hover
        background-color: darken($color-secondary, 2%)
    &:active
        scale: 0.99
    i
        margin-right: 15px
i.bi-check-lg
    font-size: 2rem
    &:hover
        color: darkgreen !important
i.bi-trash-fill:hover
    color: darkred !important
.i-pointer
    cursor: pointer
</style>