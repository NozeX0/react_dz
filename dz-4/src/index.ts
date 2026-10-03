type LoadingState = {
    status: "loading";
}

type SuccessState<T> = {
    status: "success";
    data: T[];
}

type ErrorState = {
    status: "error";
    message: string;
}

type RequestState<T> = LoadingState | SuccessState<T> | ErrorState;

function getRequestMessage<T>(state: RequestState<T>): string {
    if (state.status === "loading") {
        return "Запит завантажується";
    }

    if (state.status === "success") {
        return `Успіх. Кількість даних: ${state.data.length}`;
    }

    return `Помилка: ${state.message}`;
}

const loadingState: RequestState<string> = {
    status: "loading"
};

const successState: RequestState<string> = {
    status: "success",
    data: ["one", "two"]
};

const errorState: RequestState<string> = {
    status: "error",
    message: "Сервер не відповідає"
};

const requestResults = [
    getRequestMessage(loadingState),
    getRequestMessage(successState),
    getRequestMessage(errorState)
];

requestResults.forEach((result) => console.log(result));


type UserRole = "admin" | "user" | "moderator";

interface User {
    readonly id: number;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
}

function getAvatar(user: User): string {
    if (user.avatar) {
        return user.avatar;
    }

    return "default.png";
}

const user: User = {
    id: 1,
    name: "Alex",
    email: "alex@gmail.com",
    role: "user"
};

const avatarResult = getAvatar(user);

console.log(avatarResult);


type Currency = "USD" | "EUR" | "UAH";

function formatMoney(
    amount: number,
    currency: Currency,
    showSymbol: boolean = true
): string {
    const symbols = {
        USD: "$",
        EUR: "€",
        UAH: "₴"
    };

    if (showSymbol) {
        return `${symbols[currency]}${amount.toFixed(2)}`;
    }

    return `${amount.toFixed(2)} ${currency}`;
}

const moneyResult1 = formatMoney(1500, "UAH");
const moneyResult2 = formatMoney(1500, "USD", false);

console.log(moneyResult1);
console.log(moneyResult2);


interface Product {
    id: number;
    name: string;
    price: number;
}

function filterProducts(
    products: Product[],
    maxPrice: number
): Product[] {
    return products.filter((product) => product.price <= maxPrice);
}

const products: Product[] = [
    {
        id: 1,
        name: "Laptop",
        price: 30000
    },
    {
        id: 2,
        name: "Mouse",
        price: 1000
    },
    {
        id: 3,
        name: "Keyboard",
        price: 2500
    }
];

const filteredProducts = filterProducts(products, 3000);

console.log(filteredProducts);


interface ServerResponse<T> {
    status: number;
    date: Date;
    data: T;
}

function getUserResponse(): ServerResponse<User> {
    return {
        status: 200,
        date: new Date(),
        data: user
    };
}

function getProductsResponse(): ServerResponse<Product[]> {
    return {
        status: 200,
        date: new Date(),
        data: products
    };
}

const userResponse = getUserResponse();
const productsResponse = getProductsResponse();

console.log(userResponse);
console.log(productsResponse);


class AppError extends Error {
    readonly statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }

    getFormattedMessage(): string {
        return `Помилка ${this.statusCode}: ${this.message}`;
    }
}

const error = new AppError(
    "Користувача не знайдено",
    404
);

const errorResult = error.getFormattedMessage();

console.log(errorResult);


class ApiService {
    private serverUrl: string;
    private cache: Map<string, unknown>;

    constructor(serverUrl: string) {
        this.serverUrl = serverUrl;
        this.cache = new Map();
    }

    get<T>(url: string, data: T): T {
        if (this.cache.has(url)) {
            return this.cache.get(url) as T;
        }

        this.cache.set(url, data);

        return data;
    }
}

const api = new ApiService("https://example.com");

const firstRequest = api.get("user/1", user);
const secondRequest = api.get("products", products);

console.log(firstRequest);
console.log(secondRequest);


interface CartItem {
    product: Product;
    quantity: number;
}

class Cart {
    private items: CartItem[] = [];

    addProduct(product: Product): void {
        const item = this.items.find(
            (item) => item.product.id === product.id
        );

        if (item) {
            item.quantity++;
        } else {
            this.items.push({
                product: product,
                quantity: 1
            });
        }
    }

    removeProduct(productId: number): void {
        this.items = this.items.filter(
            (item) => item.product.id !== productId
        );
    }

    getTotal(): number {
        return this.items.reduce(
            (total, item) => {
                return total + item.product.price * item.quantity;
            },
            0
        );
    }

    getItems(): CartItem[] {
        return this.items.map((item) => {
            return {
                product: { ...item.product },
                quantity: item.quantity
            };
        });
    }
}

const cart = new Cart();

cart.addProduct(products[1]);
cart.addProduct(products[1]);
cart.addProduct(products[2]);

const cartResult = cart.getItems();
const cartTotal = cart.getTotal();

console.log(cartResult);
console.log(`Total: ${cartTotal}`);

cart.removeProduct(2);

const cartAfterRemove = cart.getItems();
const totalAfterRemove = cart.getTotal();

console.log(cartAfterRemove);
console.log(`Total: ${totalAfterRemove}`);


export const results = {
    requestResults,
    avatarResult,
    moneyResult1,
    moneyResult2,
    filteredProducts,
    userResponse,
    productsResponse,
    errorResult,
    firstRequest,
    secondRequest,
    cartResult,
    cartTotal,
    cartAfterRemove,
    totalAfterRemove
};