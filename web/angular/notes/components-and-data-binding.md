# Components and Data Binding

## Input() - props

- To receive property inside a component just like react props.

```
interface IElement {...}

@Component({...})
export class ServerElementComponent {
  @Input('alias') element: IElement;

  ...
}
```

**Note**: `alias` is optional in `Input()`.

### Usage

Passing the props to component

```
<server-element [element]="..."> </server-element>
```

## Output() - custom event binding

- A way to communicate from child to parent component. ie. passing data from child to parent

```
@Component({...})
export class ChildComponent {
  @Output('alias') serverCreated: new EventEmitter<T>();

  ...

  handleServerCreated(event) {
    if(event condition) this.serverCreated.emit();
  }
}
```

### Usage

TODO: Add usage

## View Encapsulation - CSS/Style encapsulation

```
@Component({
  ...
  encapsulation: ViewEncapsulation.Emulate
})
```

- `ViewEncapsulation.Emulate` : Default value and it will encapsulate the angular way
- `ViewEncapsulation.Native` : Encapsulate with browser's native shadow dom feature
- `ViewEncapsulation.None` : It will not encapsulate and style applies globally [NOT RECOMMENDED]

## ViewChild() - getting local reference

- Getting local reference through ViewChild
- Executes `afterViewInit` [See lifecycle methods](lifecycle-methods.md)

```
@Component({...})
export class ServerElementComponent {
  @ViewChild('referenceName') <varName>: ElementRef;

  ...
}
```

- `<ng-content></ng-content>` : Similar to {this.props.children} in react.js

## ContentChild() - access other component element

```
@Component({...})
export class ServerElementComponent {
  @ContentChild('referenceName') <varName>: T;

  ...
}
```

- Can access other component element reference
- Executes `afterContentInit` [See lifecycle methods](lifecycle-methods.md)
