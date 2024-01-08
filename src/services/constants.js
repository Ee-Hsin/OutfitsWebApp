export const TESTING = false
export const API_URL = TESTING
  ? "http://localhost:8080"
  : "https://fitss.up.railway.app"

export const COLORS = [
  { value: "black", label: "black" },
  { value: "white", label: "white" },
  { value: "grey", label: "grey" },
  { value: "beige", label: "beige" },
  { value: "red", label: "red" },
  { value: "blue", label: "blue" },
  { value: "yellow", label: "yellow" },
  { value: "brown", label: "brown" },
  { value: "green", label: "green" },
  { value: "orange", label: "orange" },
  { value: "pink", label: "pink" },
  { value: "floral", label: "floral" },
  { value: "stripes", label: "stripes" },
]

export const CLOTHING_CATEGORIES = [
  { value: "Tops", label: "top" },
  { value: "Bottoms", label: "bottom" },
  { value: "Footwear", label: "shoes" },
  { value: "Dresses", label: "dresses" },
  { value: "Outerwear", label: "outerwear" },
  { value: "Accessories", label: "accessories" },
  { value: "Activewear", label: "activewear" },
]

export const CLOTHING_SUBCATEGORIES = {
  Tops: [
    "t-shirt",
    "blouse",
    "shirt",
    "tank top",
    "sweatshirt",
    "hoodie",
    "sweater",
  ],
  Bottoms: ["jeans", "trousers", "leggings", "shorts", "skirt", "sweatpants"],
  Footwear: ["sneakers", "boots", "sandals", "flats", "heels", "slippers"],
  Dresses: ["casual", "formal", "maxi", "midi", "mini", "evening gown"],
  Outerwear: ["coat", "jacket", "blazer", "vest", "parka", "poncho"],
  Accessories: ["scarf", "hat", "glove", "belt", "sunglasses", "tie", "jewelry"],
  Activewear: [
    "sports bra",
    "athletic tank",
    "workout legging",
    "athletic short",
    "track suit",
    "performance top",
  ],
}
