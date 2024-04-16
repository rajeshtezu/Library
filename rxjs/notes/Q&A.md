# Q&A

## Q. Where to use Observable instead of Promise?

**Ans.**

Observables and Promises are both used for handling asynchronous operations in JavaScript, but they have different characteristics and are suited for different scenarios.

1. **Single vs. Multiple Values**:
   - **Promise**: Represents a single value that will be resolved in the future, either successfully with a value or unsuccessfully with a reason.
   - **Observable**: Represents a stream of values over time, which can include multiple values. It's useful for handling events or continuous data streams.

2. **Lazy vs. Eager**:
   - **Promise**: Eager execution - once created, a Promise starts executing its asynchronous operation immediately.
   - **Observable**: Lazy execution - it doesn't start emitting values until it has a subscriber.

3. **Cancellation**:
   - **Promise**: Doesn't support cancellation out of the box. Once a Promise is created, it will eventually resolve or reject, and there's no built-in mechanism to cancel it.
   - **Observable**: Supports cancellation. You can unsubscribe from an Observable to stop receiving values and clean up resources.

4. **Operators**:
   - **Observable**: Provides powerful operators for transforming, filtering, combining, and reacting to streams of data.
   - **Promise**: Doesn't have built-in operators for transforming the resolved value. You typically use `.then()` and `.catch()` for handling the resolved or rejected value.

5. **Backpressure**:
   - **Observable**: Supports backpressure, which allows consumers to control the rate at which they receive data from a source, preventing overload.
   - **Promise**: Doesn't support backpressure. Once a Promise resolves, the value is immediately delivered to the consumer.

So, you might choose to use Observables over Promises when you're dealing with scenarios such as:

- Continuous data streams like user input events, web sockets, or animations.
- Dealing with multiple asynchronous operations that are ongoing and may emit multiple values over time.
- Needing more control over cancellation or backpressure.

However, if you're dealing with simple asynchronous operations that produce a single value or error, Promises might be more appropriate due to their simplicity and widespread support in JavaScript.


### Backpressure

In the context of Observables, backpressure refers to the mechanism that allows consumers to control the rate at which they receive data from a data source.

In the context of Observables, backpressure can be implemented using various strategies:

1. **Buffering**: The Observable buffers incoming data until the consumer is ready to process it. This allows the consumer to catch up without losing any data, but it may lead to increased memory usage if the buffer size is not managed properly.

2. **Dropping**: The Observable drops incoming data when the consumer is unable to keep up. This ensures that the consumer is not overwhelmed, but it may result in data loss.

3. **Throttling**: The Observable reduces the rate at which it emits data when backpressure is detected. This allows the consumer to catch up gradually without becoming overwhelmed.

4. **Error Handling**: The Observable may throw an error or take other appropriate actions when backpressure occurs, allowing the consumer to handle the situation gracefully.

Overall, backpressure is an important concept in reactive programming, particularly when dealing with asynchronous data streams, as it helps to ensure that the system remains stable and performs optimally under varying load conditions.

## Q. What are the differences between Promise and Observable?

| Feature         | Promise                                    | Observable                                              |
| --------------- | ------------------------------------------ | ------------------------------------------------------- |
| Value           | Represents a single value or error.        | Represents a stream of values over time.                |
| Execution       | Eager - starts executing immediately.      | Lazy - starts emitting values when subscribed.          |
| Handling Errors | Uses `.then()` and `.catch()`.             | Uses `.subscribe()` with error callback.                |
| Multiple Values | Doesn't support multiple emissions.        | Supports emitting multiple values over time.            |
| Cancellation    | Doesn't support cancellation.              | Supports cancellation through unsubscribe.              |
| Operators       | No built-in operators for transformations. | Provides operators for transformations, filtering, etc. |
| Backpressure    | Doesn't support backpressure.              | Supports backpressure for controlling data flow.        |
