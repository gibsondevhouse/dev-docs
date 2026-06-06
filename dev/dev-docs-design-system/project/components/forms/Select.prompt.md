**Select** — native select styled as a dev-docs field with a custom chevron. Used for the Settings model picker.

```jsx
<Field label="Model">
  <Select defaultValue="deepseek-chat">
    <option value="deepseek-chat">deepseek-chat</option>
    <option value="deepseek-reasoner">deepseek-reasoner</option>
  </Select>
</Field>
```

`invalid` turns the border red. Pass `<option>`s as children.
