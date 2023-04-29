# Services and Dependency Injection

**Service**: Reusable methods for generic use (A normal class with methods)

Steps to create service and use it

**Step-1**: Create a service

```ts
export class AccountService {
  private accounts = [
    {
      id: 'random-id'
      name: 'Master Account',
      status: 'active'
    },
    ...
  ];

  addAccount(name: string, status: string) {
    this.accounts.push({name, status});
  }

  getAccounts() {
    return this.accounts;
  }

  updateStatus(id: string, status: string) {
    this.accounts[id].status = status;
  }
}
```

**Step-2**: Use in component

```ts
@Component({
  ...,
  providers: [AccountService]
})
export class AppComponent implements OnInit {
  accounts: IAccount[] = [];

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.accounts = this.accountService.getAccounts();
  }
}
```

**Note**: When we provide a service to a component, the framework passes the same instance created for this component to all its child and the child of child & so on in a hierarchical way.

## Hierarchical Injector

The instance of a particular service would be same or different for different module, service, components, etc would depend on how/where it's been injected.

If the service is injected to

- **AppModule**: Same instance of service is available application wide. ie, directive, component, services, etc
- **AppComponent**: Same instance of service is available for all components (but not for other services)
- `Any other component`: Same instance of service is available for the component and all its child component.

**Note**:

- Injecting services into services could be achieved by injecting it at the module level.
- We'll have to use `@Injectable()` decorator with service which wants a service to be injected to it.
- `@Injectable({ providedIn: 'root' })` : Use this to inject the directly to the root module (highest level)
  - When using this, we don't need to inject the service explicitly into the module by providing in Module decorator

```ts
@Injectable()                                               // ------> 1
export class AccountService {
  ...

  constructor(private loggingService: LoggingService) {}    // ------> 2

  addAccount(name: string, status: string) {
    this.accounts.push({name, status});

    this.loggingService.logStatusChange(status);            // ------> 3
  }
}
```

A `Subject` (Observable) could be used inside a service and subscribed inside another service and subscribed inside another service where it is injected and data could be shared.

---

> **Note**: If you provide a service in `eager-loaded` module and also in `lazy-loaded` module then the lazy-loaded module will be able to access that service but it will have a different instance of that service.
>
> Use `{ providedIn: 'root' }` in case you are not sure. It will inject the service to root module which is same as explicitly injecting Service to the root module
