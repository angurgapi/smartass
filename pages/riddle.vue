<template>
    <div class="page">
        <div class="grid">
            <div class="imgtile" v-for="(img, index) in images" :key="index" :style="`background-image: url('/art/${img}.webp')`">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        images: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22
        ]
    })
}
</script>

<style lang="scss">
.grid {
    display: grid;
    grid-gap: 18px;
    grid-template-columns: repeat(4, 1fr);
}
.imgtile {
    height: 200px;
    width: 300px;
    background-size: cover;
}
</style>