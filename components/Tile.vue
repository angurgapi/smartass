<template>
    <div class="image-tile" @click="$emit('click')">
        <template v-if="revealed">
            <img class="image-tile__picture" :src="`/art/${img}.webp`" />
        </template>
        <template v-else>
            <div class="image-tile__cover">
                <img src="/cover.png"/>
            </div>
        </template>

    </div>
</template>

<script>
export default{
    props: {
        img: {
            type: String,
            required: true
        },
        revealed: {
            type: Boolean,
            default: false
        }
    },

}
</script>

<style lang="scss">
.image-tile {
    display: flex;
    height: 100%;
    width: 100%;
    aspect-ratio: 4 / 3;
    box-shadow: 0 1px 2px rgba(0,0,0,.25);

    &__picture {
        height: 100%;
        width: 100%;
        object-fit: cover;
        
    }

    &__cover {
        background-color: #75959c;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
            opacity: .6;
            height: 100px;
            width: 100px;
        }
    }

}
</style>