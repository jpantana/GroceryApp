<template>
    <div class="divE">
        <ul>
            <li v-for="num in list">{{ num }}</li>
        </ul>
        <h1>This is a list</h1>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                list: [1, 2, 3, 4, 5]
            }
        }
    }
</script>

<style scoped>
    
</style>