# Basics

1. String interpolation: `{{ data }}`
2. Property binding: `[property]`
3. Event binding: `(event) = "expression"`
4. Two way binding: `[(ngModel)] = "data"`

## Directives

Instruction in the DOM

- **Structural Directive**: Changes DOM structure

Eg: *ngIf, *ngFor

- **Attribute Directive**: Only change the element they are placed on

Eg: For dynamic style

```
[ngStyle] = "{ 'background-color': 'red' }"
```

Eg: For dynamic class

```
[ngClass] = "{ className: true }"
```

---

Eg: Using for loop

```
<p *ngFor="let server of servers">
  {{server}}
</p>
```

Eg: Using for loop with index

```
<p *ngFor="let server of servers; let i = index">
  {{index}} - {{server}}
</p>
```
