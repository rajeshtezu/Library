# Making HTTP Request

**Step-1**: import `HttpClientModule` into your Module.

**Step-2**: Inject the `HttpClient` in the constructor of your Component and use it's `verbs` inside the Component.

- `HttpClient` is an observable

```ts
constructor(private http: HttpClient){}

postRequest() {
  this.http.post<T>('<server_url>/<path>', { ...postData... }, { ...headers... })
    .subscribe(
      responseData => console.log(responseData),
      err => console.error(err)
    )
}
```

> Note: If we don't use subscribe, the request will not even be sent

**Step-3**: Use pipe() to transform data if needed.

```ts
http.get<T>(...)
  .pipe(map(...))
  .subscribe(...);
```

- To use these (http) methods as a service, return the Observable from the service and subscribe it in the components.
- Can use `catchError` inside `pipe()` to handle error there also, with Subject or otherwise.

## Adding headers to request

```ts
http.get(
  'url-path',
  { headers: new HttpHeader({ key: 'value' }) },
  { params: new HttpParams().append().set() }
);
```

- To get the full response from API and not just the body part, add `observe: 'response'` in the header.
  Eg

```ts
http.post('url-path', <data>, { observe: 'response' })
  .subscribe(...);
```

---

## Interceptor

- Runs a code before http request is sent
- Can add auth header, logging, etc here

> **Note**: It sits between `HttpClient` and `HttpServer`. So if you want to bypass interceptor for some http request, use `HttpServer`.

### Request Interceptor

**Step-1**: Create an interceptor service

```ts
export class AuthInterceptorService implements httpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler){
    console.log('Request is on its way');

    const modifiedRequest = req.clone({
      headers: req.headers.append('token', 'xyz');
    });

    return next.handle(modifiedRequest);  // This will forward the request
  }
}
```

**Step-2**: Register/Inject the service to Module

```ts
...

provides: [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true                         // To allow multiple interceptor
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: OtherInterceptorService,
    multi: true
  }
]
```

> **Note**: Order of Interceptor matters here, they get executed in the order they been provided.

### Response Interceptor

- Can simply pipe the `next.handle()` to intercept the response
- `tap()` inside pipe to play with data inside pipe
