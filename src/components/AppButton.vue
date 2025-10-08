<template>
<component :is="as" ref="elementRef" v-ripple="variant === 'primary'" :type="as === 'button' ? 'button' : undefined" :disabled="disabled" :class="extractCssClass(classes, $style)">
    <div v-if="slots.prefix !== undefined" class="btn__prefix">
        <slot name="prefix"></slot>
    </div>
    <slot></slot>
    <div v-if="slots.suffix !== undefined" class="btn__suffix">
        <slot name="suffix"></slot>
    </div>
</component>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useTemplateRef } from "vue"

import { useElementSize } from "@vueuse/core"

import { extractCssClass } from "@/utils"

const props = withDefaults(defineProps<{
    variant: "primary" | "outlined" | "text"
    radius: 8 | 23
    size?: "small" | "medium" | "large"
    disabled?: boolean
    as?: "button" | "a"
}>(), {
    size: "medium",
    as: "button",
})
const slots = defineSlots<{
    prefix(props: any): any
    default(props: any): any
    suffix(props: any): any
}>()
const classes = computed(() => ([
    'button',
    `button--${props.variant}`,
]))
const height = computed(() => {
    switch (props.size) {
        case "small": return "34px"
        case "medium": return "38px"
        case "large": return "44px"
        default: return "auto"
    }
})
const elementRef = useTemplateRef<HTMLButtonElement | HTMLAnchorElement>("elementRef")
const { width, height: elementHeight } = useElementSize(elementRef, { width: 0, height: 0 }, { box: "border-box" })
const fontSize = computed(() => {
    switch (props.size) {
        case "small": return ".75rem"
        case "medium": return "1rem"
        case "large": return "1.125rem"
        default: return "initial"
    }
})
defineExpose({
    width,
    height: elementHeight,
    fontSize,
})
</script>

<style lang="scss" module>
@import "../assets/styles/variables.scss";
@import "../assets/styles/global.scss";
.button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: v-bind(height);
    border-radius: calc(v-bind(radius) * 1px);
    @extend .font-family--clash-medium;
    font-size: v-bind(fontSize);
    text-decoration: none;
    cursor: pointer;

    &--primary {
        color: var(--theme-black);
        background-color: var(--theme-green);
        svg {
            @extend .icon-fill--black;
        }
        &:hover {
            background-color: var(--theme-green-light);
        }
        &:disabled {
            background-color: var(--theme-gray-dark2);
            cursor: default;
        }
    }
    &--outlined {
        border: 1px solid var(--theme-gray-dark2);
        color: var(--theme-gray);
        background-color: transparent;
        box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset;
        svg {
            @extend .icon-fill--gray;
        }
        &:hover {
            border-color: var(--theme-white);
            color: var(--theme-white);
            svg {
                @extend .icon-fill--white;
            }
        }
        &:active {
            background-color: var(--theme-black);
            svg {
                @extend .icon-fill--black;
            }
        }
        &:disabled {
            opacity: 30%;
            cursor: default;
            &:hover {
                border-color: var(--theme-gray-dark2);
                color: var(--theme-gray);
                svg {
                    @extend .icon-fill--gray;
                }
            }
        }
    }
    &--text {
        color: var(--theme-gray);
        background-color: transparent;
        svg {
            @extend .icon-fill--gray;
        }
        &:hover {
            color: var(--theme-white);
            svg {
                @extend .icon-fill--white;
            }
        }
        &:active {
            color: var(--theme-gray);
            svg {
                @extend .icon-fill--gray;
            }
        }
        &:disabled {
            color: var(--theme-gray-dark2);
            svg {
                @extend .icon-fill--gray-dark2;
            }
            cursor: default;
        }
    }
}
</style>
