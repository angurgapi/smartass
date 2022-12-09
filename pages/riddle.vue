<template>
    <div class="page">
        <div class="grid">
            <Tile v-for="(img, index) in getImagesArray" :key="index" :img="img" @click="revealImage(index)" :revealed="(lastRevealedTile == index || nailedImages.includes(index))" />
            </div>
        </div>
    </div>
</template>

<script>
import Tile from '@/components/Tile'

export default {
    components: {Tile},
    layout: 'default',
    name: 'RiddlePage',

    data: () => ({
        images: ['Almond_blossoms', 'Bowl_with_Daisies', 'Evening_landscape', 'Field_with_green_wheat', 'Irises', 'Irises_II', 'Oleanders',
        'Olive_grove', 'Olive_trees', 'Orchard_with_cypresses', 'Ravine', 'Resting_at_noon', 'Roses', 'Starry_night', 'The_Langlois_bridge_at_Arles',
        'Wheat_Field_with_Cypresses', 'Wild_roses'
        ],
        lastRevealedTile: null,
        nailedImages: []
    }),

    computed: {
        getImagesArray() {
            return [...this.images, ...this.images].sort((a, b) => 0.5 - Math.random())
        }
    },

    methods: {
        revealImage(img) {
            console.log(this.getImagesArray[img])
            if(this.getImagesArray[img] === this.getImagesArray[this.lastRevealedTile]) {
                this.nailedImages.push(img, this.lastRevealedTile)
                this.lastRevealedTile = null
            }
            this.lastRevealedTile = img
        }
    },

    beforeCreate() {
        console.log('beforecreate', this)
    },
    created() {
        console.log('created', this)
    }
}
</script>

<style lang="scss">
.page {
    display: flex;
    align-items: center;
    justify-content: center;
}
.grid {
    display: grid;
    grid-gap: 18px;
    // height: 95vh;
    width: 95vw;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 1px 2px rgba(0,0,0,.25);
    padding: 10px;
    justify-content: center;
    grid-template-columns: repeat( auto-fit, minmax(150px, 200px) );
    // grid-template-rows:repeat( auto-fit, minmax(100px, 150px) );
}

</style>