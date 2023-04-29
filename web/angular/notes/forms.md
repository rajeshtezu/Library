# Forms

There are two approach to handle forms in Angular

1. `Template driven`: Angular infers the form object from the DOM
2. `Reactive Form`: Form is created programmatically and sync with the DOM

In order to use forms angular provides a built-in module: `FormModule`

> Note: Make sure you include the `FormModule` in `imports` array of the Module.

## Template driven

- **ngModel**: With input control to let angular know about the form control
- `ngModel` could be used in two ways
  - As directive
  - As value to the input control's reference. eg: `#email="ngModel"`
- `(ngSubmit)`: Event to submit form data

- `ngForm`: As value to the form control reference. eg: `#form="ngForm"`

Eg

```html
<form (ngSubmit)="onSubmit(form)" #form="ngForm"></form>

<!-- #form="ngForm" : This will give form data as JS object in onSubmit() -->
```

> Note: `@ViewChild()` could also be used to access reference here

- Add validators. eg: `required`, `email`, etc
- Check the form object for valid property both for individual control and overall.

- We can take advantage of classes added by angular to change style based on validator

Eg

```css
input.ng-invalid.ng-touched {
  border: 1px solid red;
}
```

- Add `ngModelGroup` to group form control
- Check for
  - `formContainer.setValue`: Set the entered form data
  - `formContainer.form.patchValue()`: Set a specific form control
  - `formContainer.reset()`: to reset the form

## Reactive Form (MOST WIDELY USED)

- Along with `FormModule` we also need to use `ReactiveFormsModule` provided by angular to get reactive form facilities.
- Important import: `import { FormGroup } from @angular/forms;`

**Step-1**: Create form group

```ts
this.signUpForm = new FormGroup({
  username: new FormControl(null),
  email: new FormControl(null),
});
```

**Step-2**: Bind the reactive form in the template

```html
<form [formGroup]="signUpForm" (ngSubmit)="onSubmit()">
  <input ... formControlName="username" />
  <input ... formControlName="email" />
</form>
```

**Step-3**: Inside template use

- `signUpForm.get('username').valid` : To check and show the validation error message
- `signUpForm.get('username').touched`: To check if the form input is been touched

> **Note**: We can create a FormGroup inside a FormGroup from step-1 and the properties (field) could be accessed by path (ie, `'parent.child'`). Also, will need to wrap the form control with the parent FormGroup name.
> Eg
>
> ```html
> <form formGroupName="userData">
>   <input formControlName="username" />
>   <span *ngIf="!signUpForm.get('userData.username').value"
>     >Username required!</span
>   >
> </form>
> ```

> Check `FormArray` in the docs

## Custom Validator

```ts
forbiddenNames = (control: FormControl) => {
  if (!this.forbiddenNames.includes(control.value)) {
    return { nameIsForbidden: true };
  }

  return null;
};
```

- Now pass this as callback in the same fashion as we do with other validators.
- Check docs for `ValueChanges` and `StatusChanges`
