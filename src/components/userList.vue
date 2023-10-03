<template>
    <div class="list col-lg-6 d-flex mt-3">
        <h3 class="align-self-center" v-if="!filtered.length & status === 'favorites'">There is no favorite todos</h3>
        <div class="d-flex flex-column p-2 item" v-for="todo in filtered" :key="todo.id">
            <p><b>UserID:</b> {{ todo.userId }}</p>
            <p><b>ID:</b> {{ todo.id }}</p>
            <p><b>Title:</b> {{ todo.title }}</p>
            <p><b>Completed:</b> {{ todo.completed }}</p>
            <div class="d-flex flex-column">
                <b-button class="btn btn-light m-1" @click="addToFavorite(todo.id)"
                    v-if="favorites.indexOf(todo.id) === -1">Add</b-button>
                <b-button class="btn btn-dark m-1" @click="addToFavorite(todo.id)" v-else>Remove</b-button>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name: "userList",
    props: {
        filtered: Array,
        favorites: Array,
        status: String
    },
    methods: {
        addToFavorite(todoId) {
            const favoriteIndex = this.favorites.indexOf(todoId);
            if (favoriteIndex === -1) {
                this.favorites.push(todoId);
            } else {
                (this.favorites).splice(favoriteIndex, 1);
            }
            localStorage.setItem('favorites', JSON.stringify(this.favorites));
        },
    },
}
</script>
<style scoped>
.list {
    flex-wrap: wrap;
    overflow: auto;
    justify-content: center;
}

.item {
    flex: auto;
    max-width: 180px;
    margin: 0.5rem;
    justify-content: space-between;
    background: #79a871;
    border-radius: 5px;
    color: #fff;
    max-height: 350px;
}
</style>
