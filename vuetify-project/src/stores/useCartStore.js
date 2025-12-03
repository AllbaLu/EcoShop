import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {

    const open = ref(false)

    const items = ref([])

    function addItem(product) {
        const existing = items.value.find(i => i.id === product.id)

        if (existing) {
            existing.quantity++
        } else {
            items.value.push({ ...product, quantity: 1 })
        }

        open.value = true //abre el carrito automáticamente
    }

    function removeItem(index) {
        items.value.splice(index, 1)
    }

    function increase(index) {
        items.value[index].quantity++
    }

    function decrease(index) {
        if (items.value[index].quantity > 1) {
            items.value[index].quantity--
        }
    }

    const total = computed(() =>
        items.value.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        )
    )

    // Total de productos para el badge
    const totalQuantity = computed(() =>
        items.value.reduce(
            (sum, item) => sum + item.quantity,
            0
        )
    )


    return { open, items, addItem, removeItem, increase, decrease, total, totalQuantity}
})