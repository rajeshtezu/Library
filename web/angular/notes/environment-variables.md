# Environment Variables

This is helpful when you want couple of values different for different environment like Development and Production.

**Step-1**: Add key-value paris in the `environment.ts` and `environment.prod.ts` files
**Step-2**: Import environment like this

```
import { environment } from 'path/environments/environment';
```

> Note:
>
> - No mention of `.prod` or `.ts`
> - Angular will handle that internally

**Step-3**: Use the `environment` object where needed. It will pick values from those files based on build (dev, prod)
