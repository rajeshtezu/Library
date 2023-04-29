# Pipes

Pipes could be used to transform data in the html template.

Some of the built-in pipes:

- `uppercase`
- date
  - date
  - `date'fullDate'`: Parameterized, multiple params could be passed by separating them with `:` (colon)

> Check docs for full list of available pipes

- Chaining the pipes: `<variable> | <pipe-1> | <pipe-2> | ...`

## Creating Custom Pipe

**Step-1**: Define the pipe

```ts
@Pipe({ name: 'shorten' })
export class ShortenPipe implements PipeTransform {
  transform(value: string) {
    return value.substr(0, 10);
  }
}
```

**Step-2**: Inject the pipe to the Module in the declaration section.

**Step-3**: Use in template

```html
<div>{{ name | shorten }}</div>
```

> **Note**: By default the pipes are `pure`, we can make it `impure` by setting `pure: false` in the `@Pipe()` decorator but this is not recommended as it will cause performance issue.
>
> `Pure pipe`: Won't re-run if some data changes, only re-run if pipe's arg changes

---

## Async Pipes

TODO
