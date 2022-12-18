# Lifecycle Methods

- **ngOnChanges**: Called after a bound input property changes.
  - Takes argument `changes: SimpleChanges`
- **ngOnInit** : Called once the component is initialized
- **ngDoCheck**: Called during every change detection run

> - **ngAfterContentInit**: Called after content (`ng-content`) has been projected into the view
> - **ngAfterContentChecked**: Called every time the projected content has been checked (every change detection)

> - **ngAfterViewInit**: Called after component's view (and child views) has been initialized
> - **ngAfterViewChecked**: Called every time the view (and child views) have been checked (every change detection)

- **ngOnDestroy**: Called once the component is about to be destroyed
