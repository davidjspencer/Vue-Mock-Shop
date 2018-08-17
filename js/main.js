Vue.component('product', {
	props: {
		premium: {
			type: Boolean,
			required: true
		}
	},
	template: `
		<div class="product">
			<div class="product-image">
				<img v-bind:src="image" alt="">
			</div>
			<div class="product-info">
				<h1>{{ title }}</h1>

				<p>Shipping: {{ shipping }}</p>

				<ul>
					<li v-for="detail in details">{{ detail }}</li>
				</ul>
				<p v-if="inStock">In Stock</p>
				<p v-else>Out of Stock</p>
				<p>Colour Options: <span>(hover for availabitily)</span></p>

				<div v-for="(variant, index) in variants"
						 :key="variant.variantId"
						 class="color-box"
						 :style="{ backgroundColor: variant.variantColor }"
						 @mouseover="updateProduct(index)">
				</div>
				<button v-on:click="addToCart"
								:disabled="!inStock"
								:class="{ disabledButton: !inStock }">Add to Cart</button>
				<button v-on:click="removeFromCart">Remove from Cart</button>
				<div class="cart">
					<p>Cart ({{ cart }})</p>
				</div>
			</div>

		</div>
	`,
	data() {
		return {
			product: 'Socks',
			brand: 'Vue',
			selectedVariant: 0,
			inventory: 8,
			details: [
				"80% cotton",
				"x",
				"y"],
			variants: [
				{
					variantId: 2234,
					variantColor: "green",
					variantImage: './assets/vmSocks-green-onWhite.jpg',
					variantQuantity: 10
				},
				{
					variantId: 2235,
					variantColor: "blue",
					variantImage: './assets/blueSocks.jpeg',
					variantQuantity: 0
				}
			],
			cart: 0
		}
	},
		methods: {
			addToCart() {
				this.cart += 1
			},
			removeFromCart() {
				if (this.cart > 0) {
					this.cart -= 1
				}
			},
			updateProduct(index) {
				this.selectedVariant = index
			}
		},
		computed: {
			title() {
				return this.brand + ' ' + this.product
			},
			image() {
				var body = document.getElementsByTagName("BODY")[0]
				var cssVar = "url('." + this.variants[this.selectedVariant].variantImage + "')"
				body.style.setProperty('--background-img', cssVar)
				console.log(cssVar)
				return this.variants[this.selectedVariant].variantImage
			},
			inStock() {
				return this.variants[this.selectedVariant].variantQuantity
			},
			shipping() {
				if (this.premium) {
					return "Free"
				}
				return 2.99
			}
		}
})

var app = new Vue({
	el: '#app',
	data: {
		premium: true
	}
})