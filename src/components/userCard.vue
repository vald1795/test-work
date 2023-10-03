<template>
    <div class="card col col-lg-3 mt-3">
        <div class="card-body mr-2">
            <h3 class="text-center">Info:</h3>
            <h5 class="card-title mb-3"><b>Name:</b> {{ user.name }}</h5>
            <h6 class="card-subtitle mb-3"><b>Username:</b> {{ user.username }}</h6>
            <p class="card-text"><b>Email:</b> {{ user.email }}</p>
            <p class="card-text"><b>Phone:</b> {{ user.phone }}</p>
            <p class="card-text"><b>Website:</b> {{ user.website }}</p>
            <p class="card-text"><b>Company name:</b> {{ user.company.name }}</p>
            <p class="card-text"><b>Company catchphrase:</b> {{ user.company.catchPhrase }}</p>
            <p class="card-text"><b>Company bs:</b> {{ user.company.bs }}</p>
            <p class="card-text"><b>Street:</b> {{ user.address.street }}</p>
            <p class="card-text"><b>Suite:</b> {{ user.address.suite }}</p>
            <p class="card-text"><b>City:</b> {{ user.address.city }}</p>
            <p class="card-text"><b>Zipcode:</b> {{ user.address.zipcode }}</p>
            <p class="card-text"><b>Geo lat:</b> {{ user.address.geo.lat }}</p>
            <p class="card-text"><b>Geo lng:</b> {{ user.address.geo.lng }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "userCard",
    props: {
        user: Object,
    },

}
</script>

<style scoped>
.card {
    height: fit-content;
    background-color: #79a871;
    border: 1px solid #79a871;
    color: #fff;
}
</style>