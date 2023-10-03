<template>
    <section class="d-flex col p-3 flex-column">
        <div v-if="!loading">
            <b-button class="back" variant="dark" @click="$router.push('/')">Back</b-button>
            <div class="d-flex flex-column flex-lg-row">

                <userCard v-if="user && Object.keys(user).length > 0" :user="user" />

                <div class="filters col col-lg-3 mt-3 d-flex flex-column">
                    <div class="form-group">
                        <label for="filter-select">Filter by status:</label>
                        <select class="form-control" id="filter-select" v-model="filterStatus">
                            <option value="all">All</option>
                            <option value="completed">Completed</option>
                            <option value="uncompleted">Uncompleted</option>
                            <option value="favorites">Favorites</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="user-select">Filter by user ID:</label>
                        <select class="form-control" id="user-select" v-model="filterUser">
                            <option value="all">All Users</option>
                            <option v-for="userId in uniqueUserIds" :key="userId" :value="userId">{{ userId }}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="title-search">Search by title:</label>
                        <input type="text" autocomplete="off" class="form-control" id="title-search" v-model="filterTitle">
                    </div>

                    <div class="create-todo mt-3">
                        <h2>Create todo:</h2>
                        <div class="form-group">
                            <label for="user-id-input">User ID:</label>
                            <input type="number" autocomplete="off" class="form-control" id="user-id-input"
                                v-model="newTodo.userId">
                        </div>
                        <div class="form-group">
                            <label for="title-input">Title:</label>
                            <input type="text" autocomplete="off" class="form-control" id="title-input"
                                v-model="newTodo.title">
                        </div>
                        <b-button class="btn btn-dark mt-2" @click="addTodo">Add</b-button>
                    </div>
                </div>

                <userList :filtered="filteredTodos" :favorites="favorites" :status="filterStatus" />
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
import userCard from '../components/userCard.vue'
import userList from '../components/userList.vue'


export default {
    components: {
        userCard,
        userList
    },
    data() {
        return {
            filterStatus: 'all',
            filterUser: 'all',
            filterTitle: '',
            favorites: [],
            user: {},
            todos: [],
            loading: true,
            newTodo: {
                userId: '',
                title: '',
                completed: false,
            },
        }
    },
    created() {

        const userPromise = axios.get('https://jsonplaceholder.typicode.com/users');
        const todoPromise = axios.get('https://jsonplaceholder.typicode.com/todos');

        Promise.all([userPromise, todoPromise])
            .then(([userResponse, todoResponse]) => {
                const user = userResponse.data.find(user => user.id == this.$route.params.userId);
                const todos = todoResponse.data;
                this.user = user;
                this.todos = todos;
                this.loading = false;
            })
            .catch(error => {
                console.error(error);
                this.user = {};
                this.todos = [];
            });
    },
    mounted() {
        if (localStorage.getItem('favorites')) {
            this.favorites = JSON.parse(localStorage.getItem('favorites'));
        }
    },
    computed: {
        uniqueUserIds() {
            const userIds = new Set(this.todos.map(todo => Number(todo.userId)));
            return [...userIds];
        },
        newId() {
            return this.todos.length + 1;
        },
        filteredTodos() {
            return this.todos.filter(todo => {
                const userFilter = this.filterUser === 'all' || todo.userId == this.filterUser;
                const titleFilter = this.filterTitle === '' || todo.title.toLowerCase().indexOf(this.filterTitle.toLowerCase()) !== -1;
                if (this.filterStatus === 'completed') {
                    return todo.completed && userFilter && titleFilter;
                } else if (this.filterStatus === 'uncompleted') {
                    return !todo.completed && userFilter && titleFilter;
                } else if (this.filterStatus === 'favorites') {
                    return this.favorites.includes(todo.id) && userFilter && titleFilter;
                } else {
                    return userFilter && titleFilter;
                }
            });
        }
    },
    methods: {
        async addTodo() {
            try {
                const response = await axios.post('https://jsonplaceholder.typicode.com/todos', { ...this.newTodo, id: this.newId });
                if (response.status === 201) {
                    this.todos.push({ ...this.newTodo, id: this.newId });
                    console.log("Data has been successfully posted to jsonplaceholder")

                    this.newTodo.userId = '';
                    this.newTodo.title = '';
                }
            } catch (error) {
                console.error(error);
            }
        },
    }

};
</script>

<style scoped>
.back {
    position: relative;
    margin-bottom: 10px;
    width: 80px;
}

.filters {
    align-items: center;
    height: fit-content;
    margin-left: 2rem;
}

.create-todo {
    text-align: center;
    width: 100%;
}

.form-group {
    width: 100%;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
</style>