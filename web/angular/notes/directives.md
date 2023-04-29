# Directives

Instructions in the DOM (Javascript logic running in template)

## Attribute Directive

Only change the element they are placed on

Steps to create

**Step-1**

```ts
@Directive({
  selector: ['highlightMe'],
})
export class HighlightMeDirective implements OnInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.elementRef.nativeElement.style.backgroundColor = 'Yellow';
  }
}
```

**Step-2**

Add the directive in the declaration part of module same as component.

**Step-3**

Use in the html template

```html
<p highlightMe>I am highlighted text</p>
```

### BETTER APPROACH

This approach will always work, even if used with Service Worker and not the DOM directly.

**1. Simple highlight directive**

```ts
@Directive({
  selector: ['highlightMe'],
})
export class HighlightMeDirective implements OnInit {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'background-color',
      'yellow'
    );
  }
}
```

**2. Highlight directive with hover effect**

```ts
@Directive({
  selector: ['highlightMe'],
})
export class HighlightMeDirective implements OnInit {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'background-color',
      'yellow'
    );
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'background-color',
      'blue',
      false,
      false
    );
  }
}
```

**Note**: Other host listener event such as above `mouseleave`

Eg:

```ts
@HostListener('mouseleave') mouseleave(eventData: Event) {
  this.backgroundColor = 'green';
}
```

### Binding element property with @HostBinding()

```
@HostBinding('style.backgroundColor') backgroundColor: string = 'transparent';
```

**3. Directive with argument**

```ts
@Directive({
  selector: ['highlightMe'],
})
export class HighlightMeDirective implements OnInit {
  @Input() defaultBgColor: string = 'green';
  @Input() highlightColor: string = 'blue';

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'background-color',
      this.defaultColor
    );
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'background-color',
      this.highlightColor
    );
  }
}
```

Now use in html template

```html
<p highlightMe [defaultColor]="'yellow'" highlightColor="grey">
  Highlight me with change on hover
</p>
```

**Note**: There is no way we will know whether the provided property is the component property or directive property; Angular finds it out at run time.

---

## Structural Directive

**Step - 1.** Create the directive

```ts
@Directive({
  selector: ['appIfNot'], // Opposite of *ngIf
})
export class HighlightMeDirective implements OnInit {
  @Input() set appIfNot(condition: boolean) {
    if (!condition) {
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      this.vcRef.clear();
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private vcRef: ViewContainerRef
  ) {}
}
```

**Step - 2.** Use in HTML template

```html
<div *appIfNot="condition">...</div>
```

### BuiltIn Structural Directives

- \*ngIF
- \*ngFor
- [ngSwitch]

Eg: ngSwitch

```html
<div [ngSwitch]="value">
  <p *ngSwitchCase="5">Value is 5</p>
  <p *ngSwitchCase="10">Value is 10</p>
  ...
  <p *ngDefaultSwitch>Value is Default</p>
</div>
```

---

**Behind the scene**

```html
<div *ngIf="condition">...</div>
```

The above code will be converted to as shown below

```html
<ng-template [ngIf]="condition"> ... </ng-template>
```
