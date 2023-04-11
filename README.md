# Pokeguess

Personal project that takes the `Who's that Pokemon` game from the show to the browser.

### Todo:

- [x] Complete the `async` function and render random Pokemon to the screen

- [x] Figure out the API structure for the official artwork to ensure proper URL can be obtained.

- [ ] Refactor CSS to utilize a variable for the image URL from the API.

- [ ] Update/Refactor JS code to utilize the css variable for image

- [ ] Change `mask` class to support `mask-image` properties. This appears to look cleaner, see code noted below.

- [ ] Think about if I should separate certain properties into separate classes.

The use of mask-image seems cleaner in this regard. The `mask-size` property cleans up the sizing properties, which is nice.

**QUICK NOTE:** `mask-image` and `background-image` seem to not layer over each other. I need to perform a little bit of an investigation on this.

```css
.mask {
  mask-image: var(--pokemon);
  mask-size: 200px;
  background: rgba(10, 10, 10, 5);
}
```
