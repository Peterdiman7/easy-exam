<template>
    <header class="header">
        <div class="container">
            <h1 class="logo">EasyExam</h1>

            <nav :class="['nav', { open: menuOpen }]">
                <a href="#">Home</a>
                <button type="button" @click="router.push({ name: 'systems' })">Системи</button>
                <a href="#">About</a>
                <a href="#">Login</a>
            </nav>

            <button class="menu-btn" @click="toggleMenu" aria-label="Toggle menu">
                <span :class="{ open: menuOpen }"></span>
                <span :class="{ open: menuOpen }"></span>
                <span :class="{ open: menuOpen }"></span>
            </button>
        </div>
    </header>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const menuOpen = ref(false)

const toggleMenu = () => {
    menuOpen.value = !menuOpen.value
}
</script>

<style scoped>
.header {
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 1000;
    background: rgba(20, 21, 25, 0.8);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    color: var(--theme-white, #fff);
}

.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 2rem;
}

.logo {
    font-size: 1.6rem;
    font-weight: 700;
    background: linear-gradient(90deg, #3b82f6, #60a5fa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -0.5px;
}

.nav {
    display: flex;
    gap: 2rem;
    transition: all 0.3s ease;
}

.nav a {
    text-decoration: none;
    color: #e5e7eb;
    font-weight: 500;
    font-size: 1rem;
    position: relative;
}

.nav a::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0%;
    height: 2px;
    background: #3b82f6;
    transition: width 0.3s ease;
}

.nav a:hover::after {
    width: 100%;
}

.nav a:hover {
    color: #93c5fd;
}

/* Mobile Menu Button */
.menu-btn {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 28px;
    height: 24px;
    background: none;
    border: none;
    cursor: pointer;
    gap: 5px;
    z-index: 1100;
}

.menu-btn span {
    width: 100%;
    height: 3px;
    background: #fff;
    border-radius: 2px;
    transition: all 0.3s ease;
}

.menu-btn span.open:nth-child(1) {
    transform: rotate(45deg) translateY(8px);
}

.menu-btn span.open:nth-child(2) {
    opacity: 0;
}

.menu-btn span.open:nth-child(3) {
    transform: rotate(-45deg) translateY(-8px);
}

@media (max-width: 900px) {
    .nav {
        position: fixed;
        top: 70px;
        right: 0;
        height: calc(100vh - 70px);
        width: 65%;
        background: rgba(15, 15, 20, 0.97);
        backdrop-filter: blur(12px);
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2rem;
        transform: translateX(100%);
        opacity: 0;
        pointer-events: none;
    }

    .nav.open {
        transform: translateX(0);
        opacity: 1;
        pointer-events: all;
    }

    .menu-btn {
        display: flex;
    }
}
</style>
