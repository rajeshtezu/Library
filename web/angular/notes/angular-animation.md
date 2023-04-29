# Angular Animation

**Step-1**: Add `animations` property in `@Component({...})` decorator with following functions

```ts
@Component({
  ...
  animations: [
    trigger('divState', [
      state('normal', style({
        'background-color': 'red',
        transform: translateX(0)
      })),
      state('highlighted', style({
        'background-color': 'blue',
        transform: translateX(0)
      })),
      transition('normal => highlighted', animate(300)),
      transition('highlighted => normal', animate(800))
    ])
  ]
})
export class MyComponent{}
```

- We can also use `<=>` where `=>` is used inside transition
- Can add `style()` as 2nd argument to `animate()` to style during animation
- `trigger`, `state`, `style`, `transition` will all be imported from `@angular/core`

**Step-2**: Add a `<div>` and bind a triggering property

```html
<div [@divState]="animationState"></div>
```

**Step-3**: Assign/change the value to/of `animationState` inside the Component controller on some click other event

```ts
...
if(condition){
  this.animationState = 'normal';
} else {
  this.animationState = 'highlighted';
}
```

---

Check docs for advance animations.
