# Web Performance

Some tips to make your website faster

- Use `srcset` to automatically choose the right image
- Use media queries for background images (different sizes)
- Optimize image compression
- Use correct format
  - `png`: Size is quite large compared to other format ✔️
  - `jpeg`: Smaller in size compare to png ✔️✔️
  - `webp`: Smallest in size and supported by most modern browsers ✅✅✅
- Remove unused code (Can take help of bundler to tree shake)
- Load code at the right time
  - `async` ✔️
  - `defer` ✅✅
  - Append script tag `onload`
- Lazy load images and code
- Use `svg`
- Use minified code
- From server as well you can serve a compressed chunk of code

## Testing Tools

- **Lighthouse**: Available in Google Chrome's developer window
  - Can measure on different devices and network bandwidth: `Mobile`, `Desktop`
  - It checks things like `Performance`, `Accessibility`, `Best practices`, `SEO`, `PWA`
  - All you have to do is open the Lighthouse for your website in developer window and click on `Analyze page load`
  - It will provide all the information along with some way to fix them as well
