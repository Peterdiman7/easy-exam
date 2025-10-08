<template>
    <footer class="footer">
        <div class="footer-container">
            <div class="footer-brand">
                <h2 class="logo">EasyExam</h2>
                <p class="tagline">
                    Learn smarter. Test faster. Master every system with ease.
                </p>
            </div>

            <div class="footer-links">
                <div class="link-group">
                    <h4>Explore</h4>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Systems</a></li>
                        <li><a href="#">About</a></li>
                    </ul>
                </div>

                <div class="link-group">
                    <h4>Resources</h4>
                    <ul>
                        <li><a href="#">Study Tips</a></li>
                        <li><a href="#">Quizzes</a></li>
                        <li><a href="#">FAQ</a></li>
                    </ul>
                </div>

                <div class="link-group">
                    <h4>Support</h4>
                    <ul>
                        <li><a href="#">Contact</a></li>
                        <li><a href="#">Privacy</a></li>
                        <li><a href="#">Terms</a></li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="footer-bottom">
            <p>© 2025 EasyExam. All rights reserved.</p>
        </div>
    </footer>
</template>

<script setup lang="ts">
// no logic needed for now
</script>

<style scoped>
.footer {
    background: #0e1013;
    color: #f9fafb;
    padding-top: 3rem;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    font-family: 'Inter', system-ui, sans-serif;
}

.footer-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem 3rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 3rem;
}

.footer-brand {
    flex: 1 1 300px;
}

.logo {
    font-size: 1.8rem;
    font-weight: 700;
    background: linear-gradient(90deg, #3b82f6, #60a5fa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.tagline {
    margin-top: 0.5rem;
    color: #9ca3af;
    font-size: 1rem;
    line-height: 1.6;
    max-width: 350px;
}

.footer-links {
    display: flex;
    flex-wrap: wrap;
    gap: 3rem;
    flex: 2 1 500px;
}

.link-group h4 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #93c5fd;
}

.link-group ul {
    list-style: none;
    padding: 0;
}

.link-group li {
    margin-bottom: 0.5rem;
}

.link-group a {
    text-decoration: none;
    color: #d1d5db;
    font-size: 0.95rem;
    transition: color 0.3s ease;
}

.link-group a:hover {
    color: #60a5fa;
}

.footer-bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    text-align: center;
    padding: 1.5rem 2rem;
    font-size: 0.9rem;
    color: #9ca3af;
}

@media (max-width: 800px) {
    .footer-container {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .footer-links {
        justify-content: center;
    }

    .tagline {
        max-width: 100%;
    }
}
</style>
