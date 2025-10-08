<template>
    <section class="hero">
        <div class="hero-content">
            <h1 class="headline">
                Master Medicine. <br />
                <span class="highlight">One System at a Time.</span>
            </h1>

            <p class="subtext">
                Learn, quiz, and retain knowledge faster with EasyExam — your smart companion
                for mastering anatomy and physiology through adaptive testing.
            </p>

            <div class="actions">
                <button class="cta" @click="explore">Explore Systems</button>
                <button class="secondary">Learn More</button>
            </div>
        </div>

        <div class="hero-image">
            <div class="image-wrapper">
                <img src="https://cdn.prod.website-files.com/66bd394eedeb9d6ee29898c6/682f5450a046c241920c1e6f_Three%20doctors%20standing%20side%20by%20side%2C%20crossing%20their%20arms.jpg"
                    alt="Learning illustration" />
            </div>
        </div>

        <div class="background-glow"></div>
    </section>
</template>

<script setup lang="ts">
function explore() {
    alert("This will navigate to your Systems page soon!");
}
</script>

<style scoped>
.hero {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: calc(100vh - 80px);
    padding: 0 5vw;
    color: var(--theme-white);
    overflow: hidden;
}

.hero-content {
    flex: 1;
    z-index: 2;
    animation: fadeInUp 0.8s ease-out forwards;
}

.headline {
    font-size: 3.2rem;
    font-weight: 700;
    line-height: 1.15;
    margin-bottom: 1.5rem;
    letter-spacing: -0.5px;
}

.highlight {
    color: #3b82f6;
    background: linear-gradient(90deg, #60a5fa, #3b82f6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.subtext {
    max-width: 520px;
    color: #d1d5db;
    font-size: 1.15rem;
    line-height: 1.7;
    margin-bottom: 2.5rem;
}

.actions {
    display: flex;
    gap: 1rem;
}

.cta {
    background: linear-gradient(135deg, #2563eb, #1e40af);
    border: none;
    color: #fff;
    padding: 0.9rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 8px;
    transition: all 0.25s ease;
    box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
}

.cta:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(37, 99, 235, 0.4);
}

.secondary {
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.25);
    color: #f9fafb;
    padding: 0.9rem 2rem;
    border-radius: 8px;
    transition: all 0.25s ease;
}

.secondary:hover {
    border-color: #60a5fa;
    color: #93c5fd;
}

.hero-image {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
}

.image-wrapper {
    position: relative;
    border-radius: 18px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    transform: perspective(1000px) rotateY(-8deg);
    transition: transform 0.6s ease;
}

.image-wrapper:hover {
    transform: perspective(1000px) rotateY(0deg);
}

.image-wrapper img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 18px;
}

.background-glow {
    position: absolute;
    top: 0;
    left: 50%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle at center,
            rgba(37, 99, 235, 0.25),
            transparent 70%);
    transform: translateX(-50%) translateY(-20%);
    filter: blur(100px);
    z-index: 0;
}

@media (max-width: 900px) {
    .hero {
        flex-direction: column;
        text-align: center;
        padding: 3rem 2rem;
    }

    .hero-content {
        order: 2;
    }

    .hero-image {
        order: 1;
        margin-bottom: 3rem;
    }

    .headline {
        font-size: 2.2rem;
    }

    .subtext {
        margin: 0 auto 2rem;
    }

    .actions {
        justify-content: center;
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
