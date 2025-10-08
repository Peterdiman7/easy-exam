import type { App } from "vue"
import { createPinia } from "pinia"
import createRouter from "@/router"

export const registerPlugins = (app: App): Promise<void> => {
    return new Promise<void>((resolve) => {
        const pinia = createPinia()
        app.use(pinia)
        app.use(createRouter())
        resolve()
    })
}
