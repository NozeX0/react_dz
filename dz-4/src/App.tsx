import { results } from "./index";

function App() {
    return (
        <div>
            <h1>Результаты заданий</h1>

            <section>
                <h2>Request</h2>
                {results.requestResults.map((item, index) => (
                    <p key={index}>{item}</p>
                ))}
            </section>

            <section>
                <h2>Avatar</h2>
                <p>{results.avatarResult}</p>
            </section>

            <section>
                <h2>Money</h2>
                <p>{results.moneyResult1}</p>
                <p>{results.moneyResult2}</p>
            </section>

            <section>
                <h2>Filtered products</h2>
                <pre>
                    {JSON.stringify(
                        results.filteredProducts,
                        null,
                        2
                    )}
                </pre>
            </section>

            <section>
                <h2>User response</h2>
                <pre>
                    {JSON.stringify(
                        results.userResponse,
                        null,
                        2
                    )}
                </pre>
            </section>

            <section>
                <h2>Products response</h2>
                <pre>
                    {JSON.stringify(
                        results.productsResponse,
                        null,
                        2
                    )}
                </pre>
            </section>

            <section>
                <h2>Error</h2>
                <p>{results.errorResult}</p>
            </section>

            <section>
                <h2>User</h2>
                <pre>
                    {JSON.stringify(
                        results.firstRequest,
                        null,
                        2
                    )}
                </pre>
            </section>

            <section>
                <h2>Products</h2>
                <pre>
                    {JSON.stringify(
                        results.secondRequest,
                        null,
                        2
                    )}
                </pre>
            </section>

            <section>
                <h2>Cart</h2>
                <pre>
                    {JSON.stringify(
                        results.cartResult,
                        null,
                        2
                    )}
                </pre>
                <p>Total: {results.cartTotal}</p>
            </section>

            <section>
                <h2>Cart after remove</h2>
                <pre>
                    {JSON.stringify(
                        results.cartAfterRemove,
                        null,
                        2
                    )}
                </pre>
                <p>Total: {results.totalAfterRemove}</p>
            </section>
        </div>
    );
}

export default App;