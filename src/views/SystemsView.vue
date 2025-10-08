<template>
    <section class="systems-page">
        <div class="intro">
            <h1>Select a System to Study</h1>
            <p>Explore the human body one system at a time. Choose a topic below to begin.</p>
        </div>

        <div class="systems-grid">
            <div v-for="system in systems" :key="system.id" class="system-card" @click="goToSystem(system)">
                <div class="image-wrapper">
                    <img :src="system.imageUrl" :alt="system.name" />
                </div>
                <h2>{{ system.name }}</h2>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

// For now, static demo data. Later, you’ll fetch this from your backend (GET /api/systems)
const systems = ref([
    {
        id: 1,
        name: "Urinary System",
        imageUrl:
            "https://images.unsplash.com/photo-1579154203451-0d04e4d63a29?auto=format&fit=crop&w=700&q=80",
    },
    {
        id: 2,
        name: "Digestive System",
        imageUrl:
            "https://images.unsplash.com/photo-1629904853716-f0bc54eea481?auto=format&fit=crop&w=700&q=80",
    },
    {
        id: 3,
        name: "Nervous System",
        imageUrl:
            "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=700&q=80",
    },
    {
        id: 4,
        name: "Respiratory System",
        imageUrl:
            "https://images.unsplash.com/photo-1624311217991-dccf3e28c9d7?auto=format&fit=crop&w=700&q=80",
    },
])

function goToSystem(system: any) {
    router.push({ name: "system-details", params: { id: system.id } })
}
</script>

<style scoped>
.systems-page {
    max-width: 1200px;
    margin: 4rem auto;
    padding: 0 2rem;
    color: #f9fafb;
}

.intro {
    text-align: center;
    margin-bottom: 3rem;
}

.intro h1 {
    font-size: 2.5rem;
    margin-bottom: 0.75rem;
    background: linear-gradient(90deg, #60a5fa, #3b82f6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.intro p {
    color: #9ca3af;
    font-size: 1.1rem;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
}

.systems-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 2rem;
}

.system-card {
    background: #1b1d22;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.system-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
}

.image-wrapper {
    height: 180px;
    overflow: hidden;
}

.image-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
}

.system-card:hover img {
    transform: scale(1.08);
}

.system-card h2 {
    text-align: center;
    padding: 1rem;
    font-size: 1.2rem;
    font-weight: 600;
    color: #e5e7eb;
}

@media (max-width: 768px) {
    .intro h1 {
        font-size: 2rem;
    }

    .systems-page {
        margin: 2rem auto;
    }
}
</style>
